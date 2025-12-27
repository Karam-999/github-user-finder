export const fetchGitHubUser = async (username: string) => {
  const resp = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`
  );
  if (!resp.ok) {
    throw new Error('User not found');
  }
  const data = await resp.json();
  console.log(data);
  return data;
};
export const searchGitHubUser = async (query: string) => {
  const resp = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`
  );
  if (!resp.ok) {
    throw new Error('User not found');
  }
  const data = await resp.json();
  console.log(data);
  return data.items;
};

// https://api.github.com/search/users?q=Q