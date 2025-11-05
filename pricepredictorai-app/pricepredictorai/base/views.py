from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Property
from .serializer import PropertySerializer

@api_view(['POST'])
def predict_price(request):
    # Map React field names to Django model field names
    data = {
        'area': request.data.get('area'),
        'bedrooms': request.data.get('bedrooms'),
        'bathrooms': request.data.get('bathrooms'),
        'stories': request.data.get('stories'),
        'mainroad': request.data.get('onMainRoad') == 'yes',
        'guestroom': request.data.get('hasGuestroom') == 'yes',
        'basement': request.data.get('hasBasement') == 'yes',
        'hotwaterheating': request.data.get('hasHotWaterHeating') == 'yes',
        'airconditioning': request.data.get('hasAirConditioning') == 'yes',
        'prefarea': request.data.get('hasPrefareArea') == 'yes',
        'furnishingstatus': request.data.get('furnished'),
    }
    
    serializer = PropertySerializer(data=data)
    
    if serializer.is_valid():
        # Save the property
        property_instance = serializer.save()
        
        # Here you would call your ML model for prediction
        # predicted_price = your_ml_model.predict(property_instance)
        
        return Response({
            'message': 'Property data received successfully',
            'property_id': property_instance.id,
            # 'predicted_price': predicted_price
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

