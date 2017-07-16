import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterfinalPage } from './registerfinal';

@NgModule({
  declarations: [
    RegisterfinalPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterfinalPage),
  ],
  exports: [
    RegisterfinalPage
  ]
})
export class RegisterfinalPageModule {}
