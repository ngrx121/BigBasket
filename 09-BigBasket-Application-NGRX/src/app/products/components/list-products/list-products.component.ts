import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ProductService} from '../../services/product.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../reducers';
import * as productActions from '../../actions/product.actions';
import * as productReducer from '../../reducers/product.reducer';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public loading:boolean;
  public products:IProduct[] = [];
  public errorMessage:string = '';

  constructor(private store:Store<State>) { }

  ngOnInit(): void {
    // dispatch an action to get all products in keep in the NGRX Store
    this.store.dispatch(productActions.getAllProducts());

    // get All Products data from NGRX Store
    this.store.pipe(select(productReducer.productFeatureKey)).subscribe((state) => {
        this.products = state.products;
        this.errorMessage = state.errorMessage;
        this.loading = state.loading;
    });
  }

}
