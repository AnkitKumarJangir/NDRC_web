import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EntriesService } from '../../services/entries.service';
import moment from 'moment';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeWhile } from 'rxjs';
import { LoadingSlipsService } from '../../services/loading-slips.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-create-entries',
  standalone: true,
  imports: [CommonModule,NgSelectModule, ReactiveFormsModule],
  templateUrl: './create-entries.component.html',
  styleUrl: './create-entries.component.scss'
})
export class CreateEntriesComponent implements OnInit, OnDestroy {
  @Input('loadingId') loadingId = null;
  @Input('entry') entry = null;
  @Input('action') action = 'new';
  loading = false;
  islive = true;
  entriesForm!: FormGroup;
  loadingSlips = [];
  $searchSlip = new Subject<String>()
  constructor(
    public _activateModel: NgbActiveModal,
    private _toastr: ToastrService,
    private fb: FormBuilder,
    private _entries: EntriesService,
    private _loading:LoadingSlipsService
  ) {}

  ngOnInit(): void {
    this.entriesForm = this.fb.group({
      date: [moment().format('YYYY-MM-DD'), Validators.required],
      loading_id: [this.loadingId ?? null,Validators.required],
      bill_amount: [null],
      amount_recd: [null],
      commission: [null],
      sheet_no:[null],
      remarks: [null],
    });
    if(this.entry){
      this.entriesForm.patchValue({...this.entry,loading_id:this.entry?.loading_id?._id})
    }
    this.$searchSlip.pipe(takeWhile(()=>this.islive),debounceTime(300),distinctUntilChanged(),switchMap((search)=>this._loading.getLoadingSlips({search:search}))).subscribe((data:any)=>{
      if(data){
        this.loadingSlips = data.results
      }
    },(err)=>{
      this._toastr.error(err)
    })
  }

  saveRating() {
    if (this.entriesForm.valid) {
      this.loading = true;
      const data = {
        ...this.entriesForm.value,
      };
      if (this.action == 'new') {
        
        this._entries.createEntries(data).subscribe(
          (res: any) => {
            if (res) {
              this._toastr.success(res.message);
              this.loading = false;
              this.closePop({ reload: true });
            }
          },
          (err) => {
            this.loading = false;            
            this._toastr.error(err);
          }
        );
      } else {
        this._entries.updateEntries(data, this.entry?._id).subscribe(
          (res: any) => {
            if (res) {
              this.loading = false;
              this._toastr.success(res.message);
              this.closePop({ reload: true });
            }
          },
          (err) => {
            this.loading = false;
            this._toastr.error(err);
          }
        );
      }
    } else {
      this._toastr.error('fields with * are required');
      this.entriesForm.markAllAsTouched();
    }
  }

  closePop(filter = null) {
    this._activateModel.close(filter);
  }
  ngOnDestroy(): void {
    this.islive = false;
  }
}
