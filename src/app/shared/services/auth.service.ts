import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { User } from '../../sessions/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated = false;
  activeUser: User;
  constructor(private store: LocalStoreService, private router: Router) {
  }

  checkAuth(role) {
      this.authenticated = this.store.getItem('codesell-token', 'session');
      if (this.getUser()) {
        return this.authenticated && this.activeUser.user_role === role;
      }
      return false;
  }

  getUser() {
    this.activeUser = this.store.getItem('codesell-user', 'session');
    return this.activeUser;
  }

  getRole() {
    return this.activeUser.user_role;
  }

  setToken(token) {
    this.authenticated = true;
    this.store.setItem('codesell-token', token, 'session');
  }

  signout() {
    this.authenticated = false;
    this.store.clear('session');
    this.router.navigateByUrl('/sessions/signin');
  }
}
