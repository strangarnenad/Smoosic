// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoScore } from '../../smo/data/score';
import { GlobalLayoutAttributes, SmoLayoutManager, SmoGlobalLayout } from '../../smo/data/scoreModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogBase, SuiDialogParams, InstallDialog } from './dialog';
import { reactive, watch, ref } from 'vue';
import { replaceVueRoot, modalContainerId } from '../common';
import scoreTransposeApp from '../components/dialogs/scoreTranspose.vue';

declare var $: any;

export const SuiTransposeScoreDialogVue = (parameters: SuiDialogParams) => {
  const offset = ref(0);
  let delta = 0;
  const getTranspose = () => offset

  watch(offset, async (newVal, oldVal) => {
    delta += offset.value;
    await parameters.view.transposeScore(offset.value);
    offset.value = 0;
  });
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = {
    domId: rootId,
    getTranspose,
    label: 'Transpose Score'
  };

  const cancelCb = async () => {
    if (delta !== 0) {
      await parameters.view.transposeScore(-delta);
    }
  }
  const commitCb = async () => {
  }
  InstallDialog({ root: rootId, app: scoreTransposeApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
