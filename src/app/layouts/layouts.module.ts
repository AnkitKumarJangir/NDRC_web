import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';

import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';
import { LanguageService } from '../core/service/language.service';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    // LayoutComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    RightsidebarComponent,
    HorizontalComponent,
    VerticalComponent,
    HorizontaltopbarComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ClickOutsideModule,
    RouterModule,
    NgbDropdownModule,
    SimplebarAngularModule,
  ],
  providers: [LanguageService],
})
export class LayoutsModule {}
