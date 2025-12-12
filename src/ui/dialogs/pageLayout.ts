// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoPageLayout } from '../../smo/data/scoreModifiers';
import { SuiDialogParams, InstallDialog } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import { watch, reactive, ref } from 'vue';
import pageLayoutApp from '../components/dialogs/pageLayout.vue';

declare var $: any;
type applyToType = 'all' | 'remaining' | 'page';
export const SuiPageLayoutDialogVue = (parameters: SuiDialogParams) => {
  const rootId = replaceVueRoot(modalContainerId);
  const layoutManager = parameters.view.score.layoutManager!;
  const currentPage = parameters.view.getFocusedPage();
  const applyTo = ref<applyToType>('all');
  const backup: SmoPageLayout[] = [];
  for (let i = 0; i < layoutManager.pageLayouts.length; ++i) {
    backup.push(new SmoPageLayout(layoutManager.pageLayouts[i]));
  }
  const layouts = layoutManager.getPageLayouts();
  const currentLayout = reactive(new SmoPageLayout(layoutManager.pageLayouts[currentPage]));
  const getValues = () => {
    return { currentLayout, applyTo };
  }

  let changed = false;
  const updateLayouts = async (newValue: SmoPageLayout) => {
    let i = 0;
    let startPage = currentPage;
    let endPage = layouts.length;
    if (applyTo.value === 'page') {
      endPage = startPage;
    } else if (applyTo.value === 'all') {
      startPage = 0;
    }
    await parameters.view.setPageLayouts(newValue, startPage, endPage);
    changed = true;
  }
  watch(currentLayout, (newValue) => {
    updateLayouts(newValue);
  });
  watch(applyTo, async (newValue, oldValue) => {
    // Reapply current layout to new range
    await updateLayouts(currentLayout);
  });
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
    getValues
  };
  InstallDialog({ root: rootId, app: pageLayoutApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
