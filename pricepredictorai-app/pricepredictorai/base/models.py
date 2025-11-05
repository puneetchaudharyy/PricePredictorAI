from django.db import models

# Create your models here.

class Property(models.Model):
    area = models.FloatField()
    unit = models.CharField(max_length=10)
    address = models.CharField(max_length=255)
    bedrooms = models.IntegerField(null=True, blank=True)
    bathrooms = models.IntegerField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)

    def __str__(self):
        bedrooms = f"{self.bedrooms} bedrooms" if self.bedrooms is not None else "bedrooms N/A"
        bathrooms = f"{self.bathrooms} bathrooms" if self.bathrooms is not None else "bathrooms N/A"
        age = f"{self.age} years old" if self.age is not None else "age N/A"
        return f"{self.area} {self.unit}, {self.address}, {bedrooms}, {bathrooms}, {age}"

