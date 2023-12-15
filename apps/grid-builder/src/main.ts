import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  provideFluentDesignSystem,
  fluentCard,
  fluentButton,
  fluentTextField,
  fluentAccordion,
  fluentAccordionItem,
  fluentAnchor,
  fluentNumberField,
  fluentSelect,
  fluentOption,
  fluentDivider,
} from '@fluentui/web-components';

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
  fluentDivider()
);
