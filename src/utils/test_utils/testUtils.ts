import { waitForElementToBeRemoved, screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

export const load = async () => {
     await waitForElementToBeRemoved(screen.getByTestId('loader'));
};

// test utils file
export const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
     window.history.pushState({}, 'Test page', route);

     return render(ui, { wrapper: BrowserRouter });
};
