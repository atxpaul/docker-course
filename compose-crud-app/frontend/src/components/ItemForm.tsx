import React, { useState, useEffect } from 'react';
import { createItem, updateItem, getItem } from '../services/api';

interface ItemFormProps {
  itemId?: number;
  onSuccess: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ itemId, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (itemId) {
      getItem(itemId).then(item => {
        setName(item.name);
        setDescription(item.description);
      });
    }
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const item = { name, description };

    if (itemId) {
      await updateItem(itemId, item);
    } else {
      await createItem(item);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <button type="submit">{itemId ? 'Update' : 'Create'} Item</button>
    </form>
  );
};

export default ItemForm;
