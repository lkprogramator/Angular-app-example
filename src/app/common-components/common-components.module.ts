import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap';
import { NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({

  declarations: [
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    NgbModule
  ],
  exports: [
    NgbModule, ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [
    NgbActiveModal, AlertModule
    ]
})
export class CommonComponentsModule { }
