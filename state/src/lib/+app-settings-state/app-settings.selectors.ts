import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APP_SETTINGS_FEATURE_KEY,
  AppSettingsState,
} from './app-settings.reducer';

export const selectAppSettingsState = createFeatureSelector<AppSettingsState>(
  APP_SETTINGS_FEATURE_KEY
);

export const selectIsPreview = createSelector(
  selectAppSettingsState,
  (state: AppSettingsState) => state.isPreview
);
