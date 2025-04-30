-- Migration: Create Generations Table
-- Description: Creates the generations table with RLS policies and triggers
-- Author: AI Assistant
-- Date: 2024-03-19

-- Create generations table
create table generations (
    id bigserial primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    model varchar not null,
    generated_count integer not null,
    accepted_unedited_count integer,
    accepted_edited_count integer,
    source_text_hash varchar not null,
    source_text_length integer not null check (source_text_length between 1000 and 10000),
    generation_duration integer not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

comment on table generations is 'Tracks AI generation sessions and their statistics';

-- Create index
create index generations_user_id_idx on generations(user_id);

-- Create trigger for updated_at
create trigger update_generations_updated_at
    before update on generations
    for each row
    execute function update_updated_at_column();

-- Enable RLS
alter table generations enable row level security;

-- RLS Policies
create policy "Users can view their own generations"
    on generations for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert their own generations"
    on generations for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update their own generations"
    on generations for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id); 