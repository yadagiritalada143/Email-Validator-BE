-- Update a user's email:
UPDATE "users" 
SET "email" = 'new_email@example.com', "updatedAt" = CURRENT_TIMESTAMP
WHERE "userName" = 'test1';