import { Component, OnInit } from '@angular/core';

import { LAYOUT_WIDTH, SIDEBAR_TYPE, TOPBAR } from '../layouts.model';
import { EventService } from '../../core/service/event.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [ClickOutsideModule, CommonModule, SimplebarAngularModule],

  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss'],
})

/**
 * Rightsidebar component
 */
export class RightsidebarComponent implements OnInit {
  isVisible: string;
  attribute: string;

  width: string;
  sidebartype: string;
  topbar: string;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.width = LAYOUT_WIDTH;
    this.sidebartype = SIDEBAR_TYPE;
    this.topbar = TOPBAR;

    /**
     * horizontal-vertical layput set
     */
    this.attribute = document.body.getAttribute('data-layout');
    const vertical = document.getElementById('is-layout');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (this.attribute == 'horizontal') {
      vertical.removeAttribute('checked');
    }
  }

  /**
   * Hide the sidebar
   */
  public hide() {
    document.body.classList.remove('right-bar-enabled');
  }

  /**
   * Change Topbar
   */
  changeTopbar(topbar: string) {
    this.topbar = topbar;
    this.eventService.broadcast('changeTopbar', topbar);
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout) {
    if (layout.target.checked == true)
      this.eventService.broadcast('changeLayout', 'vertical');
    else this.eventService.broadcast('changeLayout', 'horizontal');
  }

  changeWidth(width: string) {
    this.width = width;
    this.eventService.broadcast('changeWidth', width);
  }

  changeSidebartype(sidebar: string) {
    this.sidebartype = sidebar;
    this.eventService.broadcast('changeSidebartype', sidebar);
  }
}
