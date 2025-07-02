import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { OKTA_AUTH, OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from 'src/app/config/my-app-config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [OktaAuthModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth,  private router: Router) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/logos/filmbox.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,
      useClassicEngine: true,
      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'
    },
    (response: any) => {
      if (response.status === 'SUCCESS') {
        this.oktaAuth.tokenManager.setTokens(response.tokens);
        this.router.navigateByUrl('/');
      }
    },
    (error: any) => {
      throw error;
    });
  
  }

}
