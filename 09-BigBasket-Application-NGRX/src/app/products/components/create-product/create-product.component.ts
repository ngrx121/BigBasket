import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {Store} from '@ngrx/store';
import {State} from '../../../reducers';
import * as productActions from '../../actions/product.actions';
import * as productReducer from '../../reducers/product.reducer';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product:IProduct = {
    _id : '',
    name : '',
    image : '',
    price : null,
    qty : null,
    info : ''
  };
  public imageFileName:any;
  public errorMessage:string;
  public emptyFields:boolean;

  constructor(private store:Store<State>) { }

  ngOnInit(): void {
  }

  // selectProductImage
  public selectProductImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.imageFileName = file;
      reader.addEventListener('load', () => {
        return reader.result ? this.product.image = String(reader.result) : '';
      });
    }
  }

  // submitCreateProduct
  public submitCreateProduct(){
    if(this.product.name !== '' && this.product.image !== '' && this.product.price !== null &&
      this.product.qty !== null && this.product.info !== ''){
        // dispatch an action to create a product
        this.store.dispatch(productActions.createProduct({product : this.product}));
    }
    else{
      this.emptyFields = true;
    }
  }

}
