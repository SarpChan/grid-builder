import { Action, createReducer, on } from '@ngrx/store';
import * as AppSettingsActions from './app-settings.actions';
export const APP_SETTINGS_FEATURE_KEY = 'appSettings';

export interface AppSettingsState {
  isPreview: boolean;
  isDarkMode: boolean;
  currentLang: string;
}

const initialState: AppSettingsState = {
  isPreview: false,
  isDarkMode: false,
  currentLang: '',
};

const reducer = createReducer(
  initialState,
  on(AppSettingsActions.togglePreview, (state) => ({
    ...state,
    isPreview: !state.isPreview,
  })),
  on(AppSettingsActions.setDarkMode, (state, { enable: isDarkMode }) => ({
    ...state,
    isDarkMode,
  })),
  on(AppSettingsActions.setCurrentLanguage, (state, { lang }) => ({
    ...state,
    currentLang: lang,
  }))
);

export function appSettingsReducer(
  state: AppSettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
