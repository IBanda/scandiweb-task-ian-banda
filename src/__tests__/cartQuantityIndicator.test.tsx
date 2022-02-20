import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { load } from '../utils/testUtils';

test('Cart quantity indicator should show total quantity', async () => {
     render(<App />, { wrapper: MemoryRouter });
     await load();
     const addToCartBtn = screen.getByTestId('add_to_cart');
     userEvent.click(addToCartBtn);
     userEvent.click(addToCartBtn);
     const indicator = screen.getByTestId('indicator');
     expect(indicator).toBeInTheDocument();
     expect(indicator).toHaveTextContent('2');
});
