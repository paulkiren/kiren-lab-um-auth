curl -X POST http://localhost:8081/users/register \
     -H "Content-Type: application/json" \
     -d '{"username": "user1", "password": "pass123", "email": "user1@example.com", "role": "USER"}'

curl -X POST http://localhost:8081/users/register \
     -H "Content-Type: application/json" \
     -d '{"username": "admin1", "password": "admin123", "email": "admin@example.com", "role": "ADMIN"}'

# Capture the token from the login response
TOKEN=$(curl -X POST http://localhost:8081/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "admin1", "password": "admin123"}' | jq -r '.token')

curl -X GET http://localhost:8081/admin/users \
     -H "Authorization: Bearer $TOKEN"
