import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ProductService} from '../services/product.service';
import * as productActions from '../actions/product.actions';
import {catchError, concatMap, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private productService : ProductService,
              private router:Router) {}

  @Effect()
  public getAllProducts(){
    return this.actions$.pipe(
      ofType(productActions.getAllProducts),
      mergeMap((action) => this.productService.getAllProducts().
      pipe(
        map((products) => productActions.getAllProductsSuccess({products})),
        catchError((error) => of(productActions.getAllProductsFailure({error})))
      ))
    )
  }

  @Effect()
  public getProduct(){
    return this.actions$.pipe(
      ofType(productActions.getProduct),
      mergeMap((action) => this.productService.getProduct(action.productId).
      pipe(
        map((product) => productActions.getProductSuccess({product})),
        catchError((error) => of(productActions.getProductFailure({error})))
      ))
    )
  }

  @Effect()
  public createProduct(){
    return this.actions$.pipe(
      ofType(productActions.createProduct),
      concatMap((action) => this.productService.createProduct(action.product).
      pipe(
        map((product) => productActions.createProductSuccess({product})),
        catchError((error) => of(productActions.createProductFailure({error})))
      ))
    )
  }

  @Effect()
  public updateProduct(){
    return this.actions$.pipe(
      ofType(productActions.updateProduct),
      concatMap((action) => this.productService.updateProduct(action.product , action.productId).
      pipe(
        map((product) => productActions.updateProductSuccess({product})),
        catchError((error) => of(productActions.updateProductFailure({error})))
      ))
    )
  }

  @Effect()
  public deleteProduct(){
    return this.actions$.pipe(
      ofType(productActions.deleteProduct),
      concatMap((action) => this.productService.deleteProduct(action.productId).
      pipe(
        map((product) => productActions.deleteProductSuccess({product})),
        catchError((error) => of(productActions.deleteProductFailure({error})))
      ))
    )
  }

  // Create Product Success redirect to 'admin page'
  @Effect({ dispatch: false })
  createProductSuccess$ = this.actions$.pipe(
    ofType(productActions.createProductSuccess),
    tap(() => this.router.navigate(['/products/admin']))
  );

  // Update Product Success redirect to 'admin page'
  @Effect({ dispatch: false })
  updateProductSuccess$ = this.actions$.pipe(
    ofType(productActions.updateProductSuccess),
    tap(() => this.router.navigate(['/products/admin']))
  );

  // Delete Product Success reload 'same component'
  @Effect({ dispatch: false })
  deleteProductSuccess$ = this.actions$.pipe(
    ofType(productActions.deleteProductSuccess),
    tap(() => this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products/admin']).then(r => {});
    }))
  );
}
