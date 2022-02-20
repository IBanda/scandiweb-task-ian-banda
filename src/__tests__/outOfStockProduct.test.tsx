import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { load } from '../utils/testUtils';

beforeEach(() => {
     render(<App />, { wrapper: MemoryRouter });
});

test('Should not have add to cart button', async () => {
     await load();
     expect(screen.getAllByTestId('add_to_cart')).toHaveLength(1);
});

test('Should have an overlay indicating out of stock', async () => {
     await load();
     expect(screen.getByText(/out of stock/gi)).toBeInTheDocument();
});
