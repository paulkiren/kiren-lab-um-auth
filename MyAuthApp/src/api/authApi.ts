export const loginApi = async ({username, password}: {username: string, password: string}) => {
  const response = await fetch('https://your-backend-api.com/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  });

  if (!response.ok) {
    throw new Error('Invalid Credentials');
  }

  return response.json();
};
