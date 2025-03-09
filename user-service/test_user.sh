curl -X POST http://localhost:8081/users/register \
     -H "Content-Type: application/json" \
     -d '{
           "username": "kiren",
           "password": "securepass",
           "email": "kiren@example.com",
           "role": "USER"
         }'

curl -X POST http://localhost:8081/users/register \
        -H "Content-Type: application/json" \
        -d '{
            "username": "admin",
            "password": "adminpass",
            "email": "
            }'

curl -X GET http://localhost:8081/users
curl -X GET http://localhost:8081/users/1


# Path: user-service/test_user.sh
curl -X POST http://localhost:8081/users/register \
     -H "Content-Type: application/json" \
     -d '{"username": "kiren", "password": "securepass", "email": "kiren@example.com", "role": "USER"}'


curl -X POST http://localhost:8081/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "kiren", "password": "securepass"}'

    #  { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }

curl -X GET http://localhost:8081/users \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
