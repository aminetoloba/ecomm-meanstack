import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs/operators'; // Assurez-vous d'importer 'tap' pour l'observable

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  // Inscription de l'utilisateur
  register(name: string, email: string, password: string) {
    return this.http.post(environment.apiUrl + '/auth/register', {
      name,
      email,
      password,
    });
  }

  // Connexion de l'utilisateur
  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    }).pipe(
      tap((response) => {
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);  // Sauvegarde du token
          localStorage.setItem('user', JSON.stringify(response.user));  // Sauvegarde des données utilisateur
        }
      })
    );
  }

  // Déconnexion de l'utilisateur
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Vérifie si l'utilisateur est connecté
  get isLoggedIn(){
   let token = localStorage.getItem('token');
   if(token){
    return true;
   }
   return false;
  }
  get isAdmin(){
    let userData = localStorage.getItem('user');
    if(userData){
      return JSON.parse(userData).isAdmin;
    }
    return false;
  }
  // Récupère le nom de l'utilisateur
  get userName(): string | null {
    let userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData).name;  // Gestion des erreurs de parsing
      } catch (e) {
        console.error('Erreur lors du parsing des données utilisateur:', e);
        return null;
      }
    }
    return null;
  }
  get userEmail(): string | null {
    let userData = localStorage.getItem('user');
    if (userData) {
      try {
        return JSON.parse(userData).email;  // Gestion des erreurs de parsing
      } catch (e) {
        console.error('Erreur lors du parsing des données utilisateur:', e);
        return null;
      }
    }
    return null;
  }
  changePassword(newPassword: string) {
    const token = localStorage.getItem('token');
  
    return this.http.post(
      `${environment.apiUrl}/auth/change-password`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  
}
