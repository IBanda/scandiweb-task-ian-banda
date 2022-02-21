import { screen } from '@testing-library/react';
import TestApp from '../utils/test_utils/TestApp';
import userEvent from '@testing-library/user-event';
import { load, renderWithRouter } from '../utils/test_utils/testUtils';

beforeEach(() => {
     renderWithRouter(<TestApp />);
});

test('Clicking currency switcher should show dropdown', async () => {
     await load();
     userEvent.click(screen.getByTestId('currency_btn'));
     expect(screen.getAllByRole('option')).toHaveLength(2);
});

test('Clicking option should switch app currency', async () => {
     await load();
     const currencySwitchBtn = screen.getByTestId('currency_btn');
     userEvent.click(currencySwitchBtn);
     userEvent.click(screen.getAllByTestId('currency_item_btn')[1]);
     expect(screen.getAllByTestId('price')[0]).toHaveTextContent('£104');
     expect(currencySwitchBtn).toHaveTextContent('£');
});
