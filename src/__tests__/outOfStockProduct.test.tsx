import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TestApp from '../utils/test_utils/TestApp';
import { load } from '../utils/test_utils/testUtils';

beforeEach(() => {
     render(<TestApp />, { wrapper: MemoryRouter });
});

test('Should not have add to cart button', async () => {
     await load();
     expect(screen.getAllByTestId('add_to_cart')).toHaveLength(1);
});

test('Should have an overlay indicating out of stock', async () => {
     await load();
     expect(screen.getByText(/out of stock/gi)).toBeInTheDocument();
});
