import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { datePatchTypes } from './dummy';
import moment from 'moment';
import { CustomerService } from '../../services/customer.service';
import { takeWhile } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-filter-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SimplebarAngularModule,
    NgbDropdownModule,
  ],
  templateUrl: './filter-box.component.html',
  styleUrl: './filter-box.component.scss',
})
export class FilterBoxComponent implements OnInit, OnDestroy {
  @Input('filterList') filterList = [];
  @ViewChild('DateRange', { read: TemplateRef }) DateRange: TemplateRef<any>;
  @ViewChild('SearchText', { read: TemplateRef }) SearchText: TemplateRef<any>;
  @ViewChild('Customer', { read: TemplateRef }) Customer: TemplateRef<any>;
  @Output() filterApplied = new EventEmitter<any>();
  heads: string[];
  islive = true;
  start_date;
  end_date;
  search = '';
  datePiker = [...datePatchTypes];
  customerList: any[];
  constructor(
    private _customer: CustomerService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.heads = this.filterList;
    this.laodList();
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
    console.log(this.customerList.find((d) => d.checked));

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
      ...(this.customerList.find((d) => d.checked) && {
        customer: this.customerList.find((d) => d.checked)._id,
      }),
    };
    this.filterApplied.emit(payload);
  }
  laodList(filter = null) {
    this.heads.includes('Customer') &&
      this._customer
        .getCustomers(filter)
        .pipe(takeWhile(() => this.islive))
        .subscribe({
          next: (value: any) => {
            this.customerList = value;
          },
          error: (err) => {
            this._toastr.error(err);
          },
        });
  }
  selectId(...args) {
    const [list, index] = args;
    list.map((d, i) => i != index && (d.checked = false));
    list[index].checked = !list[index].checked;
  }
  reset() {
    this.search = '';
    this.start_date = null;
    this.end_date = null;
    this.customerList.map((d) => (d.checked = false));
    this.filterApplied.emit(null);
  }
  stringifyData(list) {
    return JSON.stringify(list);
  }
  parseData(list) {
    return JSON.parse(list);
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
