## Product Requirements Document (PRD) v1.0

### Vision
Build the world's most accessible Urban Climate Intelligence Platform that identifies, ranks, and visualizes urban heat vulnerability zones using satellite imagery, AI, and open geospatial data.

### Core Positioning
Not a tree-planting app.

A climate intelligence platform that helps cities, NGOs, researchers, developers, and sponsors understand:
- Where cities are overheating
- Where green infrastructure is missing
- Which locations will benefit most from intervention
- How urban cooling can be measured and tracked

---

# Executive Summary

Urban areas suffer from increasing Urban Heat Island (UHI) effects due to:

- Concrete expansion
- Reduced vegetation
- Population density
- Poor urban planning

Current greening initiatives are mostly reactive and location-agnostic.

UCIP introduces a Green Deficit Intelligence Engine that uses:
- Sentinel-2
- Landsat 8/9
- Dynamic World
- WorldPop
- OpenStreetMap

to generate a Green Deficit Index (GDI) and rank locations by intervention priority.

---

# Problem Statement

Cities currently lack:

1. Hyperlocal heat intelligence
2. Actionable cooling recommendations
3. Data-driven greening prioritization
4. Measurable intervention impact

Existing systems answer:

"Where can we plant?"

UCIP answers:

"Where should we plant first?"

---

# Product Goals

## Primary Goal

Identify high-impact urban cooling opportunities.

## Secondary Goals

- Visualize urban heat islands
- Map canopy deficits
- Prioritize intervention zones
- Support policy decisions
- Enable climate investment

---

# Users

## Researchers

Need:
- Heat maps
- GIS exports
- Trend analysis

## NGOs

Need:
- Priority intervention zones
- Campaign planning

## Municipalities

Need:
- Urban planning intelligence
- Climate resilience planning

## Corporate ESG Teams

Need:
- Location-based impact opportunities
- Climate investment insights

---

# Green Deficit Index (GDI)

Formula:

GDI =
(w1 × Heat Intensity)
+ (w2 × Population Exposure)
+ (w3 × Vegetation Deficit)
+ (w4 × Land Suitability)
- (w5 × Exclusion Zones)

Recommended Weights:

Heat Intensity = 40%
Population Exposure = 25%
Vegetation Deficit = 20%
Land Suitability = 10%
Exclusion Zones = 5%

Output Range:

0–100

Categories:

0–20 Low
21–40 Moderate
41–60 High
61–80 Severe
81–100 Critical

---

# Data Sources

## Satellite

Sentinel-2
Purpose:
- NDVI
- Land cover

Landsat 8/9
Purpose:
- Surface temperature

## Population

WorldPop

Purpose:
- Human exposure analysis

## Land Cover

Dynamic World

Purpose:
- Built-up detection
- Vegetation classification

## Mapping

OpenStreetMap

Purpose:
- Roads
- Parks
- Schools
- Hospitals

## Protected Areas

WDPA

Purpose:
- Exclusion filtering

---

# Core Features

## Feature 1: Urban Heat Map

Displays:
- Surface temperature
- Heat severity zones

Layers:
- Temperature
- Population
- Vegetation

## Feature 2: Green Deficit Layer

Displays:
- Low vegetation areas
- Canopy deficit zones

## Feature 3: Priority Zone Ranking

Outputs:

- Rank
- GDI Score
- Area
- Population affected

## Feature 4: Climate Opportunity Dashboard

Shows:

- Top intervention zones
- Estimated cooling impact
- Estimated population benefit

## Feature 5: GeoJSON Export

Exports:

- Hotspots
- Heat maps
- Intervention polygons

---

# System Architecture

Data Sources
↓
Google Earth Engine
↓
Processing Pipeline
↓
GDI Engine
↓
GeoJSON Generator
↓
Supabase/PostGIS
↓
API Layer
↓
Web Dashboard

---

# Technology Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- MapLibre GL

## Backend

- Supabase
- PostgreSQL
- PostGIS
- Edge Functions

## GIS

- Google Earth Engine
- QGIS
- GeoPandas
- Rasterio
- Xarray
- Shapely

## Hosting

- Cloudflare Pages
- Vercel

---

# Database Schema

## hotspots

Fields:

- id
- geometry
- gdi_score
- ndvi
- lst
- population_score
- suitability_score
- confidence_score

## datasets

Fields:

- id
- source
- acquisition_date
- coverage_area

## exports

Fields:

- id
- user_id
- export_type
- created_at

---

# API Design

GET /hotspots

Returns hotspot polygons

GET /hotspots/{id}

Returns hotspot details

GET /heatmap

Returns heat layer

GET /gdi

Returns GDI dataset

GET /exports

Returns generated exports

---

# MVP Scope

Included:

✓ Heat maps
✓ NDVI maps
✓ GDI scoring
✓ Priority ranking
✓ GeoJSON exports
✓ Dashboard

Excluded:

✗ Tree planting workflows
✗ NGO management
✗ Nursery marketplace
✗ Sponsorship system
✗ AI image verification

---

# Success Metrics

Technical

- Processing accuracy
- Dataset freshness
- API latency

Business

- Cities onboarded
- Hotspots generated
- Reports exported

Impact

- Population coverage
- Cooling opportunities identified

---

# Development Roadmap

## Phase 1

Climate Intelligence Core

Duration:
4–6 weeks

Deliverables:

- GDI Engine
- Heat maps
- NDVI processing

## Phase 2

Dashboard

Duration:
4 weeks

Deliverables:

- Interactive map
- Analytics UI

## Phase 3

Exports & Reporting

Duration:
2 weeks

Deliverables:

- PDF reports
- GeoJSON exports

## Phase 4

Enterprise Features

Future

- ESG dashboards
- Municipality portal
- Climate forecasting

---

# Long-Term Vision

Become the operating system for urban climate intelligence.

From identifying heat islands today to predicting climate vulnerability, greening opportunities, and urban resilience strategies for cities worldwide.
