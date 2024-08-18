import { Action, createReducer, on } from '@ngrx/store';
import * as AppSettingsActions from './app-settings.actions';
export const APP_SETTINGS_FEATURE_KEY = 'appSettings';

export interface AppSettingsState {
  isPreview: boolean;
  isDarkMode: boolean;
  currentLang: string;
  isSidebarOpen?: boolean;
}

const initialState: AppSettingsState = {
  isPreview: false,
  isDarkMode: false,
  currentLang: '',
  isSidebarOpen: true,
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
  })),
  on(AppSettingsActions.setSidebarOpened, (state, { open }) => ({
    ...state,
    isSidebarOpen: open,
  }))
);

export function appSettingsReducer(
  state: AppSettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
