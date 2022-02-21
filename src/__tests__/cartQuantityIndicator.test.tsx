import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestApp from '../utils/test_utils/TestApp';
import { load, renderWithRouter } from '../utils/test_utils/testUtils';

test('Cart quantity indicator should show total quantity', async () => {
     renderWithRouter(<TestApp />);
     await load();
     const addToCartBtn = screen.getByTestId('add_to_cart');
     userEvent.click(addToCartBtn);
     userEvent.click(addToCartBtn);
     const indicator = screen.getByTestId('indicator');
     expect(indicator).toBeInTheDocument();
     expect(indicator).toHaveTextContent('2');
});
