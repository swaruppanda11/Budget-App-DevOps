import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

describe('Budget App', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('💰 Budget Tracker')).toBeTruthy();
  });

  it('displays total budget', () => {
    const {getByText} = render(<App />);
    expect(getByText(/Total: \$/)).toBeTruthy();
  });

  it('shows empty state message', () => {
    const {getByText} = render(<App />);
    expect(getByText('No budgets yet. Add one above!')).toBeTruthy();
  });
});