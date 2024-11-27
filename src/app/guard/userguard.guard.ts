import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const userguardGuard: CanActivateFn = (route, state) => {
  let user = JSON.parse(localStorage.getItem('currentUser')!);
  let router = inject(Router);
  if(!user){
    router.navigate(['/']);
  }
  return true;
};
