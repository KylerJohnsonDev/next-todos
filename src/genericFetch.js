export const genericFetch = async (fetcherFn) => {
  let error = null;
  let data = null;
  try {
    const response = await fetcherFn();
    data = await response.json();
    if (response.status >= 400) {
      error = `Error fetching todos: ${data.message}`;
    }
  } catch (err) {
    error = err.message;
  }
  return { error, data };
};
