import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  constructor(private session: SessionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
        const roles: string[] = this.session.getUser().roles;
        return roles.every(role => role === 'USER') ? true : this.router.createUrlTree(['/about']);
  }
}
