import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule,RouterOutlet],
})
export class AdminModule {}
