# Database Schema - Fruit Map

## Overview
The Fruit Map database uses PostgreSQL with PostGIS extension for geospatial data. The schema is designed to efficiently store and query fruit tree locations, seasonal data, user contributions, and community interactions.

## Database Design Principles
- Normalize data to reduce redundancy while maintaining query performance
- Use PostGIS for efficient geospatial indexing and queries
- Implement proper indexing for frequently queried fields
- Ensure data integrity with foreign keys and constraints
- Support scalability with partitioning where appropriate

## Core Tables

### 1. users
Stores user account information and community contributions.

```sql
Table: users
┌─────────────────┬──────────────────┬─────────────┬─────────────┐
│ Column          │ Type             │ Constraints │ Description │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ id              │ UUID             │ PRIMARY KEY │ Unique user │
│                 │                  │             │ identifier  │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ email           │ VARCHAR(255)     │ UNIQUE, NOT │ User email  │
│                 │                  │ NULL        │ address     │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ password_hash   │ VARCHAR(255)     │ NOT NULL    │ BCrypt hash │
│                 │                  │             │ of password │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ username        │ VARCHAR(50)      │ UNIQUE, NOT │ Display     │
│                 │                  │ NULL        │ name        │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ full_name       │ VARCHAR(100)     │             │ User's full │
│                 │                  │             │ name        │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ location        │ GEOGRAPHY(POINT, │             │ User's      │
│                 │ 4326)            │             │ location    │
│                 │                  │             │ for         │
│                 │                  │             │ personal    │
│                 │                  │             │ization     │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ role            │ VARCHAR(20)      │ DEFAULT     │ User role   │
│                 │                  │ 'user'      │ (user,     │
│                 │                  │             │ admin,      │
│                 │                  │             │ moderator)  │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ is_active       │ BOOLEAN          │ DEFAULT     │ Account     │
│                 │                  │ true        │ status      │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ email_verified  │ BOOLEAN          │ DEFAULT     │ Email       │
│                 │                  │ false       │ verification│
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ created_at      │ TIMESTAMP        │ DEFAULT     │ Account     │
│                 │                  │ NOW()       │ creation    │
│                 │                  │             │ date        │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ updated_at      │ TIMESTAMP        │ DEFAULT     │ Last        │
│                 │                  │ NOW()       │ update date │
└─────────────────┴──────────────────┴─────────────┴─────────────┘
```

**Indexes:**
- `idx_users_email`: B-tree index on email for fast lookups
- `idx_users_username`: B-tree index on username
- `idx_users_location`: GiST index on location for geospatial queries
- `idx_users_created_at`: B-tree index on creation date for chronological queries

### 2. tree_species
Standardized list of fruit tree species with seasonal information.

```sql
Table: tree_species
┌─────────────────┬──────────────────┬─────────────┬─────────────┐
│ Column          │ Type             │ Constraints │ Description │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ id              │ SERIAL           │ PRIMARY KEY │ Species ID  │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ name            │ VARCHAR(100)     │ NOT NULL,   │ Common name │
│                 │                  │ UNIQUE      │ of species  │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ scientific_name │ VARCHAR(150)     │ UNIQUE      │ Scientific  │
│                 │                  │             │ name        │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ description     │ TEXT             │             │ Description │
│                 │                  │             │ of the      │
│                 │                  │             │ species     │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ is_native       │ BOOLEAN          │ DEFAULT     │ Whether the │
│                 │                  │ false       │ species is  │
│                 │                  │             │ native to   │
│                 │                  │             │ Brazil      │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ nutritional_info│ JSONB            │             │ Nutritional │
│                 │                  │             │ information │
└─────────────────┴──────────────────┴─────────────┴─────────────┘
```

**Indexes:**
- `idx_species_name`: B-tree index on species name for fast lookups

### 3. trees
Main table storing fruit tree locations and details.

```sql
Table: trees
┌─────────────────┬──────────────────┬─────────────┬─────────────┐
│ Column          │ Type             │ Constraints │ Description │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ id              │ UUID             │ PRIMARY KEY │ Tree ID     │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ species_id      │ INTEGER          │ FOREIGN KEY │ Reference to│
│                 │                  │ (tree_species │ tree_species│
│                 │                  │ .id)        │ table       │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ location        │ GEOGRAPHY(POINT, │ NOT NULL    │ Tree        │
│                 │ 4326)            │             │ coordinates │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ contributor_id  │ UUID             │ FOREIGN KEY │ User who    │
│                 │                  │ (users.id)  │ added the   │
│                 │                  │             │ tree        │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ title           │ VARCHAR(200)     │ NOT NULL    │ Descriptive │
│                 │                  │             │ title for   │
│                 │                  │             │ the tree    │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ description     │ TEXT             │             │ Additional  │
│                 │                  │             │ information │
│                 │                  │             │ about the   │
│                 │                  │             │ tree        │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ accessibility   │ VARCHAR(20)      │ DEFAULT     │ How         │
│                 │                  │ 'public'    │ accessible  │
│                 │                  │             │ the tree is │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ is_verified     │ BOOLEAN          │ DEFAULT     │ Whether the │
│                 │                  │ false       │ tree has    │
│                 │                  │             │ been        │
│                 │                  │             │ verified    │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ status          │ VARCHAR(20)      │ DEFAULT     │ Tree status │
│                 │                  │ 'active'    │ (active,    │
│                 │                  │             │ inactive,   │
│                 │                  │             │ seasonal)   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ created_at      │ TIMESTAMP        │ DEFAULT     │ Record      │
│                 │                  │ NOW()       │ creation    │
│                 │                  │             │ date        │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ updated_at      │ TIMESTAMP        │ DEFAULT     │ Last        │
│                 │                  │ NOW()       │ update      │
│                 │                  │             │ timestamp   │
└─────────────────┴──────────────────┴─────────────┴─────────────┘
```

**Indexes:**
- `idx_trees_location`: GiST index on location for efficient geospatial queries
- `idx_trees_species`: B-tree index on species_id for species-based filtering
- `idx_trees_contributor`: B-tree index on contributor_id
- `idx_trees_created_at`: B-tree index on creation date
- `idx_trees_status`: B-tree index on status for efficient filtering
- `idx_trees_accessibility`: B-tree index on accessibility field

### 4. tree_images
Stores images associated with fruit trees.

```sql
Table: tree_images
┌─────────────────┬──────────────────┬─────────────┬─────────────┐
│ Column          │ Type             │ Constraints │ Description │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ id              │ UUID             │ PRIMARY KEY │ Image ID    │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ tree_id         │ UUID             │ FOREIGN KEY │ Reference to│
│                 │                  │ (trees.id)  │ trees table │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ uploader_id     │ UUID             │ FOREIGN KEY │ User who    │
│                 │                  │ (users.id)  │ uploaded    │
│                 │                  │             │ image       │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ image_url       │ TEXT             │ NOT NULL    │ URL to image│
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ thumbnail_url   │ TEXT             │             │ URL to      │
│                 │                  │             │ thumbnail   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ alt_text        │ VARCHAR(500)     │             │ Description │
│                 │                  │             │ for         │
│                 │                  │             │ accessibility│
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ is_primary      │ BOOLEAN          │ DEFAULT     │ Whether this│
│                 │                  │ false       │ is the      │
│                 │                  │             │ primary     │
│                 │                  │             │ image       │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ uploaded_at     │ TIMESTAMP        │ DEFAULT     │ Upload      │
│                 │                  │ NOW()       │ timestamp   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ approved_at     │ TIMESTAMP        │             │ Approval    │
│                 │                  │             │ timestamp   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ approved_by     │ UUID             │ FOREIGN KEY │ Moderator   │
│                 │                  │ (users.id)  │ who         │
│                 │                  │             │ approved    │
└─────────────────┴──────────────────┴─────────────┴─────────────┘
```

**Indexes:**
- `idx_tree_images_tree_id`: B-tree index on tree_id for tree queries
- `idx_tree_images_uploader`: B-tree index on uploader_id
- `idx_tree_images_primary`: Partial index on is_primary for primary images
- `idx_tree_images_approved_at`: B-tree index on approval timestamp

### 5. seasonal_data
Stores seasonal information for species in different regions.

```sql
Table: seasonal_data
┌─────────────────┬──────────────────┬─────────────┬─────────────┐
│ Column          │ Type             │ Constraints │ Description │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ id              │ SERIAL           │ PRIMARY KEY │ Seasonal    │
│                 │                  │             │ data ID     │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ species_id      │ INTEGER          │ FOREIGN KEY │ Reference to│
│                 │                  │ (tree_species│ tree_species│
│                 │                  │ .id)        │ table       │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ region          │ VARCHAR(100)     │ NOT NULL    │ Brazilian   │
│                 │                  │             │ region      │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ fruiting_months │ INTEGER ARRAY    │ NOT NULL    │ Months when │
│                 │                  │             │ fruit is    │
│                 │                  │             │ typically   │
│                 │                  │             │ available   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ optimal_season  │ VARCHAR(20)      │             │ Best season │
│                 │                  │             │ for fruiting│
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ notes           │ TEXT             │             │ Additional  │
│                 │                  │             │ information │
│                 │                  │             │ about       │
│                 │                  │             │ seasonality │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ updated_at      │ TIMESTAMP        │ DEFAULT     │ Last        │
│                 │                  │ NOW()       │ update      │
│                 │                  │             │ timestamp   │
└─────────────────┴──────────────────┴─────────────┴─────────────┘
```

**Indexes:**
- `idx_seasonal_species_region`: Composite index on species_id and region
- `idx_seasonal_region`: B-tree index on region for regional queries

### 6. reviews
User reviews and ratings for fruit trees.

```sql
Table: reviews
┌─────────────────┬──────────────────┬─────────────┬─────────────┐
│ Column          │ Type             │ Constraints │ Description │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ id              │ UUID             │ PRIMARY KEY │ Review ID   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ tree_id         │ UUID             │ FOREIGN KEY │ Reference to│
│                 │                  │ (trees.id)  │ trees table │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ reviewer_id     │ UUID             │ FOREIGN KEY │ User who    │
│                 │                  │ (users.id)  │ submitted   │
│                 │                  │             │ review      │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ rating          │ INTEGER          │ CHECK       │ Rating from │
│                 │                  │ (rating >=  │ 1 to 5      │
│                 │                  │ 1 AND rating│             │
│                 │                  │ <= 5)       │             │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ comment         │ TEXT             │             │ Review      │
│                 │                  │             │ comment     │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ created_at      │ TIMESTAMP        │ DEFAULT     │ Review      │
│                 │                  │ NOW()       │ timestamp   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ updated_at      │ TIMESTAMP        │ DEFAULT     │ Last        │
│                 │                  │ NOW()       │ update      │
│                 │                  │             │ timestamp   │
└─────────────────┴──────────────────┴─────────────┴─────────────┘
```

**Indexes:**
- `idx_reviews_tree`: B-tree index on tree_id for tree-based queries
- `idx_reviews_reviewer`: B-tree index on reviewer_id to prevent duplicate reviews
- `idx_reviews_rating`: B-tree index on rating for rating-based filtering
- `idx_reviews_created_at`: B-tree index on creation date for chronological ordering
- `idx_unique_user_tree_review`: Unique constraint to prevent duplicate reviews from same user for same tree

### 7. reports
Moderation reports for trees, images, or reviews.

```sql
Table: reports
┌─────────────────┬──────────────────┬─────────────┬─────────────┐
│ Column          │ Type             │ Constraints │ Description │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ id              │ UUID             │ PRIMARY KEY │ Report ID   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ reporter_id     │ UUID             │ FOREIGN KEY │ User who    │
│                 │                  │ (users.id)  │ submitted   │
│                 │                  │             │ report      │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ subject_type    │ VARCHAR(20)      │ NOT NULL    │ Type of     │
│                 │                  │ CHECK       │ subject     │
│                 │                  │ (subject    │ being       │
│                 │                  │ _type IN    │ reported    │
│                 │                  │ ('tree',    │             │
│                 │                  │ 'image',    │             │
│                 │                  │ 'review'))  │             │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ subject_id      │ UUID             │ NOT NULL    │ ID of the   │
│                 │                  │             │ subject     │
│                 │                  │             │ being       │
│                 │                  │             │ reported    │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ reason          │ VARCHAR(50)      │ NOT NULL    │ Reason for  │
│                 │                  │             │ report      │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ description     │ TEXT             │             │ Additional  │
│                 │                  │             │ details     │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ status          │ VARCHAR(20)      │ DEFAULT     │ Report      │
│                 │                  │ 'pending'   │ status      │
│                 │                  │             │ (pending,   │
│                 │                  │             │ reviewed,   │
│                 │                  │             │ resolved)   │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ reviewed_by     │ UUID             │ FOREIGN KEY │ Moderator   │
│                 │                  │ (users.id)  │ who         │
│                 │                  │             │ reviewed    │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ reviewed_at     │ TIMESTAMP        │             │ Timestamp   │
│                 │                  │             │ when        │
│                 │                  │             │ reviewed    │
├─────────────────┼──────────────────┼─────────────┼─────────────┤
│ created_at      │ TIMESTAMP        │ DEFAULT     │ Report      │
│                 │                  │ NOW()       │ timestamp   │
└─────────────────┴──────────────────┴─────────────┴─────────────┘
```

**Indexes:**
- `idx_reports_subject`: Composite index on subject_type and subject_id
- `idx_reports_reporter`: B-tree index on reporter_id
- `idx_reports_status`: B-tree index on status for moderation workflows
- `idx_reports_created_at`: B-tree index on creation date

## Geospatial Queries

### Common Geospatial Queries
1. **Find trees within radius of location:**
```sql
SELECT * FROM trees 
WHERE ST_DWithin(
    location, 
    ST_GeogFromText('POINT(longitude latitude)'), 
    radius_meters
);
```

2. **Find trees within bounding box:**
```sql
SELECT * FROM trees 
WHERE ST_Within(
    location, 
    ST_GeogFromText('POLYGON((lon1 lat1, lon2 lat2, ...))')
);
```

3. **Calculate distance between points:**
```sql
SELECT ST_Distance(
    location, 
    ST_GeogFromText('POINT(target_lon target_lat)')
) AS distance_meters 
FROM trees;
```

## Schema Evolution Strategy

### Versioning
- Database schema changes tracked with version numbers
- Changes applied using migration scripts
- Each version change documented with impact assessment

### Migration Approach
- Use a migration framework (e.g., Flyway or custom scripts)
- Each migration should be backward-compatible where possible
- Test all migrations on staging before production

## Backup and Recovery

### Backup Strategy
- Full database backup daily
- Transaction logs backed up every hour
- Geospatial indexes included in backup
- Encryption of backup data

### Recovery Plan
- Point-in-time recovery capability
- Schema restoration process documented
- Geospatial data integrity verification procedures