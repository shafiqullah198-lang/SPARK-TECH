from rest_framework import serializers
from .models import ContactInquiry, Service, PortfolioItem, Testimonial, SiteSetting


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = [
            'id', 'name', 'email', 'phone', 'selected_service', 
            'budget', 'message', 'status', 'created_at'
        ]
        read_only_fields = ['status', 'created_at']


class ServiceSerializer(serializers.ModelSerializer):
    desc = serializers.CharField(source='short_description', read_only=True)
    bullets = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description', 'desc', 
            'full_description', 'image', 'image_path', 'bullets', 
            'accent', 'span', 'order', 'active'
        ]

    def get_bullets(self, obj):
        if not obj.bullets:
            return []
        return [b.strip() for b in obj.bullets.split(',') if b.strip()]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_path


class PortfolioItemSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='project_title', read_only=True)
    result = serializers.CharField(source='description', read_only=True)
    metricLabel = serializers.CharField(source='metric_label', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = PortfolioItem
        fields = [
            'id', 'project_title', 'title', 'client', 'category', 
            'description', 'result', 'image', 'image_path', 
            'technologies', 'live_url', 'case_study_url', 
            'metric', 'metric_label', 'metricLabel', 'palette', 
            'size', 'featured'
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_path


class TestimonialSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='client_name', read_only=True)
    quote = serializers.CharField(source='message', read_only=True)
    initials = serializers.CharField(source='image_path', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'name', 'company', 'role', 'rating', 
            'message', 'quote', 'image', 'image_path', 'initials', 
            'accent', 'active'
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_path or obj.client_name[:2].upper() if obj.client_name else 'ST'


class SiteSettingSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    class Meta:
        model = SiteSetting
        fields = [
            'id', 'company_name', 'logo', 'logo_path', 
            'whatsapp_number', 'email', 'address', 
            'social_twitter', 'social_linkedin', 
            'social_dribbble', 'social_github'
        ]

    def get_logo(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return obj.logo_path
