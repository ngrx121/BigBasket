import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as productReducer from '../products/reducers/product.reducer';

export interface State {
    [productReducer.productFeatureKey] : productReducer.State
}

export const reducers: ActionReducerMap<State> = {
  [productReducer.productFeatureKey] : productReducer.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
