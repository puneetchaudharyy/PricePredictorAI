from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import numpy as np
from .serializer import PropertySerializer
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@api_view(["POST"])
@permission_classes([AllowAny])
def predict_price(request):
    from .ml_utils import get_model_and_stats  # local import

    ml_model, mean, std = get_model_and_stats()
    if ml_model is None or mean is None or std is None:
        return Response(
            {"error": "Model not loaded. Please contact the site owner."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    try:
        data = request.data
        print(f"Received data: {data}")

        def safe_int(value, default=0):
            if value == "" or value is None:
                return default
            try:
                return int(value)
            except (ValueError, TypeError):
                return default

        def safe_float(value, default=0.0):
            if value == "" or value is None:
                return default
            try:
                return float(value)
            except (ValueError, TypeError):
                return default

        furnished_map = {
            "unfurnished": 0,
            "semi-furnished": 1,
            "furnished": 2,
        }

        def yes_no_to_int(value):
            if value == "" or value is None:
                return 0
            return 1 if str(value).lower() == "yes" else 0

        # Order of features must match training
        features = np.array(
            [
                [
                    safe_float(data.get("area", 0)),
                    safe_int(data.get("bedrooms", 0)),
                    safe_int(data.get("bathrooms", 0)),
                    safe_int(data.get("stories", 1)),
                    yes_no_to_int(data.get("onMainRoad", "no")),
                    yes_no_to_int(data.get("hasGuestroom", "no")),
                    yes_no_to_int(data.get("hasBasement", "no")),
                    yes_no_to_int(data.get("hasHotWaterHeating", "no")),
                    yes_no_to_int(data.get("hasAirConditioning", "no")),
                    yes_no_to_int(data.get("hasPrefareArea", "no")),
                    yes_no_to_int(data.get("hasParkingSpace", "no")),
                    furnished_map.get(data.get("furnished", "unfurnished"), 0),
                ]
            ]
        )

        print(f"Features array: {features}")

        features_normalized = (features - mean) / std

        prediction = ml_model.predict(features_normalized, verbose=0)
        predicted_price = float(prediction[0][0])

        print(f"Predicted price: {predicted_price}")

        property_instance = None
        try:
            property_data = {
                "area": safe_float(data.get("area", 0)),
                "bedrooms": safe_int(data.get("bedrooms", 0)),
                "bathrooms": safe_int(data.get("bathrooms", 0)),
                "stories": safe_int(data.get("stories", 1)),
                "mainroad": yes_no_to_int(data.get("onMainRoad", "no")),
                "guestroom": yes_no_to_int(data.get("hasGuestroom", "no")),
                "basement": yes_no_to_int(data.get("hasBasement", "no")),
                "hotwaterheating": yes_no_to_int(
                    data.get("hasHotWaterHeating", "no")
                ),
                "airconditioning": yes_no_to_int(
                    data.get("hasAirConditioning", "no")
                ),
                "prefarea": yes_no_to_int(data.get("hasPrefareArea", "no")),
                "furnishingstatus": data.get("furnished", "unfurnished"),
                "predicted_price": predicted_price,
            }
            serializer = PropertySerializer(data=property_data)
            if serializer.is_valid():
                property_instance = serializer.save()
        except Exception as db_error:
            print(f"Database save warning: {db_error}")

        return Response(
            {
                "success": True,
                "message": "Prediction successful",
                "predicted_price": round(predicted_price, 2),
                "property_id": property_instance.id if property_instance else None,
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        import traceback

        print(f"Error in predict_price: {str(e)}")
        traceback.print_exc()
        return Response(
            {"error": f"Prediction error: {str(e)}"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@csrf_exempt
def contact_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    name = data.get("name", "")
    email = data.get("email", "")
    message = data.get("message", "")

    subject = f"New Contact Form Submission from {name}"

    owner_msg = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
    send_mail(
        subject,
        owner_msg,
        "puneet.chdry008@gmail.com",
        ["puneet.chdry008@gmail.com"],
        fail_silently=False,
    )

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
        "puneet.chdry008@gmail.com",
        [email],
        fail_silently=False,
    )

    return JsonResponse({"status": "OK"})
