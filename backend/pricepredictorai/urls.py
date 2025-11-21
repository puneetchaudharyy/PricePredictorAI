"""
URL configuration for pricepredictorai project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from base import views
from django.contrib import admin
from django.urls import include, path
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://localhost:3000"

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predict/', views.predict_price, name='predict_price'),
    path('accounts/', include('allauth.urls')),
    path('api/auth/google/', GoogleLogin.as_view(), name='google_login'),
    path("api/contact/", views.contact_api, name="contact_api"),
]