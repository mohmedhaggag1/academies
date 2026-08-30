import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
