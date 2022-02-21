import TestApp from '../utils/test_utils/TestApp';
import { screen } from '@testing-library/react';
import { load, renderWithRouter } from '../utils/test_utils/testUtils';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../graphql/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import { persistedReducer } from '../store';
import { addToCart } from '../store/actions';
import { selectedProducts } from '../utils/test_utils/testData';
import { SelectedProduct } from '../utils/interfaces';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
     const store = createStore(persistedReducer);
     renderWithRouter(
          <ApolloProvider client={apolloClient}>
               <Provider store={store}>
                    <App />
               </Provider>
          </ApolloProvider>,
          { route: '/cart' }
     );

     store.dispatch(addToCart(selectedProducts[0] as unknown as SelectedProduct));
     store.dispatch(addToCart(selectedProducts[1] as unknown as SelectedProduct));
});

test('Cart page should show all products in cart', () => {
     const cartItems = screen.getAllByTestId('cart_item');
     expect(cartItems).toHaveLength(2);
});
test('Should be able to remove item from cart', () => {
     const removeBtns = screen.getAllByText(/remove/i);
     userEvent.click(removeBtns[0]);
     expect(screen.getAllByTestId('cart_item')).toHaveLength(1);
});
test('Should be able to view other images if more than one', () => {
     const image = screen.getAllByTestId('cart_thumbnail')[1];
     const prevBtn = screen.getByTestId('btn_prev');
     const nextBtn = screen.getByTestId('btn_next');

     expect(prevBtn).toBeDisabled();

     const prevSrc = image.getAttribute('src');

     userEvent.click(nextBtn);

     expect(prevSrc).not.toBe(image.getAttribute('src'));

     userEvent.click(nextBtn);

     expect(nextBtn).toBeDisabled();
});
