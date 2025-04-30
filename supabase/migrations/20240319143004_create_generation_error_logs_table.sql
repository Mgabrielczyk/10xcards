-- Migration: Create Generation Error Logs Table
-- Description: Creates the generation_error_logs table with RLS policies
-- Author: AI Assistant
-- Date: 2024-03-19

-- Create generation_error_logs table
create table generation_error_logs (
    id bigserial primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    model varchar not null,
    source_text_hash varchar not null,
    source_text_length integer not null check (source_text_length between 1000 and 10000),
    error_code varchar(100) not null,
    error_message text not null,
    created_at timestamptz not null default now()
);

comment on table generation_error_logs is 'Logs errors that occur during AI generation process';

-- Create index
create index generation_error_logs_user_id_idx on generation_error_logs(user_id);

-- Enable RLS
alter table generation_error_logs enable row level security;

-- RLS Policies
create policy "Users can view their own error logs"
    on generation_error_logs for select
    to authenticated
    using (auth.uid() = user_id);

create policy "Users can insert their own error logs"
    on generation_error_logs for insert
    to authenticated
    with check (auth.uid() = user_id); 