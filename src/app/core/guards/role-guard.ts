import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '../services/token';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const tokenService = inject(Token);
    const router       = inject(Router);
    const role         = tokenService.getRole();

    if (role && allowedRoles.includes(role)) {
      return true;
    }

    router.navigate(['/unauthorized']);
    return false;
  };
};