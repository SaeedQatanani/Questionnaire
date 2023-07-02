import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from '../services/loggedin.guard';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent, canActivate: [LoggedInGuard] },
    ]),
  ],
})
export class AuthModule {}
