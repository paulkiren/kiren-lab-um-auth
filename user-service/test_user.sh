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
