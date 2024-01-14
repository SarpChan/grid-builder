import { bootstrapApplication } from '@angular/platform-browser';
import {
  fluentAccordion,
  fluentAccordionItem,
  fluentAnchor,
  fluentButton,
  fluentCard,
  fluentCheckbox,
  fluentDivider,
  fluentNumberField,
  fluentOption,
  fluentRadio,
  fluentRadioGroup,
  fluentSelect,
  fluentTab,
  fluentTabPanel,
  fluentTabs,
  fluentTextField,
  fluentTooltip,
  provideFluentDesignSystem,
} from '@fluentui/web-components';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

provideFluentDesignSystem().register(
  fluentCard(),
  fluentButton(),
  fluentTextField(),
  fluentAccordion(),
  fluentAccordionItem(),
  fluentAnchor(),
  fluentNumberField(),
  fluentSelect(),
  fluentOption(),
  fluentDivider(),
  fluentTab(),
  fluentTabs(),
  fluentTabPanel(),
  fluentCheckbox(),
  fluentRadioGroup(),
  fluentRadio(),
  fluentTooltip()
);
