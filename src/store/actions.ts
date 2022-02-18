import { Currency, Product, SelectedProduct } from '../utils/interfaces';
import actionTypes from './actionTypes';

export const addToCart = (selectedProduct: SelectedProduct) => ({
     type: actionTypes.addToCart,
     payload: {
          selectedProduct,
     },
});

export const updateCart = (product: Product) => ({
     type: actionTypes.updateCart,
     payload: {
          product,
     },
});

export const removeFromCart = (productId: string) => ({
     type: actionTypes.removeFromCart,
     payload: {
          productId,
     },
});

export const changeCategory = (category: string) => ({
     type: actionTypes.changeCategory,
     payload: {
          category,
     },
});

export const changeCurrency = (currency: Currency) => ({
     type: actionTypes.changeCurrency,
     payload: {
          currency,
     },
});
