import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  input,
  numberAttribute,
} from '@angular/core';
import { NgxSonnerToaster, type ToasterProps } from 'ngx-sonner';

@Component({
  selector: 'grid-builder-sonner',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      class="toaster group"
      [invert]="invert()"
      [theme]="theme()"
      [position]="position()"
      [hotKey]="hotKey()"
      [richColors]="richColors()"
      [expand]="expand()"
      [duration]="duration()"
      [visibleToasts]="visibleToasts()"
      [closeButton]="closeButton()"
      [toastOptions]="toastOptions()"
      [offset]="offset()"
      [dir]="dir()"
      [class]="_class()"
      [style]="_style()"
    ></ngx-sonner-toaster>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SonnerComponent {
  invert = input<ToasterProps['invert'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  theme = input<ToasterProps['theme']>('light');
  position = input<ToasterProps['position']>('bottom-right');
  hotKey = input<ToasterProps['hotkey']>(['altKey', 'KeyT']);
  richColors = input<ToasterProps['richColors'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  expand = input<ToasterProps['expand'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  duration = input<ToasterProps['duration'], number | string>(4000, {
    transform: numberAttribute,
  });
  visibleToasts = input<ToasterProps['visibleToasts'], number | string>(3, {
    transform: numberAttribute,
  });
  closeButton = input<ToasterProps['closeButton'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  toastOptions = input<ToasterProps['toastOptions']>({
    classes: {
      toast:
        'group toast dark:group-[.toaster]:bg-neutral-800 group-[.toaster]:bg-background dark:group-[.toaster]:text-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
      description:
        'dark:group-[.toast]:text-slate-200 group-[.toast]:text-muted-foreground',
      actionButton:
        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
      cancelButton:
        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    },
  });
  offset = input<ToasterProps['offset']>(null);
  dir = input<ToasterProps['dir']>('auto');
  _class = input('', { alias: 'class' });
  _style = input<Record<string, string>>({}, { alias: 'style' });
}
