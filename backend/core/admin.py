from django.contrib import admin
from .models import ContactInquiry, Service, PortfolioItem, Testimonial, SiteSetting


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'selected_service', 'budget', 'status', 'created_at')
    list_filter = ('status', 'selected_service', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('status',)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'order', 'accent', 'span', 'active')
    list_filter = ('active', 'accent', 'span')
    search_fields = ('title', 'short_description', 'full_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('order', 'active')


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('client', 'project_title', 'category', 'size', 'featured')
    list_filter = ('featured', 'size', 'category')
    search_fields = ('client', 'project_title', 'description', 'technologies')
    list_editable = ('featured', 'size')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'company', 'role', 'rating', 'accent', 'active')
    list_filter = ('active', 'rating', 'accent')
    search_fields = ('client_name', 'company', 'message')
    list_editable = ('active', 'rating')


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'email', 'whatsapp_number', 'address')

    def has_add_permission(self, request):
        # Prevent creating multiple setting instances
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False
