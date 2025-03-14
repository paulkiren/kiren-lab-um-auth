export const loginApi = async ({username, password}: {username: string, password: string}) => {
  const response = await fetch('http://localhost:8082/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  });
  console.log(  "Request Body",JSON.stringify({username, password}),);
console.log(response);
  if (!response.ok) {

    console.log(await response.json());
    throw new Error('Invalid Credentials');
  }

  return response.json();
};
