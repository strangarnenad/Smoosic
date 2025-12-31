// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { ViewMapEntry } from '../../render/sui/scoreView';
import { SuiDialogParams, InstallDialog } from './dialog';
import { reactive, watch, ref } from 'vue';
import { replaceVueRoot, modalContainerId } from '../common';
import viewStavesApp from '../components/dialogs/viewStaves.vue';

export const SuiScoreViewDialogVue = (parameters: SuiDialogParams) => {
  const currentView: ViewMapEntry[] = reactive(parameters.view.getView());
  const score = parameters.view.storeScore;
  let changed = false;
  const getViewMap = () => currentView

  watch(currentView, async () => {
    changed = true;
  });
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = {
    domId: rootId,
    getViewMap,
    label: 'View Staves',
    score
  };

  const cancelCb = async () => {
  }
  const commitCb = async () => {
    if (changed) {
      parameters.view.setView(currentView);
      await parameters.view.refreshViewport();
    }
  }
  InstallDialog({ root: rootId, app: viewStavesApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
