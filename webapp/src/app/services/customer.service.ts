import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment.development';
import { Category } from '../types/category';
import { Brand } from '../types/brand';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http=inject(HttpClient);
  constructor() { }

  getNewProducts(){
    return this.http.get<Product[]>(
      environment.apiUrl+'/customer/new-products'
    );
  }
  getFeaturedProducts(){
    return this.http.get<Product[]>(
      environment.apiUrl+'/customer/featured-products'
    );
  }
  getCategories(){
    return this.http.get<Category[]>(
      environment.apiUrl+'/customer/categories'
    );
  }
  getBrands(){
    return this.http.get<Brand[]>(
      environment.apiUrl+'/customer/brands'
    );
  }
  getProducts(
    searchTerm: string, 
    categoryId: string, 
    sortBy: string, 
    sortOrder: number, 
    brandId: string,
    page:number,
    pageSize:number
  ){
   /* const params = new URLSearchParams();

  if (searchTerm) params.append('searchTerm', searchTerm);
  if (categoryId) params.append('categoryId', categoryId);
  if (sortBy) params.append('sortBy', sortBy);
  if (sortOrder !== null) params.append('sortOrder', sortOrder.toString());

  if (brandId){ params.append('brandId', brandId)
    params.append('brandId', brandId);
  console.log('paramètre avec brand:', params.toString());
  };
  params.append('page', page.toString());
  params.append('pageSize', pageSize.toString());
    /*return this.http.get<Product[]>(
      `${environment.apiUrl}/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`
    ); */   
  /*  const url = `${environment.apiUrl}/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}&page=${page}&pageSize=${pageSize}`;
    return this.http.get<Product[]>(url);*/
    const params = new URLSearchParams();

if (searchTerm) params.append('searchTerm', searchTerm);
if (categoryId) params.append('categoryId', categoryId);
if (sortBy) params.append('sortBy', sortBy);
if (sortOrder !== null) params.append('sortOrder', sortOrder.toString());
if (brandId) {
  params.append('brandId', brandId);
  console.log('paramètre avec brand:', params.toString());
}

params.append('page', page.toString());
params.append('pageSize', pageSize.toString());

const url = `${environment.apiUrl}/customer/products?${params.toString()}`;
return this.http.get<Product[]>(url);

  }
  getProductById(id: string){
    return this.http.get<Product>(
      environment.apiUrl + '/customer/product/' + id
    );
  }

}

