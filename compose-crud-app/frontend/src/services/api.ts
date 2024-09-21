const API_URL = 'http://localhost:5000'; 

export const getItems = async () => {
  const response = await fetch(`${API_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const getItem = async (id: number) => {
  const response = await fetch(`${API_URL}/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch item');
  }
  return response.json();
};

export const createItem = async (item: { name: string, description?: string }) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

export const updateItem = async (id: number, item: { name: string, description?: string }) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error('Failed to update item');
  }
  return response.json();
};

export const deleteItem = async (id: number) => {
  const response = await fetch(`${API_URL}/items/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete item');
  }
  return response.json();
};
