-- Migration: Create Flashcards Table
-- Description: Creates the flashcards table with RLS policies and triggers
-- Author: AI Assistant
-- Date: 2024-03-19

-- Create flashcards table
create table flashcards (
    id bigserial primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    front varchar(200) not null,
    back varchar(500) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    generation_id bigint references generations(id) on delete set null
);

comment on table flashcards is 'Stores user flashcards with front and back content';

-- Create indexes
create index flashcards_user_id_idx on flashcards(user_id);
create index flashcards_generation_id_idx on flashcards(generation_id);

-- Create trigger for updated_at
create trigger update_flashcards_updated_at
    before update on flashcards
    for each row
    execute function update_updated_at_column();

-- Enable RLS
alter table flashcards enable row level security;

-- RLS Policies
create policy "Users can view their own flashcards"
    on flashcards for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert their own flashcards"
    on flashcards for insert
    to authenticated
    with check (auth.uid() = user_id);

create policy "Users can update their own flashcards"
    on flashcards for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "Users can delete their own flashcards"
    on flashcards for delete
    to authenticated
    using (auth.uid() = user_id); 