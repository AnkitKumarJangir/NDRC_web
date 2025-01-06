import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { datePatchTypes } from './dummy';
import moment from 'moment';

@Component({
  selector: 'app-filter-box',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule],
  templateUrl: './filter-box.component.html',
  styleUrl: './filter-box.component.scss',
})
export class FilterBoxComponent implements OnInit {
  @Input('filterList') filterList = [];
  @ViewChild('DateRange', { read: TemplateRef }) DateRange: TemplateRef<any>;
  @ViewChild('SearchText', { read: TemplateRef }) SearchText: TemplateRef<any>;
  @Output() filterApplied = new EventEmitter<any>();
  heads: string[];
  start_date;
  end_date;
  search = '';
  datePiker = [...datePatchTypes];
  ngOnInit(): void {
    this.heads = this.filterList;
  }
  getHead(head: string) {
    return (this as any)[head];
  }
  dateRange(type) {
    const start = moment().clone().subtract(type.start, type.subtractType);
    const end = moment().clone().subtract(type.end, type.subtractType);
    this.start_date =
      type.subtractType == 'month'
        ? start.startOf('month').format('YYYY-MM-DD')
        : start.format('YYYY-MM-DD');
    this.end_date =
      type.subtractType == 'month'
        ? end.endOf('month').format('YYYY-MM-DD')
        : end.format('YYYY-MM-DD');
  }
  applyfilter() {
    const payload = {
      ...(this.search && {
        search: this.search.trim(),
      }),
      ...(this.start_date && {
        start_date: this.start_date,
      }),
      ...(this.end_date && {
        end_date: this.end_date,
      }),
    };
    this.filterApplied.emit(payload);
  }

  reset() {
    this.search = '';
    this.start_date = null;
    this.end_date = null;
    this.filterApplied.emit(null);
  }
}
