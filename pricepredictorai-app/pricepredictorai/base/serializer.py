from rest_framework import serializers
from .models import Property

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['area', 'unit', 'location', 'bedrooms', 'bathrooms', 'property_age', 'predicted_price']
        
    def validate_area(self, value):
        """
        Check that the area is positive
        """
        if value <= 0:
            raise serializers.ValidationError("Area must be greater than zero")
        return value