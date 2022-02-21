import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestApp from '../utils/test_utils/TestApp';
import { load, renderWithRouter } from '../utils/test_utils/testUtils';

test('Should filter products according to category', async () => {
     renderWithRouter(<TestApp />);
     await load();
     const categoryBtn = screen.getByText('tech');
     userEvent.click(categoryBtn);
     await load();
     expect(screen.getAllByText(/tech/)).toHaveLength(2);
     expect(screen.getAllByTestId('product_card')).toHaveLength(1);
});
