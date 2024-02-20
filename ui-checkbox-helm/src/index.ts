import { NgModule } from '@angular/core';

import { HlmCheckboxCheckIconComponent } from './lib/hlm-checkbox-checkicon.component';
import { HlmCheckboxDirective } from './lib/hlm-checkbox.directive';
import { HlmCheckboxComponent } from './lib/hlm-checkbox.component';
import { BrnCheckboxComponent } from './lib/brn-checkbox.component';

export * from './lib/hlm-checkbox-checkicon.component';
export * from './lib/hlm-checkbox.directive';
export * from './lib/hlm-checkbox.component';
export * from './lib/brn-checkbox.component';

@NgModule({
  imports: [
    HlmCheckboxDirective,
    HlmCheckboxCheckIconComponent,
    HlmCheckboxComponent,
    BrnCheckboxComponent,
  ],
  exports: [
    HlmCheckboxDirective,
    HlmCheckboxCheckIconComponent,
    HlmCheckboxComponent,
    BrnCheckboxComponent,
  ],
})
export class HlmCheckboxModule {}
