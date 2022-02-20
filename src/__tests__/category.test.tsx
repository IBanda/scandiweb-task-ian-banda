import { render, waitForElementToBeRemoved, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { load } from '../utils/testUtils';

test('Should filter products according to category', async () => {
     render(<App />, { wrapper: MemoryRouter });
     await load();
     const categoryBtn = screen.getByText('tech');
     userEvent.click(categoryBtn);
     await load();
     expect(screen.getAllByTestId('product_card')).toHaveLength(1);
});
