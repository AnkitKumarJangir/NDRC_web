import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { takeWhile } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {
  @Input('next') next = null;
  @Input('previous') previous = null;
  @Output() loading = new EventEmitter<boolean>();
  @Output() paginatedData = new EventEmitter<any>();
  lastLink = null;
  islive = true;
  constructor(
    private _helperService: HelperService,
    private _toastr: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('next' in changes || 'previous' in changes) {
      this.next = changes['next'].currentValue;
      this.previous = changes['previous'].currentValue;
      this.lastLink = null;
    }
  }

  ngOnInit(): void {}

  loadList() {
    if (this.lastLink != null) {
      this.loading.emit(true);
      this._helperService
        .pagination(this.lastLink)
        .pipe(takeWhile(() => this.islive))
        .subscribe({
          next: (value) => {
            this.paginatedData.emit(value);
            this.loading.emit(false);
          },
          error: (err) => {
            this._toastr.error(err);
            this.loading.emit(false);
          },
        });
    }
  }

  nextPage() {
    if (this.next) {
      this.lastLink = this.next;
      this.loadList();
    }
  }
  previousPage() {
    if (this.previous) {
      this.lastLink = this.previous;
      this.loadList();
    }
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
