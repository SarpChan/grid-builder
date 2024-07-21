import { Action, createReducer, on } from '@ngrx/store';
import * as AppSettingsActions from './app-settings.actions';
export const APP_SETTINGS_FEATURE_KEY = 'appSettings';

export interface AppSettingsState {
  isPreview: boolean;
}

const initialState: AppSettingsState = {
  isPreview: false,
};

const reducer = createReducer(
  initialState,
  on(AppSettingsActions.togglePreview, (state) => ({
    ...state,
    isPreview: !state.isPreview,
  }))
);

export function appSettingsReducer(
  state: AppSettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
