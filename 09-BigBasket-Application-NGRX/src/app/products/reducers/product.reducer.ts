import { Action, createReducer, on } from '@ngrx/store';
import {IProduct} from '../models/IProduct';
import * as productActions from '../actions/product.actions';
import {buffer} from 'rxjs/operators';

export const productFeatureKey = 'product';

export interface State {
  loading : boolean,
  products : IProduct[],
  selectedProduct : IProduct,
  errorMessage : string
}

export const initialState: State = {
  loading : false,
  products : [],
  selectedProduct : {
    _id : '',
    name : '',
    price : null,
    image : '',
    qty : null,
    info : ''
  },
  errorMessage : ''
};


export const reducer = createReducer(
  initialState,
  // Get All Products
  on(productActions.getAllProducts, (state) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.getAllProductsSuccess, (state , {products}) => {
    return {
      ...state,
      loading : false,
      products : products
    }
  }),
  on(productActions.getAllProductsFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // Get a Product
  on(productActions.getProduct, (state, {productId}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.getProductSuccess, (state, {product}) => {
    return {
      ...state,
      loading : false,
      selectedProduct : product
    }
  }),
  on(productActions.getProductFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // Create a Product
  on(productActions.createProduct, (state, {product}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.createProductSuccess, (state, {product}) => {
    return {
      ...state,
      loading : false
    }
  }),
  on(productActions.createProductFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // update Product
  on(productActions.updateProduct, (state, {product , productId}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.updateProductSuccess, (state, {product}) => {
    return {
      ...state,
      loading : false
    }
  }),
  on(productActions.updateProductFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // Delete Product
  on(productActions.deleteProduct, (state, {productId}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.deleteProductSuccess, (state, {product}) => {
    return {
      ...state,
      loading : false
    }
  }),
  on(productActions.deleteProductFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
);

