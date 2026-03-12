-- Insert Admins
INSERT INTO users (id, name, email, password, address, role, "createdAt", "updatedAt")
VALUES 
  ('admin-1', 'System Administrator', 'admin@modak-cafe.com', '$2b$10$tjc6I4rLX/UQsM/e1moWrukLwomku4Mh8I6flKc1AeNaJIIU1P4xe', 'Modak-Cafe HQ, Sanawad, Madhya Pradesh', 'ADMIN', NOW(), NOW()),
  ('admin-2', 'Secondary Admin', 'admin2@modak-cafe.com', '$2b$10$tjc6I4rLX/UQsM/e1moWrukLwomku4Mh8I6flKc1AeNaJIIU1P4xe', 'Modak-Cafe Branch Office, Indore', 'ADMIN', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert Store Owners
INSERT INTO users (id, name, email, password, address, role, "createdAt", "updatedAt")
VALUES 
  ('owner-1', 'Rajesh Kumar', 'owner@store1.com', '$2b$10$b6/zVkyALVPEiwNCZOnQNe3n9bg1T1Csbw.RVu20FCQ1KJnFvXu.C', 'Main Street, Sanawad', 'STORE_OWNER', NOW(), NOW()),
  ('owner-2', 'Priya Sharma', 'owner@store2.com', '$2b$10$b6/zVkyALVPEiwNCZOnQNe3n9bg1T1Csbw.RVu20FCQ1KJnFvXu.C', 'Market Road, Sanawad', 'STORE_OWNER', NOW(), NOW()),
  ('owner-3', 'Amit Patel', 'owner@store3.com', '$2b$10$b6/zVkyALVPEiwNCZOnQNe3n9bg1T1Csbw.RVu20FCQ1KJnFvXu.C', 'Gandhi Chowk, Sanawad', 'STORE_OWNER', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert Normal Users
INSERT INTO users (id, name, email, password, address, role, "createdAt", "updatedAt")
VALUES 
  ('user-1', 'User One Test Account', 'user1@example.com', '$2b$10$PsXIfKvf0ERXbkAqvruMBuuBOAVjlv.Kb792IoG0nCkQm8lbvcELC', 'Address 1, Sanawad, Madhya Pradesh', 'USER', NOW(), NOW()),
  ('user-2', 'User Two Test Account', 'user2@example.com', '$2b$10$PsXIfKvf0ERXbkAqvruMBuuBOAVjlv.Kb792IoG0nCkQm8lbvcELC', 'Address 2, Sanawad, Madhya Pradesh', 'USER', NOW(), NOW()),
  ('user-3', 'User Three Test Account', 'user3@example.com', '$2b$10$PsXIfKvf0ERXbkAqvruMBuuBOAVjlv.Kb792IoG0nCkQm8lbvcELC', 'Address 3, Sanawad, Madhya Pradesh', 'USER', NOW(), NOW()),
  ('user-4', 'User Four Test Account', 'user4@example.com', '$2b$10$PsXIfKvf0ERXbkAqvruMBuuBOAVjlv.Kb792IoG0nCkQm8lbvcELC', 'Address 4, Sanawad, Madhya Pradesh', 'USER', NOW(), NOW()),
  ('user-5', 'User Five Test Account', 'user5@example.com', '$2b$10$PsXIfKvf0ERXbkAqvruMBuuBOAVjlv.Kb792IoG0nCkQm8lbvcELC', 'Address 5, Sanawad, Madhya Pradesh', 'USER', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert Stores
INSERT INTO stores (id, name, email, address, "ownerId", "createdAt", "updatedAt")
VALUES 
  ('store-1', 'Modak-Cafe Main Branch Store', 'main@modak-cafe.com', 'Shop 12, Main Street, Sanawad, Madhya Pradesh - 451111', 'owner-1', NOW(), NOW()),
  ('store-2', 'Sweet Delights Cafe Store', 'contact@sweetdelights.com', 'Plot 45, Market Road, Sanawad, Madhya Pradesh - 451111', 'owner-2', NOW(), NOW()),
  ('store-3', 'Bistro Paradise Restaurant', 'hello@bistroparadise.com', 'Building 7, Gandhi Chowk, Sanawad, Madhya Pradesh - 451111', 'owner-3', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert Ratings
INSERT INTO ratings (id, "userId", "storeId", rating, "createdAt", "updatedAt")
VALUES 
  ('rating-1', 'user-1', 'store-1', 5, NOW(), NOW()),
  ('rating-2', 'user-1', 'store-2', 4, NOW(), NOW()),
  ('rating-3', 'user-2', 'store-1', 5, NOW(), NOW()),
  ('rating-4', 'user-2', 'store-3', 3, NOW(), NOW()),
  ('rating-5', 'user-3', 'store-1', 4, NOW(), NOW()),
  ('rating-6', 'user-3', 'store-2', 5, NOW(), NOW()),
  ('rating-7', 'user-4', 'store-2', 4, NOW(), NOW()),
  ('rating-8', 'user-4', 'store-3', 5, NOW(), NOW()),
  ('rating-9', 'user-5', 'store-1', 5, NOW(), NOW()),
  ('rating-10', 'user-5', 'store-3', 4, NOW(), NOW())
ON CONFLICT ("userId", "storeId") DO NOTHING;
