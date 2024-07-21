import { Action, createReducer, on } from '@ngrx/store';
import * as AppSettingsActions from './app-settings.actions';
export const APP_SETTINGS_FEATURE_KEY = 'appSettings';

export interface AppSettingsState {
  isPreview: boolean;
  isDarkMode: boolean;
}

const initialState: AppSettingsState = {
  isPreview: false,
  isDarkMode: false,
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
  }))
);

export function appSettingsReducer(
  state: AppSettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
