import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  date: Date = new Date();
  locale: string = 'en-US';

  constructor(private translateService: TranslateService) {}

  switchLocale() {
    this.locale = this.locale === 'en-US' ? 'ar-SA' : 'en-US';
    this.translateService.use(this.locale);
  }

}
