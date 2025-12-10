// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoScorePreferences } from '../../smo/data/scoreModifiers';
import { SuiDialogParams, InstallDialog } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import scorePreferencesApp from '../components/dialogs/scorePreferences.vue';

declare var $: any;

export const SuiScorePreferencesDialogVue = (parameters: SuiDialogParams) => {
  const preferences = new SmoScorePreferences(parameters.view.score.preferences);
  const backup = new SmoScorePreferences(preferences);
  const doubleDurationCb = async (newValue: string) => {
    preferences.defaultDupleDuration = parseInt(newValue);
    await parameters.view.updateScorePreferences(preferences);
  }
  const tripleDurationCb = async (newValue: string) => {
    preferences.defaultTripleDuration = parseInt(newValue);
    await parameters.view.updateScorePreferences(preferences);
  }
  const autoAdvanceCb = async (newValue: boolean) => {
    preferences.autoAdvance = newValue;
    await parameters.view.updateScorePreferences(preferences);
  }
  const autoPlayCb = async (newValue: boolean) => {
    preferences.autoPlay = newValue;
    await parameters.view.updateScorePreferences(preferences);
  }
  const showPianoCb = async (newValue: boolean) => {
    preferences.showPiano = newValue;
    await parameters.view.updateScorePreferences(preferences);
  }
  const autoScrollPlaybackCb = async (newValue: boolean) => {
    preferences.autoScrollPlayback = newValue;
    await parameters.view.updateScorePreferences(preferences);
  }
  const hideEmptyLinesCb = async (newValue: boolean) => {
    preferences.hideEmptyLines = newValue;
    await parameters.view.updateScorePreferences(preferences);
  }
  const partNamesCb = async (newValue: boolean) => {
    preferences.showPartNames = newValue;
    await parameters.view.updateScorePreferences(preferences);
  }
  const transposeScoreCb = async (newValue: boolean) => {
    preferences.transposingScore = newValue;
    await parameters.view.updateScorePreferences(preferences);
  }
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = {
    initialValue: preferences,
    domId: rootId,
    doubleDurationCb,
    tripleDurationCb,
    autoAdvanceCb,
    autoPlayCb,
    showPianoCb,
    autoScrollPlaybackCb,
    hideEmptyLinesCb,
    partNamesCb,
    transposeScoreCb
  };

  const cancelCb = async () => {
    const p1 = JSON.stringify(preferences);
    const p2 = JSON.stringify(backup);
    if (p1 !== p2) {
      await parameters.view.updateScorePreferences(backup);
    }
  }
  const commitCb = async () => {
    if (backup.transposingScore !== preferences.transposingScore ||
      backup.hideEmptyLines !== preferences.hideEmptyLines) {
      await parameters.view.refreshViewport();
    }
  }
  InstallDialog({ root: rootId, app: scorePreferencesApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
