-- RestaurantXD — schema Postgres (Neon)
-- Usado pelo script de migração (scripts/migrate.mjs) e para criar um banco do zero:
--   psql "$DATABASE_URL" -f db/schema.sql

create table if not exists restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cuisine_type text,
  price_range int check (price_range between 1 and 4),
  address text,
  notes text,
  wishlist boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists visits (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  visited_at date not null default current_date,
  occasion text check (occasion in (
    'Casual', 'Date', 'Aniversário', 'Almoço de trabalho',
    'Jantar em família', 'Comemoração', 'Turismo'
  )),
  rating_overall  numeric(2,1) check (rating_overall  between 1 and 5),
  rating_food     numeric(2,1) check (rating_food     between 1 and 5),
  rating_service  numeric(2,1) check (rating_service  between 1 and 5),
  rating_ambience numeric(2,1) check (rating_ambience between 1 and 5),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists dishes (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) on delete cascade,
  name text not null,
  category text check (category in ('Entrada', 'Principal', 'Sobremesa', 'Drink', 'Outro')),
  rating numeric(2,1) check (rating between 1 and 5),
  would_order_again boolean,
  price numeric(8,2),
  created_at timestamptz not null default now()
);

create table if not exists visit_people (
  visit_id  uuid references visits(id) on delete cascade,
  person_id uuid references people(id) on delete cascade,
  primary key (visit_id, person_id)
);

create table if not exists dish_people (
  dish_id   uuid references dishes(id) on delete cascade,
  person_id uuid references people(id) on delete cascade,
  primary key (dish_id, person_id)
);

create index if not exists visits_restaurant_id_idx on visits(restaurant_id);
create index if not exists visits_visited_at_idx    on visits(visited_at desc);
create index if not exists dishes_visit_id_idx      on dishes(visit_id);
create index if not exists visit_people_person_idx  on visit_people(person_id);
