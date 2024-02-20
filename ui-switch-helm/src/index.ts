import { NgModule } from '@angular/core';

import { HlmSwitchThumbDirective } from './lib/hlm-switch-thumb.directive';
import { HlmSwitchDirective } from './lib/hlm-switch.directive';

export * from './lib/hlm-switch-thumb.directive';
export * from './lib/hlm-switch.directive';

@NgModule({
  imports: [HlmSwitchDirective, HlmSwitchThumbDirective],
  exports: [HlmSwitchDirective, HlmSwitchThumbDirective],
})
export class HlmSwitchModule {}
