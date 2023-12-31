import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList:any=[];
  public productList=new BehaviorSubject<any>([])
  search: any;
  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }
  setProducts(product:any){
      this.cartItemList.push(...product);
      this.productList.next(product);
    }

    addTocart(product:any){ 
      this.cartItemList.push(product); 
      this.productList.next(this.cartItemList); 
      this.getTotalPrice(); 
      console.log(this.cartItemList);
      
    } 
    getTotalPrice() : number{
      let grandTotal = 0;
      this.cartItemList.map((a:any)=>{
        grandTotal += a.total;
      })
      return grandTotal;
    }

    removeCart(product:any){
      this.cartItemList.map((a:any,index:any)=>{
        if(product.id===a.id){
          this.cartItemList.splice(index,1)
        }
      })
      this.productList.next(this.cartItemList);
    }
      removeAllCart(){
        this.cartItemList=[];
        this.productList.next(this.cartItemList);
      }
}
