import { Currency, Product, SelectedProduct } from '../utils/interfaces';
import actionTypes from './actionTypes';

export const addToCart = (selectedProduct: SelectedProduct) => ({
     type: actionTypes.addToCart,
     payload: {
          selectedProduct,
     },
});

export const updateCart = (product: Product, quantity: number) => ({
     type: actionTypes.updateCart,
     payload: {
          product,
          quantity,
     },
});

export const removeFromCart = (product: SelectedProduct) => ({
     type: actionTypes.removeFromCart,
     payload: {
          product,
     },
});

export const changeCurrency = (currency: Currency) => ({
     type: actionTypes.changeCurrency,
     payload: {
          currency,
     },
});
