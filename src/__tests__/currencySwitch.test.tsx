import { ApolloProvider } from '@apollo/client';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import apolloClient from '../graphql/client';
import { store } from '../store';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { load } from '../utils/testUtils';

beforeEach(() => {
     render(<App />, { wrapper: MemoryRouter });
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
