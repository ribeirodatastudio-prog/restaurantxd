-- RestaurantXD — Schema Supabase
-- Cole isso no SQL Editor do Supabase e execute

-- Extensão para UUID
create extension if not exists "pgcrypto";

-- Restaurantes
create table restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  cuisine_type text,
  price_range int check (price_range between 1 and 4),
  address text,
  notes text,
  wishlist boolean default false,
  created_at timestamptz default now()
);

-- Pessoas (acompanhantes)
create table people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  notes text,
  created_at timestamptz default now()
);

-- Visitas
create table visits (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants(id) on delete cascade,
  visited_at date not null default current_date,
  occasion text check (occasion in (
    'Casual', 'Date', 'Aniversário', 'Almoço de trabalho',
    'Jantar em família', 'Comemoração', 'Turismo'
  )),
  rating_overall numeric(2,1) check (rating_overall between 1 and 5),
  rating_food    numeric(2,1) check (rating_food    between 1 and 5),
  rating_service numeric(2,1) check (rating_service between 1 and 5),
  rating_ambience numeric(2,1) check (rating_ambience between 1 and 5),
  notes text,
  created_at timestamptz default now()
);

-- Pratos
create table dishes (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid references visits(id) on delete cascade,
  name text not null,
  category text check (category in ('Entrada', 'Principal', 'Sobremesa', 'Drink', 'Outro')),
  rating numeric(2,1) check (rating between 1 and 5),
  would_order_again boolean,
  price numeric(8,2),
  created_at timestamptz default now()
);

-- Pessoas na visita (quem foi)
create table visit_people (
  visit_id  uuid references visits(id)  on delete cascade,
  person_id uuid references people(id)  on delete cascade,
  primary key (visit_id, person_id)
);

-- Quem pediu cada prato
create table dish_people (
  dish_id   uuid references dishes(id)  on delete cascade,
  person_id uuid references people(id)  on delete cascade,
  primary key (dish_id, person_id)
);

-- Índices úteis
create index on visits(restaurant_id);
create index on visits(visited_at desc);
create index on dishes(visit_id);
