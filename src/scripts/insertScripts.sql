-- Insert data into users table
INSERT INTO "users" 
    ("firstName", "lastName", "userName", "email", "password", "mobileNumber", "userRole", "createdAt", "updatedAt") 
VALUES 
    ('firstTestName', 'firstLastName', 'test1', 'test1@gmail.com', '$2b$10$RK6RGCaYEaEvwzsWlCM/ve3D1aOsntlOwkMoXOzKT2POiAoWqxSHC', '2345678901', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('secondTestName', 'secondLastName', 'test2', 'test2@gmail.com', '$2b$10$nJggrWbbGJiiEGHanEuVnOIZ8JdMayYblE4UhpcuFb22X7WHC1Fr6', '1234567890', 'USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("userName") DO NOTHING;