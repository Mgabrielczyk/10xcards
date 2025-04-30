-- Migration: Create Extensions
-- Description: Enables required PostgreSQL extensions
-- Author: AI Assistant
-- Date: 2024-03-19

-- Enable required extensions
create extension if not exists "uuid-ossp"; 