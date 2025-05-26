import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import { Category } from '../../types/category';
import { Brand } from '../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent,MatSelectModule,FormsModule,MatButtonModule,CommonModule,],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  customerService=inject(CustomerService);
  route = inject(ActivatedRoute);
  searchTerm:string='';
  categoryId:string='';
  sortBy:string='';
  sortOrder:number=-1;
  brandId:string='';
  page=1;
  pageSize=6;
  products:Product[]=[];
  category:Category[]=[];
  brands:Brand[]=[];
  ngOnInit() {

    this.customerService.getCategories().subscribe(result=>{
      this.category=result;
    })
    this.customerService.getBrands().subscribe(result=>{
      this.brands=result;
    })
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.categoryId = params['categoryId'] || '';
      this.loadProducts();
    });
  }
  loadProducts(){
    console.log('******Category selected:', this.categoryId);
      console.log('***Brand selected:', this.brandId);
    setTimeout(()=>{
      console.log('******Category selected:', this.categoryId);
      console.log('*****Brand selected:', this.brandId);
      this.customerService.getProducts(
      this.searchTerm,
      this.categoryId,
      this.sortBy,
      this.sortOrder,
      this.brandId,
      this.page,
      this.pageSize
    ).subscribe(result=>{
      this.products = result;
      if(result.length<this.pageSize){
        this.isNext=false;
      }
      console.log('Produits récupérés :', this.products);
    });
    },500)
  }

  orderChange(event: any) {
    this.sortBy='price',
    this.sortOrder=event;
    this.loadProducts();
  }
  onBrandChange(newBrandId: string) {
    this.brandId = newBrandId;
    this.page = 1;
    this.loadProducts();
  }
  
  isNext=true;
  pageChange(page:number){
    this.page=page;
    this.isNext=true;
    this.loadProducts();
  }
}
