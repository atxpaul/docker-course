import React from 'react';
import ItemList from './components/ItemList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Item Manager</h1>
      <ItemList />
    </div>
  );
};

export default App;