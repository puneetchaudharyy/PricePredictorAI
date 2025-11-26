import numpy as np
import tensorflow as tf
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializer import PropertySerializer
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os

# Load model and normalization parameters at startup
MODEL_PATH = '../../ml_training/models/house_price_model.h5'
MEAN_PATH = '../../ml_training/models/mean.npy'
STD_PATH = '../../ml_training/models/std.npy'

try:
    ml_model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    mean = np.load(MEAN_PATH)
    std = np.load(STD_PATH)
    print("✓ Model and normalization parameters loaded successfully")
except Exception as e:
    print(f"⚠ Warning: Could not load model - {e}")
    ml_model = None
    mean = None
    std = None

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_price(request):
    """Predict house price based on input features"""
    
    if ml_model is None:
        return Response({
            'error': 'Model not loaded. Please train the model first.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    try:
        # Get data from request
        data = request.data
        print(f"Received data: {data}")
        
        # Helper function to safely convert to int with default value
        def safe_int(value, default=0):
            """Safely convert value to int, handling empty strings"""
            if value == '' or value is None:
                return default
            try:
                return int(value)
            except (ValueError, TypeError):
                return default
        
        # Helper function to safely convert to float with default value
        def safe_float(value, default=0.0):
            """Safely convert value to float, handling empty strings"""
            if value == '' or value is None:
                return default
            try:
                return float(value)
            except (ValueError, TypeError):
                return default
        
        # Map furnished status to numeric
        furnished_map = {
            'unfurnished': 0,
            'semi-furnished': 1,
            'furnished': 2
        }
        
        # Convert yes/no to 1/0, handling empty strings
        def yes_no_to_int(value):
            if value == '' or value is None:
                return 0
            return 1 if str(value).lower() == 'yes' else 0
        
        # Prepare features in the EXACT order used during training
        features = np.array([[
            safe_float(data.get('area', 0)),
            safe_int(data.get('bedrooms', 0)),
            safe_int(data.get('bathrooms', 0)),
            safe_int(data.get('stories', 1)),
            yes_no_to_int(data.get('onMainRoad', 'no')),
            yes_no_to_int(data.get('hasGuestroom', 'no')),
            yes_no_to_int(data.get('hasBasement', 'no')),
            yes_no_to_int(data.get('hasHotWaterHeating', 'no')),
            yes_no_to_int(data.get('hasAirConditioning', 'no')),
            yes_no_to_int(data.get('hasPrefareArea', 'no')),
            yes_no_to_int(data.get('hasParkingSpace', 'no')),
            furnished_map.get(data.get('furnished', 'unfurnished'), 0),
        ]])
        
        print(f"Features array: {features}")
        
        # Normalize features using saved mean and std
        features_normalized = (features - mean) / std
        
        # Make prediction
        prediction = ml_model.predict(features_normalized, verbose=0)
        predicted_price = float(prediction[0][0])
        
        print(f"Predicted price: {predicted_price}")
        
        # Optional: Save to database
        property_instance = None
        try:
            property_data = {
                'area': safe_float(data.get('area', 0)),
                'bedrooms': safe_int(data.get('bedrooms', 0)),
                'bathrooms': safe_int(data.get('bathrooms', 0)),
                'stories': safe_int(data.get('stories', 1)),
                'mainroad': yes_no_to_int(data.get('onMainRoad', 'no')),
                'guestroom': yes_no_to_int(data.get('hasGuestroom', 'no')),
                'basement': yes_no_to_int(data.get('hasBasement', 'no')),
                'hotwaterheating': yes_no_to_int(data.get('hasHotWaterHeating', 'no')),
                'airconditioning': yes_no_to_int(data.get('hasAirConditioning', 'no')),
                'prefarea': yes_no_to_int(data.get('hasPrefareArea', 'no')),
                'furnishingstatus': data.get('furnished', 'unfurnished'),
                'predicted_price': predicted_price
            }
            serializer = PropertySerializer(data=property_data)
            if serializer.is_valid():
                property_instance = serializer.save()
        except Exception as db_error:
            print(f"Database save warning: {db_error}")
        
        return Response({
            'success': True,
            'message': 'Prediction successful',
            'predicted_price': round(predicted_price, 2),
            'property_id': property_instance.id if property_instance else None
        }, status=status.HTTP_200_OK)
    
    except Exception as e:
        print(f"Error in predict_price: {str(e)}")
        import traceback
        traceback.print_exc()
        return Response({
            'error': f'Prediction error: {str(e)}'
        }, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def contact_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name", "")
        email = data.get("email", "")
        message = data.get("message", "")
        subject = f"New Contact Form Submission from {name}"

        # Message for site owner
        owner_msg = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
        send_mail(
            subject,
            owner_msg,
            "puneet.chdry008@gmail.com",  # Sender email
            ["puneet.chdry008@gmail.com"],  # Your email
            fail_silently=False,
        )

        # Confirmation for user
        user_subject = "Thank you for contacting PricePredictorAI"
        user_msg = (
            f"Hi {name},\n\n"
            "Thank you for reaching out! Here’s a copy of your message:\n"
            f"{message}\n\n"
            "We’ll get back to you soon."
        )
        send_mail(
            user_subject,
            user_msg,
            "puneet.chdry008@gmail.com",  # Sender email, must match allowed email for SMTP
            [email],  # User's email
            fail_silently=False,
        )

        return JsonResponse({"status": "OK"})
    return JsonResponse({"error": "Only POST allowed"}, status=405)