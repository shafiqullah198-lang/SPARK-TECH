from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ContactInquiry, Service, PortfolioItem, Testimonial, SiteSetting
from .serializers import (
    ContactInquirySerializer, ServiceSerializer, 
    PortfolioItemSerializer, TestimonialSerializer, SiteSettingSerializer
)


class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        # Auto-seed if database is empty
        if Service.objects.count() == 0:
            self.seed_services()
        return Service.objects.filter(active=True)

    def seed_services(self):
        services_data = [
            {
                "title": "Website Development",
                "slug": "website-development",
                "short_description": "Cinematic marketing sites, headless commerce and high-performance platforms engineered for speed and scale.",
                "bullets": "Next.js / React, Headless CMS, Edge rendering",
                "accent": "primary",
                "image_path": "/assets/services/web-dev.png",
                "span": True,
                "order": 1
            },
            {
                "title": "Mobile App Development",
                "slug": "mobile-app-development",
                "short_description": "Native-feel iOS & Android apps with offline-first architecture and 60fps motion.",
                "bullets": "React Native, Flutter, Push & deep links",
                "accent": "gold",
                "image_path": "/assets/services/mobile-apps.png",
                "span": False,
                "order": 2
            },
            {
                "title": "ERP Systems",
                "slug": "erp-systems",
                "short_description": "Unified ERP backbones that connect inventory, finance, HR and operations into one source of truth.",
                "bullets": "Custom modules, Real-time sync, Role-based access",
                "accent": "primary",
                "image_path": "/assets/services/erp.png",
                "span": False,
                "order": 3
            },
            {
                "title": "CRM Solutions",
                "slug": "crm-solutions",
                "short_description": "Customer platforms that turn pipelines into revenue — automations, dashboards and AI insights.",
                "bullets": "Sales pipelines, Automations, Analytics",
                "accent": "gold",
                "image_path": "/assets/services/crm.png",
                "span": False,
                "order": 4
            },
            {
                "title": "UI/UX Design",
                "slug": "ui-ux-design",
                "short_description": "Research-led product design — flows, prototypes and design systems that ship in weeks, not months.",
                "bullets": "Discovery, Design systems, Prototyping",
                "accent": "primary",
                "image_path": "/assets/services/uiux.png",
                "span": False,
                "order": 5
            },
            {
                "title": "Graphic Design",
                "slug": "graphic-design",
                "short_description": "Editorial-grade visual assets — from pitch decks to social kits and motion graphics.",
                "bullets": "Pitch decks, Social kits, Motion",
                "accent": "gold",
                "image_path": "/assets/services/graphic.png",
                "span": False,
                "order": 6
            },
            {
                "title": "Social Media Marketing",
                "slug": "social-media-marketing",
                "short_description": "Performance creative + community ops that compound reach and convert attention into revenue.",
                "bullets": "Content calendars, Paid social, Community",
                "accent": "primary",
                "image_path": "/assets/services/social.png",
                "span": False,
                "order": 7
            },
            {
                "title": "Branding",
                "slug": "branding",
                "short_description": "Strategic brand systems — naming, identity, voice and guidelines built to scale across surfaces.",
                "bullets": "Identity, Voice, Guidelines",
                "accent": "gold",
                "image_path": "/assets/services/branding.png",
                "span": False,
                "order": 8
            },
            {
                "title": "E-commerce Development",
                "slug": "e-commerce-development",
                "short_description": "Conversion-engineered storefronts on Shopify, custom or headless — built to scale to 8 figures.",
                "bullets": "Shopify / Headless, Subscriptions, A/B testing",
                "accent": "primary",
                "image_path": "/assets/services/ecommerce.png",
                "span": True,
                "order": 9
            },
            {
                "title": "Analytics & Reporting",
                "slug": "analytics-reporting",
                "short_description": "Unified dashboards that connect every channel into one source of truth — and the insights to act on it.",
                "bullets": "BI dashboards, ETL pipelines, AI insights",
                "accent": "gold",
                "image_path": "/assets/services/analytics.png",
                "span": False,
                "order": 10
            }
        ]
        for s in services_data:
            Service.objects.get_or_create(
                slug=s["slug"],
                defaults={
                    "title": s["title"],
                    "short_description": s["short_description"],
                    "bullets": s["bullets"],
                    "accent": s["accent"],
                    "image_path": s["image_path"],
                    "span": s["span"],
                    "order": s["order"]
                }
            )


class PortfolioItemViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PortfolioItemSerializer

    def get_queryset(self):
        # Auto-seed if database is empty
        if PortfolioItem.objects.count() == 0:
            self.seed_portfolio()
        return PortfolioItem.objects.all()

    def seed_portfolio(self):
        portfolio_data = [
            {
                "project_title": "Headless commerce rebuild that 3x'd conversion",
                "client": "NorthPeak",
                "category": "E-commerce Platform",
                "description": "Migrated a legacy Shopify storefront to a custom headless build with edge personalization.",
                "metric": "3.1×",
                "metric_label": "Conversion",
                "image_path": "/assets/portfolio/northpeak.png",
                "palette": "from-spark-primary to-spark-primary-deep",
                "size": "lg",
                "featured": True
            },
            {
                "project_title": "AI analytics suite for fintech ops",
                "client": "Lumen Labs",
                "category": "SaaS Dashboard",
                "description": "Designed and engineered a real-time risk dashboard processing 4B events/day.",
                "metric": "4B",
                "metric_label": "Events/day",
                "image_path": "/assets/portfolio/lumen.png",
                "palette": "from-spark-accent to-spark-primary",
                "size": "md",
                "featured": False
            },
            {
                "project_title": "Unified ERP for a 200-store retail group",
                "client": "Atlas Retail",
                "category": "ERP System",
                "description": "Replaced 9 disconnected tools with a single custom ERP — inventory, finance, HR.",
                "metric": "9→1",
                "metric_label": "Tools unified",
                "image_path": "/assets/portfolio/atlas.png",
                "palette": "from-spark-primary-deep to-spark-primary-soft",
                "size": "md",
                "featured": False
            },
            {
                "project_title": "Sustainability app with 250K MAU",
                "client": "Verdant",
                "category": "Mobile App",
                "description": "Cross-platform app with offline-first sync and gamified carbon tracking.",
                "metric": "250K",
                "metric_label": "Monthly users",
                "image_path": "/assets/portfolio/verdant.png",
                "palette": "from-spark-accent to-spark-accent-soft",
                "size": "sm",
                "featured": False
            },
            {
                "project_title": "Identity system for a quantum startup",
                "client": "Quantica",
                "category": "Branding",
                "description": "End-to-end rebrand — naming, logo, voice, guidelines and investor deck.",
                "metric": "$28M",
                "metric_label": "Series A raised",
                "image_path": "/assets/portfolio/quantica.png",
                "palette": "from-spark-primary-soft to-spark-accent",
                "size": "sm",
                "featured": False
            },
            {
                "project_title": "CRM rebuild that cut churn by 41%",
                "client": "Helix Bank",
                "category": "CRM + Analytics",
                "description": "Customer platform with predictive churn scoring and automated retention plays.",
                "metric": "−41%",
                "metric_label": "Churn",
                "image_path": "/assets/portfolio/helix.png",
                "palette": "from-spark-primary to-spark-accent",
                "size": "md",
                "featured": False
            }
        ]
        for p in portfolio_data:
            PortfolioItem.objects.get_or_create(
                project_title=p["project_title"],
                client=p["client"],
                defaults={
                    "category": p["category"],
                    "description": p["description"],
                    "metric": p["metric"],
                    "metric_label": p["metric_label"],
                    "image_path": p["image_path"],
                    "palette": p["palette"],
                    "size": p["size"],
                    "featured": p["featured"]
                }
            )


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        # Auto-seed if database is empty
        if Testimonial.objects.count() == 0:
            self.seed_testimonials()
        return Testimonial.objects.filter(active=True)

    def seed_testimonials(self):
        testimonials_data = [
            {
                "client_name": "Maya Hernandez",
                "role": "VP Growth",
                "company": "NorthPeak",
                "rating": 5,
                "message": "Spark rebuilt our storefront in nine weeks. Conversion 3x'd in the first quarter post-launch — the ROI was unambiguous. They felt like our team, not a vendor.",
                "image_path": "MH",
                "accent": "primary"
            },
            {
                "client_name": "Daniel Park",
                "role": "COO",
                "company": "Atlas Retail",
                "rating": 5,
                "message": "The ERP Spark built replaced nine tools. Our ops team finally has one source of truth — and our finance close dropped from 14 days to 3.",
                "image_path": "DP",
                "accent": "gold"
            },
            {
                "client_name": "Aisha Karim",
                "role": "Founder & CEO",
                "company": "Quantica",
                "rating": 5,
                "message": "Best product studio we've worked with. Senior pod, no handoffs, weekly demos. They shipped our v1 in six weeks and we raised Series A off the prototype.",
                "image_path": "AK",
                "accent": "primary"
            },
            {
                "client_name": "Tom Whitfield",
                "role": "Head of Design",
                "company": "Lumen Labs",
                "rating": 5,
                "message": "Their design system work alone paid for the engagement. Every screen since has shipped 40% faster — and looks award-winning.",
                "image_path": "TW",
                "accent": "gold"
            },
            {
                "client_name": "Sofia Rinaldi",
                "role": "CPO",
                "company": "Helix Bank",
                "rating": 5,
                "message": "We retained Spark after launch for roadmap. Two years in, they've shipped four major releases and our churn is down 41%.",
                "image_path": "SR",
                "accent": "primary"
            },
            {
                "client_name": "Marcus Chen",
                "role": "CMO",
                "company": "Verdant",
                "rating": 5,
                "message": "From brand strategy to analytics dashboard, Spark owned the whole stack. The work is genuinely beautiful — and it performs.",
                "image_path": "MC",
                "accent": "gold"
            }
        ]
        for t in testimonials_data:
            Testimonial.objects.get_or_create(
                client_name=t["client_name"],
                company=t["company"],
                defaults={
                    "role": t["role"],
                    "rating": t["rating"],
                    "message": t["message"],
                    "image_path": t["image_path"],
                    "accent": t["accent"]
                }
            )


class SiteSettingView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        setting = SiteSetting.objects.first()
        if not setting:
            setting = SiteSetting.objects.create(
                company_name="Spark Technology",
                logo_path="/assets/spark-logo.jpg",
                whatsapp_number="+1234567890",
                email="hello@sparktechnology.io",
                address="Remote · Worldwide",
                social_twitter="https://twitter.com/spark",
                social_linkedin="https://linkedin.com/company/spark",
                social_dribbble="https://dribbble.com/spark",
                social_github="https://github.com/spark"
            )
        serializer = SiteSettingSerializer(setting, context={'request': request})
        return Response(serializer.data)
