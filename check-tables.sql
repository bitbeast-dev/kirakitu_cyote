-- Run this in Supabase SQL Editor to check if tables exist

-- Check all tables in public schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check all schemas
SELECT schema_name 
FROM information_schema.schemata;

-- If tables exist, show them
SELECT * FROM pg_tables WHERE schemaname = 'public';
