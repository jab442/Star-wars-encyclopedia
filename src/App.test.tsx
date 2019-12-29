import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import State from './State'

test('renders learn react link', () => {
  const appState = new State();
  const { getByText } = render(<App appState={appState}/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
