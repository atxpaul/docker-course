import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../services/api';
import ItemForm from './ItemForm';

const ItemList: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    fetchItems();
  };

  const handleEdit = (id: number) => {
    setEditingItemId(id);
  };

  const handleSuccess = () => {
    setEditingItemId(null);
    fetchItems();
  };

  return (
    <div>
      {editingItemId ? (
        <ItemForm itemId={editingItemId} onSuccess={handleSuccess} />
      ) : (
        <ItemForm onSuccess={handleSuccess} />
      )}

      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
