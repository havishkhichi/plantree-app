## Master PRD + Technical Specification v2

### Vision
Build the Google Maps of Urban Climate Intelligence using satellite data, AI, and geospatial analytics.

## Phase 0 – Research & Validation
- Sentinel-2 ingestion
- Landsat ingestion
- NDVI generation
- LST generation
- GDI validation
- Pilot city analysis

## Phase 1 – Climate Intelligence Core
### Modules
1. Satellite Engine
2. Heat Engine
3. Vegetation Engine
4. GDI Engine
5. Hotspot Ranking Engine

### Deliverables
- Heat maps
- NDVI maps
- Hotspot maps
- GeoJSON exports

## Phase 2 – Dashboard
### Features
- Interactive map
- Layer manager
- Search
- City explorer

## Phase 3 – Analytics
### Features
- Historical comparisons
- Trend analysis
- Report generation
- Export system

## Phase 4 – Prediction
### Features
- Cooling forecasts
- Scenario modeling
- Climate intelligence recommendations

## Technical Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- MapLibre GL

### Backend
- Supabase
- PostgreSQL
- PostGIS
- Edge Functions

### GIS
- Google Earth Engine
- GeoPandas
- Rasterio
- GDAL
- Shapely
- Xarray
- QGIS

## Data Sources
### Sentinel-2
- NDVI
- NDWI
- Land Cover

### Landsat 8/9
- Land Surface Temperature

### Dynamic World
- Land Classification

### WorldPop
- Population Exposure

### OpenStreetMap
- Roads
- Buildings
- Schools
- Hospitals

## GDI Formula

GDI =
0.40 × Heat
+ 0.25 × Population
+ 0.20 × Vegetation Deficit
+ 0.10 × Suitability
- 0.05 × Exclusion

## Database

### hotspots
- id
- geometry
- gdi_score
- heat_score
- ndvi_score
- population_score
- suitability_score
- confidence_score

### cities
- id
- name
- boundary

### layers
- id
- city_id
- layer_type

## APIs

GET /cities
GET /hotspots
GET /hotspots/{id}
GET /heatmap
GET /gdi
POST /exports

## MVP Roadmap

Week 1: GEE Setup
Week 2: NDVI Engine
Week 3: LST Engine
Week 4: GDI Engine
Week 5: Supabase
Week 6: MapLibre
Week 7: Dashboard
Week 8: Reports
Week 9: Optimization
Week 10: Launch

## North Star

Become the operating system for urban climate intelligence and urban cooling decisions.
