import { Product } from '../utils/interfaces';
import actionTypes from './actionTypes';

export const addToCart = (product: Product) => ({
     type: actionTypes.addToCart,
     payload: {
          product,
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
     type: actionTypes.categoryChange,
     payload: {
          category,
     },
});
