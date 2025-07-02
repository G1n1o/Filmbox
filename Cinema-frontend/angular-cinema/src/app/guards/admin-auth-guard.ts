import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

export const adminAuthGuard: CanActivateFn = async () => {
  const oktaStateService = inject(OktaAuthStateService);
  const oktaAuth = inject(OKTA_AUTH) as OktaAuth;
  const router = inject(Router);

  const isAuthenticated = await oktaAuth.isAuthenticated();

  if (!isAuthenticated) {
    return router.parseUrl('/login');
  }

  const user = await oktaAuth.getUser();
  const groups = (user['groups'] as string[]) || [];

  if (groups.includes('Admin')) {
    return true;
  }


  return router.parseUrl('/movies'); 
};
