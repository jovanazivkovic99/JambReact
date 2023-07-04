import React from 'react';
import ParentComponent from './components/ParentComponent/ParentComponent';
import './App.css';

export const Example = () => {
  return(
    <div className="app">
      <ParentComponent />
    </div>
  );
};

export default Example;
