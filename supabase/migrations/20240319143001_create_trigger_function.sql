-- Migration: Create Updated At Trigger Function
-- Description: Creates a reusable trigger function for updating timestamps
-- Author: AI Assistant
-- Date: 2024-03-19

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql; 