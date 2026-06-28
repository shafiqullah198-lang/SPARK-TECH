from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactInquiryViewSet, ServiceViewSet, PortfolioItemViewSet, TestimonialViewSet, SiteSettingView

router = DefaultRouter()
router.register(r'inquiries', ContactInquiryViewSet, basename='inquiry')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'portfolio', PortfolioItemViewSet, basename='portfolio')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')

urlpatterns = [
    path('', include(router.urls)),
    path('settings/', SiteSettingView.as_view(), name='site-settings'),
]
