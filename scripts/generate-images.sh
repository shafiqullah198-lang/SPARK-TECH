#!/bin/bash
# Generate all visual assets for Spark Technology landing page
# Using supported sizes only: 1024x1024, 1344x768, 768x1344

set -e
OUT=/home/z/my-project/public/assets
SIZE_LAND="1344x768"   # landscape (hero, portfolio)
SIZE_SQ="1024x1024"    # square (service cards)

echo "=== Generating hero dashboard visual ==="
z-ai image -p "Premium 3D rendered floating ERP dashboard UI mockup, dark burgundy and gold color scheme, glassmorphism panels showing analytics charts, revenue graphs, KPI cards, floating in dark space with soft golden glow, cinematic lighting, Apple keynote style, ultra detailed, 8k render" -o "$OUT/hero/hero-dashboard.png" -s $SIZE_LAND

echo "=== Generating service card visuals (10 services) ==="
z-ai image -p "Minimalist 3D illustration of code editor with floating UI elements, web development concept, burgundy and gold gradient background, glassmorphism, premium tech aesthetic, soft shadows" -o "$OUT/services/web-dev.png" -s $SIZE_SQ
z-ai image -p "3D rendered floating smartphone showing mobile app interface, gold and burgundy color scheme, premium product render, soft studio lighting, minimal background" -o "$OUT/services/mobile-apps.png" -s $SIZE_SQ
z-ai image -p "3D illustration of ERP system dashboard with connected modules, inventory finance HR icons floating, burgundy and gold, glassmorphism cards, premium tech" -o "$OUT/services/erp.png" -s $SIZE_SQ
z-ai image -p "3D CRM dashboard visualization with customer journey pipeline, contacts network, burgundy gold premium color scheme, glassmorphism, cinematic" -o "$OUT/services/crm.png" -s $SIZE_SQ
z-ai image -p "UI UX design concept illustration, wireframes and design system components floating, burgundy gold palette, premium minimal 3D render" -o "$OUT/services/uiux.png" -s $SIZE_SQ
z-ai image -p "Graphic design illustration with pen tool, color swatches, brand elements floating, burgundy and gold premium aesthetic, 3D render" -o "$OUT/services/graphic.png" -s $SIZE_SQ
z-ai image -p "Social media marketing visualization, floating social posts and engagement metrics, burgundy gold premium 3D render, glassmorphism" -o "$OUT/services/social.png" -s $SIZE_SQ
z-ai image -p "Branding concept illustration, logo design process, brand guidelines floating, burgundy and gold premium 3D render" -o "$OUT/services/branding.png" -s $SIZE_SQ
z-ai image -p "E-commerce website mockup 3D render, shopping cart, product cards floating, burgundy gold premium aesthetic, glassmorphism" -o "$OUT/services/ecommerce.png" -s $SIZE_SQ
z-ai image -p "Analytics dashboard 3D render with charts graphs data visualization, burgundy and gold premium color scheme, glassmorphism panels" -o "$OUT/services/analytics.png" -s $SIZE_SQ

echo "=== Generating portfolio project visuals (6 projects) ==="
z-ai image -p "Premium e-commerce website screenshot on desktop browser, modern fashion store, clean minimal design, burgundy accent colors" -o "$OUT/portfolio/northpeak.png" -s $SIZE_LAND
z-ai image -p "Premium fintech analytics dashboard UI, real-time data charts, dark mode with gold accents, professional financial software" -o "$OUT/portfolio/lumen.png" -s $SIZE_LAND
z-ai image -p "ERP system dashboard interface, inventory management, multiple data panels, clean enterprise software UI, burgundy and white" -o "$OUT/portfolio/atlas.png" -s $SIZE_LAND
z-ai image -p "Sustainability mobile app UI screens, green and burgundy color scheme, carbon tracking dashboard, modern minimal design" -o "$OUT/portfolio/verdant.png" -s $SIZE_LAND
z-ai image -p "Quantum tech startup branding mockup, logo design, business cards, brand guidelines, premium minimal presentation" -o "$OUT/portfolio/quantica.png" -s $SIZE_LAND
z-ai image -p "Banking CRM dashboard UI, customer retention analytics, professional fintech interface, dark mode with gold highlights" -o "$OUT/portfolio/helix.png" -s $SIZE_LAND

echo "=== ALL IMAGES GENERATED ==="
ls -la $OUT/hero/ $OUT/services/ $OUT/portfolio/
