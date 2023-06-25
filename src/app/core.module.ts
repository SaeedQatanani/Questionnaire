import { NgModule } from "@angular/core";
import { AuthIntercepterService } from "./services/auth-intercepter.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthIntercepterService,
            multi: true,
        }
    ]
})
export class CoreModule {

}