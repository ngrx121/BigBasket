import { Component, OnInit } from '@angular/core';
import {IProduct} from '../../models/IProduct';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {select, Store} from '@ngrx/store';
import {State} from '../../../reducers';
import * as productActions from '../../actions/product.actions';
import * as productReducer from '../../reducers/product.reducer';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public loading:boolean;
  public productId:string;
  public selectedProduct:IProduct = {
    _id : '',
    name : '',
    price : null,
    image : '',
    info : '',
    qty : null
  };
  public errorMessage:string;
  public emptyFields:boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private store:Store<State>) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      this.productId = param.get('id');
    });

    // dispatch an action to get a single product and keep in the store
    this.store.dispatch(productActions.getProduct({productId : this.productId}));

    // get the selected Product Information from NGRX Store and populate on the form
    this.store.pipe(select(productReducer.productFeatureKey)).subscribe((state) => {
      this.selectedProduct = state.selectedProduct;
      this.errorMessage = state.errorMessage;
      this.loading = state.loading;
    });

  }

  // updateInput
  public updateInput(event){
    this.selectedProduct = {
      ...this.selectedProduct,
      [event.target.name] : event.target.value
    };
  }

  // selectProductImage
  public selectProductImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      //this.imageFileName = file;
      reader.addEventListener('load', () => {
        if(reader.result){
          this.selectedProduct = {
            ...this.selectedProduct,
            image : String(reader.result)
          };
        }
        //reader.result ? this.selectedProduct.image = String(reader.result) : '';
      });
    }
  }

  // submitUpdateProduct
  public submitUpdateProduct(){
    if(this.selectedProduct.name !== '' && this.selectedProduct.image !== '' && this.selectedProduct.price !== null &&
      this.selectedProduct.qty !== null && this.selectedProduct.info !== ''){
       // dispatch an action to update the product
       this.store.dispatch(productActions.updateProduct({
         productId : this.selectedProduct._id ,
         product : this.selectedProduct
       }));
    }
    else{
      this.emptyFields = true;
    }
  }

}
