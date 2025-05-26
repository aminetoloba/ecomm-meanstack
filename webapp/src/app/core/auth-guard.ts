import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si l'utilisateur est déconnecté, déconnectez-le manuellement et redirigez-le vers login
  if (!authService.isLoggedIn) {
    authService.logout(); // On s'assure de la déconnexion
    router.navigateByUrl('/login'); // Redirection vers la page de login
    return false;
  }

  // Si l'utilisateur est connecté, il peut accéder à la page
  return true;
};
