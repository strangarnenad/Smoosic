// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoScore } from '../../smo/data/score';
import { SmoPartInfo } from '../../smo/data/partInfo';
import { SmoSelection, SmoSelector } from '../../smo/xform/selections';

import { SuiDialogParams, InstallDialog } from './dialog';
import partInfoApp from '../../ui/components/dialogs/partInfo.vue';
import { replaceVueRoot, modalContainerId } from '../common';

declare var $: any;
export const SuiPartInfoDialogVue = async (parameters: SuiDialogParams) => {
  const selector = SmoSelector.default;
  const selection = SmoSelection.measureSelection(parameters.view.score, selector.staff, selector.measure)!;
  const backup = new SmoPartInfo(selection.staff.partInfo);
  let current = backup;
  let changed = false;
  const updatePartInfoCb = async (partInfo: SmoPartInfo) => {
    changed = true;
    // Since update will change the displayed score, wait for any display change to complete first.
    await parameters.view.renderer.updatePromise();
    
    await parameters.view.updatePartInfo(partInfo);
    // If we are expanding rests, we need to reload the part after setting the 
    // part change.  So we update the part display a second time with the new value.
    if (current.expandMultimeasureRests !== partInfo.expandMultimeasureRests ||
      current.stavesAfter !== partInfo.stavesAfter) {
      parameters.view.resetPartView();
      await parameters.view.refreshViewport();
    }
    current = new SmoPartInfo(partInfo);
  }

  const commitCb = async () => {
  }
  const cancelCb = async () => {
    if (changed) {
      await parameters.view.renderer.updatePromise();
      if (current.expandMultimeasureRests !== backup.expandMultimeasureRests) {
        parameters.view.resetPartView();
      }
      await parameters.view.updatePartInfo(backup);
    }
  }
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = {
    domId: rootId,
    partInfo: current,
    label: 'Part Properties',
    updatePartInfoCb
  };
  InstallDialog({
    app: partInfoApp,
    appParams,
    root: rootId,
    dialogParams: parameters,
    commitCb, 
    cancelCb
  });
}
