import { computed, Directive, Input, signal } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core';
import { cva, VariantProps } from 'class-variance-authority';
import { ClassValue } from 'clsx';

export const buttonVariants = cva(
  ' inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-accent dark:text-white dark:disabled:text-gray-600 text-primary-foreground hover:bg-accent/95',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-gray-800/10 dark:border-slate-600 dark:hover:border-slate-400 text-primary hover:border-gray-800/30 hover:text-accent-foreground',
        secondary:
          'bg-zinc-200 text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'transition-colors dark:bg-slate-900 dark:hover:bg-slate-900 bg-gray-100 hover:bg-gray-100',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-8 py-2 px-3',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: '[hlmBtn]',
  standalone: true,
  host: {
    '[class]': '_computedClass()',
  },
})
export class HlmButtonDirective {
  private readonly _userCls = signal<ClassValue>('');
  @Input()
  set class(userCls: ClassValue) {
    this._userCls.set(userCls);
  }

  private readonly _variant = signal<ButtonVariants['variant']>('default');
  @Input()
  set variant(variant: ButtonVariants['variant']) {
    this._variant.set(variant);
  }

  private readonly _size = signal<ButtonVariants['size']>('default');
  @Input()
  set size(size: ButtonVariants['size']) {
    this._size.set(size);
  }

  protected _computedClass = computed(() => this._generateClass());
  private _generateClass() {
    return hlm(
      buttonVariants({ variant: this._variant(), size: this._size() }),
      this._userCls()
    );
  }
}
