// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoPageLayout, SmoLayoutManager } from '../../smo/data/scoreModifiers';

import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';

import { DialogDefinitionOption } from './components/baseComponent';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogBase, SuiDialogParams, InstallDialog } from './dialog';
import { PromiseHelpers } from '../../common/promiseHelpers';
import { SelectOption, replaceVueRoot, modalContainerId } from '../common';
import pageLayoutApp from '../components/dialogs/pageLayout.vue';

declare var $: any;
type applyToType = 'all' | 'remaining' | 'page';
export const SuiPageLayoutDialogVue = (parameters: SuiDialogParams) => {
  const rootId = replaceVueRoot(modalContainerId);
  const layoutManager = parameters.view.score.layoutManager!;
  const currentPage = parameters.view.getFocusedPage();
  let applyTo: applyToType = 'all';
  const backup: SmoPageLayout[] = [];
  for (let i = 0; i < layoutManager.pageLayouts.length; ++i) {
    backup.push(new SmoPageLayout(layoutManager.pageLayouts[i]));
  }
  const layouts = layoutManager.getPageLayouts();
  const currentLayout = layoutManager.pageLayouts[currentPage];
  if (layoutManager.pageLayouts.length === 1) {
    applyTo = 'all';
  } else {
    if (currentPage >= 1) {
      applyTo = 'remaining';
    } else {
      applyTo = 'all';
    }
  }  
  const initialValues = parameters.view.score.layoutManager!.getPageLayouts();
  let changed = false;
  const updateLayouts = async (newValue: SmoPageLayout) => {
    let i = 0;
    let startPage = currentPage;
    let endPage = layouts.length;
    if (applyTo === 'page') {
      endPage = startPage;
    } else if (applyTo === 'all') {
      startPage = 0;
    }
    await parameters.view.setPageLayouts(newValue, startPage, endPage);
    changed = true;
  }
  const changeCb = async (newValue: SmoPageLayout, applyTop: string) => {
    applyTo = applyTop as applyToType;
    await updateLayouts(newValue);
    changed = true;
  }
  const cancelCb = async () => {
    if (changed) {
      for (let i = 0; i < backup.length; ++i) {
        // Avoid multiple page rerender...
        await parameters.view.setPageLayout(backup[i], i);
      }
    }
  }
  const commitCb = async () => {};
  const appParams = {
    domId: rootId,
    label: 'Score Layout',
    initialValue: currentLayout,
    changeCb,
  };
  InstallDialog({ root: rootId, app: pageLayoutApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
