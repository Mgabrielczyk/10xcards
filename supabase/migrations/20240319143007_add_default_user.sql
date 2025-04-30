-- Insert default user into auth.users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  'd0b4f40a-7874-49fe-b1c0-875c8d1123b4', -- DEFAULT_USER_ID
  'default@example.com',
  '$2a$10$Q7RNHL6H8zxmj/xxx...', -- przykładowe zahaszowane hasło
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated'
)
ON CONFLICT (id) DO NOTHING; 