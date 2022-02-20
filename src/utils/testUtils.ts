import { waitForElementToBeRemoved, screen } from '@testing-library/react';

export const load = async () => {
     await waitForElementToBeRemoved(screen.getByTestId('loader'));
};
