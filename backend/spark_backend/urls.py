from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def api_root(request):
    return JsonResponse({
        "message": "Welcome to the Spark Technology API Hub",
        "developer_documentation": "Use the following endpoints to fetch dynamic settings, services, portfolio assets, and submit inquiries.",
        "endpoints": {
            "Services List": f"{request.build_absolute_uri('/')}api/services/",
            "Portfolio Items": f"{request.build_absolute_uri('/')}api/portfolio/",
            "Testimonials": f"{request.build_absolute_uri('/')}api/testimonials/",
            "Site Settings": f"{request.build_absolute_uri('/')}api/settings/",
            "Inquiries Submit (POST)": f"{request.build_absolute_uri('/')}api/inquiries/",
            "Admin Panel": f"{request.build_absolute_uri('/')}admin/"
        }
    })


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('', api_root, name='api-root'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
