# Get all users
curl http://localhost:8081/api/users

# Get specific user
curl http://localhost:8081/api/users/1

# Update user
curl -X PUT http://localhost:8081/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com"}'


  # Create PostgreSQL container for user service
docker run --name user-db \
  -e POSTGRES_PASSWORD=user_pass \
  -e POSTGRES_USER=user_service \
  -e POSTGRES_DB=userdb \
  -p 5433:5432 \
  -d postgres


  # run
  mvn clean install
mvn spring-boot:run