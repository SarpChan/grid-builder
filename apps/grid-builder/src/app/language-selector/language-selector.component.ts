import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Option, toRepr } from '@grid-builder/utils';
import { ComboboxComponent } from 'components/src/lib/combobox/combobox.component';
import { toFlag } from './languages';
import { AppSettingsFacade } from '@grid-builder/state';

@Component({
  selector: 'grid-builder-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, ComboboxComponent],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
})
export class LanguageSelectorComponent implements OnInit {
  translateService = inject(TranslateService);
  appsSettingsFacade = inject(AppSettingsFacade);
  options = signal<Option[]>([]);
  currentLang = signal<Option | undefined>(undefined);

  constructor() {
    effect(
      () => {
        const selected = this.appsSettingsFacade.currentLang$();
        if (selected) {
          const option = toRepr(selected);
          option.label = `${toFlag(option.value)} / ${selected}`;
          this.currentLang.set(option);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    const langs = this.translateService.getLangs();

    const current = toRepr(this.translateService.currentLang ?? '');
    current.label = `${toFlag(current.value)} ${current.label}`;
    this.currentLang.set(current);

    this.options.set(
      langs.map((lang) => {
        const option = toRepr(lang);
        option.label = `${toFlag(option.value)} / ${lang}`;
        return option;
      })
    );
  }

  selectLang(option: Option) {
    if (option.value) {
      this.translateService.use(option.value);
      this.currentLang.set(option);
    }
  }
}
