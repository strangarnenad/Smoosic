// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoGlobalLayout } from '../../smo/data/scoreModifiers';
import { SuiDialogParams, InstallDialog } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import  scoreLayoutApp from '../components/dialogs/scoreLayout.vue';

declare var $: any;
export const SuiGlobalLayoutDialogVue = (parameters: SuiDialogParams) => {
  const rootId = replaceVueRoot(modalContainerId);
  const initialValue = parameters.view.score.layoutManager!.globalLayout;
  const backup = JSON.parse(JSON.stringify(initialValue));
  let changed = false;
  const changeCb = async (newValue: SmoGlobalLayout) => {
    await parameters.view.setGlobalLayout(newValue);
    changed = true;
  }
  const cancelCb = async () => {
    if (changed) {
      await parameters.view.setGlobalLayout(backup);
    }
  }
  const commitCb = async () => {};
  const appParams = {
    domId: rootId,
    label: 'Score Layout',
    initialValue: parameters.view.score.layoutManager!.globalLayout,
    changeCb,
    commitCb,
    cancelCb
  };
  InstallDialog({ root: rootId, app: scoreLayoutApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
