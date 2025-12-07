import { InstallDialog, SuiDialogParams } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import durationApp from '../components/dialogs/durations.vue';

export const SuiDurationNoteVue = (parameters: SuiDialogParams) =>{
    const increaseDurationCb = async () => {
      await parameters.view.batchDurationOperation('doubleDuration');
    }
    const decreaseDurationCb = async () => {
      await parameters.view.batchDurationOperation('halveDuration');
    }
    const addDotCb = async () => {
      await parameters.view.batchDurationOperation('dotDuration');
    }
    const removeDotCb = async () => {
      await parameters.view.batchDurationOperation('undotDuration');
    }
    const commitCb = async () => {
    }
    const cancelCb = async () => {    
      await parameters.view.undo();
    }
    const rootId = replaceVueRoot(modalContainerId);
    const appParams = { increaseDurationCb, decreaseDurationCb, addDotCb, removeDotCb, domId: rootId };
  InstallDialog({
    root: rootId,
    app: durationApp,
    appParams,
    dialogParams: parameters,
    commitCb,
    cancelCb
  });

  }
