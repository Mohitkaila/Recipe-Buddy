import React from 'react';
import { render } from '@testing-library/react';
import Register from './Register'; 
import { BrowserRouter } from 'react-router-dom';

test('renders Register component', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  
});
