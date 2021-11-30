import { createAction, props } from '@ngrx/store';
import {IProduct} from '../models/IProduct';

// Get all products
export const getAllProducts = createAction(
  '[Product] GET all Products'
);

export const getAllProductsSuccess = createAction(
  '[Product] GET all Products Success',
  props<{ products: IProduct[] }>()
);

export const getAllProductsFailure = createAction(
  '[Product] GET all Products Failure',
  props<{ error: string }>()
);

// Get a Single Product
export const getProduct = createAction(
  '[Product] GET Product',
  props<{productId : string}>()
);

export const getProductSuccess = createAction(
  '[Product] GET Product Success',
  props<{ product: IProduct }>()
);

export const getProductFailure = createAction(
  '[Product] GET Product Failure',
  props<{ error: string }>()
);

// Create a Product
export const createProduct = createAction(
  '[Product] CREATE Product',
  props<{product : IProduct}>()
);

export const createProductSuccess = createAction(
  '[Product] CREATE Product Success',
  props<{ product: IProduct }>()
);

export const createProductFailure = createAction(
  '[Product] CREATE Product Failure',
  props<{ error: string }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product] UPDATE Product',
  props<{product : IProduct, productId : string}>()
);

export const updateProductSuccess = createAction(
  '[Product] UPDATE Product Success',
  props<{ product: IProduct }>()
);

export const updateProductFailure = createAction(
  '[Product] UPDATE Product Failure',
  props<{ error: string }>()
);

// Delete Product
export const deleteProduct = createAction(
  '[Product] DELETE Product',
  props<{productId : string}>()
);

export const deleteProductSuccess = createAction(
  '[Product] DELETE Product Success',
  props<{ product: IProduct }>()
);

export const deleteProductFailure = createAction(
  '[Product] DELETE Product Failure',
  props<{ error: string }>()
);
