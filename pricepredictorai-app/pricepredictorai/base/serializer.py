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
    
    def validate_bedrooms(self, value):
        """
        Check that the number of bedrooms is non-negative
        """
        if value < 0:
            raise serializers.ValidationError("Number of bedrooms cannot be negative")
        return value
    
    def validate_bathrooms(self, value):
        """
        Check that the number of bathrooms is non-negative
        """
        if value < 0:
            raise serializers.ValidationError("Number of bathrooms cannot be negative")
        return value
    
    def validate_property_age(self, value):
        """
        Check that the property age is non-negative
        """
        if value < 0:
            raise serializers.ValidationError("Property age cannot be negative")
        return value
    
    def validate(self, data):
        """
        Object-level validation to ensure logical consistency
        """
        if data['bedrooms'] == 0 and data['bathrooms'] > 0:
            raise serializers.ValidationError("A property with 0 bedrooms cannot have bathrooms")
        return data
    
    def create(self, validated_data):
        return Property.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.area = validated_data.get('area', instance.area)
        instance.unit = validated_data.get('unit', instance.unit)
        instance.location = validated_data.get('location', instance.location)
        instance.bedrooms = validated_data.get('bedrooms', instance.bedrooms)
        instance.bathrooms = validated_data.get('bathrooms', instance.bathrooms)
        instance.property_age = validated_data.get('property_age', instance.property_age)
        instance.predicted_price = validated_data.get('predicted_price', instance.predicted_price)
        instance.save()
        return instance
    