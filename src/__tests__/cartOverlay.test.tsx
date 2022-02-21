import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestApp from '../utils/test_utils/TestApp';
import { load, renderWithRouter } from '../utils/test_utils/testUtils';

beforeEach(async () => {
     renderWithRouter(<TestApp />);
     await load();
});

test('Empty cart should show message', async () => {
     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});

test('Added product should show in cart overlay', async () => {
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     expect(screen.getByTestId('cart_list_item')).toBeInTheDocument();
     expect(screen.getByTestId('cart_list')).toMatchSnapshot();
});

test('Car count should show total quantity', () => {
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     expect(screen.getByText(/2 items/i)).toBeInTheDocument();
});

test('Should change product quantity in overlay', () => {
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     userEvent.click(screen.getByTestId('btn_inc'));

     expect(screen.getByTestId('quantity')).toHaveTextContent('2');
     expect(screen.getByTestId('indicator')).toHaveTextContent('2');
});

test('A quantity of 0 should remove product from cart', () => {
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     userEvent.click(screen.getByTestId('btn_dec'));

     expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
});

test('First attribute should be selected', () => {
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     expect(screen.getByTestId(/size-0/i)).toHaveClass('selected');
});

test('View bag should navigate to cart page', () => {
     userEvent.click(screen.getByTestId('add_to_cart'));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));
     userEvent.click(screen.getByText(/view bag/i));

     expect(screen.getByText(/cart/i)).toBeInTheDocument();
});
