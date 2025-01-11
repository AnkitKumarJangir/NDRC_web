import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  isLive: boolean = true;
  currentUser = null;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private _helper: HelperService,
    private _cookiesService: CookieService
  ) {
    this.currentUser = this._helper.getCurrentUser();
  }
  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnDestroy(): void {
    this.isLive = false;
  }

  ngOnInit() {
    this.mobileMenuButtonClicked.emit();
  }

  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  logout() {
    this._cookiesService.delete('ndrc_token');
    this._cookiesService.delete('ndrc_user');
    this.router.navigate(['/account/auth/login']);
  }
}
