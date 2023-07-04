import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from '../services/loggedin.guard';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    FormsModule,
    TranslateModule ,
    RouterModule.forChild([
      { path: '', component: AuthComponent, canActivate: [LoggedInGuard] },
    ]),
  ],
})
export class AuthModule {}
