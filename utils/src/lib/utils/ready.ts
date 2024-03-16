import { AfterViewInit, Directive, signal } from '@angular/core';
@Directive()
export abstract class Ready implements AfterViewInit {
  ready = signal(false);

  ngAfterViewInit() {
    this.ready.set(true);
  }
}
