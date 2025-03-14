#!/bin/bash

# Test /test endpoint
echo "Testing /test endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/test)
if [ "$response" -eq 200 ]; then
  echo "/test endpoint is working"
else
  echo "/test endpoint failed with status code $response"
fi

# Register a user
echo "Registering a user..."
curl -s -X POST http://localhost:3000/users/register \
     -H "Content-Type: application/json" \
     -d '{"username": "user1", "password": "pass123", "email": "user1@example.com"}'

# Register a client
echo "Registering a client..."
curl -s -X POST http://localhost:3000/clients/register \
     -H "Content-Type: application/json" \
     -d '{"clientId": "client1", "clientSecret": "secret123"}'

# Test /oauth/token endpoint
echo "Testing /oauth/token endpoint..."
token_response=$(curl -s -X POST http://localhost:3000/oauth/token \
     -H "Content-Type: application/json" \
     -d '{"grant_type": "password", "username": "user1", "password": "pass123", "client_id": "client1", "client_secret": "secret123"}')
token=$(echo $token_response | jq -r '.access_token')

if [ "$token" != "null" ]; then
  echo "/oauth/token endpoint is working"
else
  echo "/oauth/token endpoint failed"
fi

# Test /secure endpoint
echo "Testing /secure endpoint..."
secure_response=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $token" http://localhost:3000/secure)
if [ "$secure_response" -eq 200 ]; then
  echo "/secure endpoint is working"
else
  echo "/secure endpoint failed with status code $secure_response"
fi