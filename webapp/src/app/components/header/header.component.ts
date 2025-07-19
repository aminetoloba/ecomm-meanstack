import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,NgForOf,NgIf,FormsModule,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  customerService=inject(CustomerService);
  categoryService = inject(CategoryService);
  categoryList:Category[]=[];
  authService=inject(AuthService);
  searchTerm!:string;
  activeIcon: string = '';
  selectedCategoryId: string | null = null;
  ngOnInit(): void{
    console.log("Header ngOnInit lancé");
  this.categoryService.getCategories().subscribe(result => {
    console.log("Catégories reçues :", result); // 👈 Affiche le résultat ici
    this.categoryList = result;
  });
  }
  router=inject(Router);
  onSearch(e:any){
    if(e.target.value){
      this.router.navigateByUrl("/products?search="+e.target.value)
    }
  }
  searchCategory(id:string){
    this.selectedCategoryId = id;
    this.searchTerm="";
    this.router.navigateByUrl("/products?categoryId="+id!)
  }
  login() {
    this.router.navigateByUrl('/login');
  }  
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  register() {
    this.router.navigateByUrl('/register');
  }
  setActiveIcon(iconName: string): void {
  this.activeIcon = iconName;
}
clickedInside = false;
handleInternalClick(event: MouseEvent) {
  this.clickedInside = true;
}

handleDocumentClick(event: MouseEvent) {
  if (!this.clickedInside) {
    this.selectedCategoryId = null;
  }
  this.clickedInside = false;
}
}
