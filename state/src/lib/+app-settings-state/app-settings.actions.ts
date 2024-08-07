import { createAction, props } from '@ngrx/store';

export const togglePreview = createAction('[AppSettings] Toggle Preview');
export const setDarkMode = createAction(
  '[AppSettings] Set Dark Mode',
  props<{ enable: boolean }>()
);
export const setCurrentLanguage = createAction(
  '[AppSettings] Set Current Language',
  props<{ lang: string }>()
);
