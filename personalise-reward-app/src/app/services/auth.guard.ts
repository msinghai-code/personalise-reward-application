import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('currentUser');
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};