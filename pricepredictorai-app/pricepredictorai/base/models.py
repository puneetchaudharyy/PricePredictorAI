from django.db import models

# Create your models here.

class Property(models.Model):
    area = models.FloatField(help_text="Area of the property in square feet")
    bedrooms = models.IntegerField(help_text="Number of bedrooms")
    bathrooms = models.IntegerField(help_text="Number of bathrooms", blank = True, null = True)
    stories = models.IntegerField(help_text="Number of stories",  blank = True, null = True)
    mainroad = models.BooleanField(help_text="Is the property near a main road?",  blank = True, null = True)
    guestroom = models.BooleanField(help_text="Does the property have a guest room?", blank = True, null = True)
    basement = models.BooleanField(help_text="Does the property have a basement?", blank = True, null = True)
    hotwaterheating = models.BooleanField(help_text="Does the property have hot water heating?", blank = True, null = True)
    airconditioning = models.BooleanField(help_text="Does the property have air conditioning?", blank = True, null = True)
    prefarea = models.BooleanField(help_text="Is the property in a preferred area?", blank = True, null = True)
    furnishingstatus = models.CharField(help_text="Furnishing status of the property", blank = True, null = True)
    predicted_price = models.FloatField(help_text="Predicted price of the property", blank = True, null = True)
    # created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Property with {self.bedrooms} bedrooms, {self.bathrooms} bathrooms, and {self.area} sqft area"

