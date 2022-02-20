import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { persistor } from '../store';
import { load } from '../utils/testUtils';

beforeEach(async () => {
     render(<App />);
     await load();
});

afterEach(async () => {
     await persistor.purge();
});

test('Empty cart should show message', async () => {
     userEvent.click(screen.getByTestId('cart_overlay_btn'));
     expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});

test('Added product should show in cart overlay', () => {
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));
     expect(screen.getByTestId('cart_list_item')).toBeInTheDocument();
     expect(screen.getByText(/my bag/i)).toBeInTheDocument();
     expect(screen.getByText(/1 item/i)).toBeInTheDocument();
     expect(screen.getByTestId('cart_list-product_name')).toHaveTextContent(
          'Nike Air Huarache Le'
     );
});

// test('Should be able to change quantity', () => {
//      userEvent.click(screen.getByTestId('add_to_cart'));
//      userEvent.click(screen.getByTestId('cart_overlay_btn'));
//      localStorage.clear();
//      console.log(screen.getByText('+'));
// });
