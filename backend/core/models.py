from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class ContactInquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('converted', 'Converted'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    selected_service = models.CharField(max_length=100)
    budget = models.CharField(max_length=100)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Inquiry'
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        return f"{self.name} - {self.selected_service} ({self.status})"


class Service(models.Model):
    ACCENT_CHOICES = [
        ('primary', 'Primary (Maroon)'),
        ('gold', 'Gold'),
    ]

    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    short_description = models.TextField(help_text="Maps to 'desc' in the frontend card")
    full_description = models.TextField(blank=True)
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    image_path = models.CharField(max_length=255, blank=True, null=True, help_text="Local path fallback e.g. /assets/services/web-dev.png")
    bullets = models.CharField(max_length=255, help_text="Comma-separated bullets e.g. Next.js / React, Headless CMS")
    accent = models.CharField(max_length=20, choices=ACCENT_CHOICES, default='primary')
    span = models.BooleanField(default=False, help_text="Span 2 columns in layout")
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class PortfolioItem(models.Model):
    SIZE_CHOICES = [
        ('sm', 'Small'),
        ('md', 'Medium'),
        ('lg', 'Large'),
    ]

    project_title = models.CharField(max_length=150, help_text="Maps to 'title' in frontend")
    client = models.CharField(max_length=100)
    category = models.CharField(max_length=100, help_text="e.g. E-commerce Platform, SaaS Dashboard")
    description = models.TextField(help_text="Maps to 'result' in frontend")
    image = models.ImageField(upload_to='portfolio/', blank=True, null=True)
    image_path = models.CharField(max_length=255, blank=True, null=True, help_text="Local path fallback e.g. /assets/portfolio/northpeak.png")
    technologies = models.CharField(max_length=255, help_text="Comma-separated values e.g. Next.js, React, TypeScript")
    live_url = models.URLField(blank=True, null=True)
    case_study_url = models.URLField(blank=True, null=True)
    metric = models.CharField(max_length=50, help_text="e.g. 3.1x or 4B")
    metric_label = models.CharField(max_length=100, help_text="e.g. Conversion or Events/day")
    palette = models.CharField(max_length=100, default="from-spark-primary to-spark-primary-deep", help_text="Tailwind gradient classes")
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='md')
    featured = models.BooleanField(default=False)

    class Meta:
        ordering = ['project_title']

    def __str__(self):
        return f"{self.client} - {self.project_title}"


class Testimonial(models.Model):
    ACCENT_CHOICES = [
        ('primary', 'Primary (Maroon)'),
        ('gold', 'Gold'),
    ]

    client_name = models.CharField(max_length=100, help_text="Maps to 'name' in frontend")
    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    rating = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    message = models.TextField(help_text="Maps to 'quote' in frontend")
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    image_path = models.CharField(max_length=255, blank=True, null=True, help_text="Local initials or path fallback e.g. MH")
    accent = models.CharField(max_length=20, choices=ACCENT_CHOICES, default='primary')
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.client_name} - {self.company}"


class SiteSetting(models.Model):
    company_name = models.CharField(max_length=100, default="Spark Technology")
    logo = models.ImageField(upload_to='settings/', blank=True, null=True)
    logo_path = models.CharField(max_length=255, default="/assets/spark-logo.jpg")
    whatsapp_number = models.CharField(max_length=30, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    social_twitter = models.URLField(blank=True, null=True)
    social_linkedin = models.URLField(blank=True, null=True)
    social_dribbble = models.URLField(blank=True, null=True)
    social_github = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = 'Site Setting'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return self.company_name

    def save(self, *args, **kwargs):
        if not self.pk and SiteSetting.objects.exists():
            self.pk = SiteSetting.objects.first().pk
        super(SiteSetting, self).save(*args, **kwargs)
