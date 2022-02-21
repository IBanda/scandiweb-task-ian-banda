import { screen } from '@testing-library/react';
import { load, renderWithRouter } from '../utils/test_utils/testUtils';
import TestApp from '../utils/test_utils/TestApp';
import userEvent from '@testing-library/user-event';

test('Should render the product page', async () => {
     renderHelper('/product/huarache-x-stussy-le');
     await load();
     expect(screen.getByText('Nike Air Huarache Le')).toBeInTheDocument();
});

test('Should add in stock product to cart ', async () => {
     renderHelper('/product/huarache-x-stussy-le');
     await load();
     userEvent.click(screen.getByText(/add to cart/i));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     expect(screen.getByTestId('indicator')).toHaveTextContent('1');
     expect(screen.getByTestId('cart_list_item')).toBeInTheDocument();
});

test('Changing currency should change product currency', async () => {
     renderHelper('/product/huarache-x-stussy-le');

     await load();
     userEvent.click(screen.getByTestId('currency_btn'));
     userEvent.click(screen.getAllByTestId('currency_item_btn')[1]);
     expect(screen.getByText('£104'));
});

test('Add to cart button should not render on out of stock product', async () => {
     renderHelper('/product/ps-5');
     await load();
     expect(screen.queryByText(/add to cart/i)).not.toBeInTheDocument();
     expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
});

test('Clicking thumbnail should change main image', async () => {
     renderHelper('/product/huarache-x-stussy-le');

     await load();

     const thumbnails = screen.getAllByTestId('thumbnail');
     const mainImg = screen.getByTestId('main_img');
     userEvent.click(thumbnails[2]);
     expect(thumbnails[2].getAttribute('src')).toBe(mainImg.getAttribute('src'));
});

test('Should be able to select product  attributes', async () => {
     renderHelper('/product/huarache-x-stussy-le');
     await load();
     userEvent.click(screen.getAllByRole('radio')[3]);
     userEvent.click(screen.getByText(/add to cart/i));
     userEvent.click(screen.getByTestId('cart_overlay_btn'));
     screen
          .getAllByTestId(/size-3/i)
          .forEach((ele) => expect(ele).toHaveClass('selected'));
});

test('Same product with different attributes should be listed seperately', async () => {
     renderHelper('/product/huarache-x-stussy-le');
     await load();

     const attributeInputs = screen.getAllByRole('radio');

     userEvent.click(attributeInputs[3]);
     userEvent.click(screen.getByText(/add to cart/i));

     userEvent.click(attributeInputs[2]);
     userEvent.click(screen.getByText(/add to cart/i));

     userEvent.click(screen.getByTestId('cart_overlay_btn'));

     expect(screen.getAllByTestId('cart_list_item')).toHaveLength(2);
});

function renderHelper(route: string) {
     renderWithRouter(<TestApp />, {
          route,
     });
}
