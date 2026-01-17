// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoMeasureFormat } from '../../smo/data/measureModifiers';
import { SuiDialogParams, InstallDialog } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import measureFormatApp from '../../ui/components/dialogs/measureFormat.vue';

declare var $: any;

export const SuiMeasureFormatDialogVue = async (parameters: SuiDialogParams) => {
  const selection = parameters.view.tracker.selections[0];
  const measure = selection.measure;
  let measureCount = 0;
  if (parameters.view.score.isPartExposed()) {
    const partInfo = parameters.view.score.staves[0].partInfo;
    measureCount = partInfo.layoutManager.globalLayout.maxMeasureSystem;
  } else {
    measureCount = parameters.view.score.layoutManager?.globalLayout.maxMeasureSystem || 0;
  }
  const isPart = parameters.view.score.isPartExposed();
  const measureFormat = new SmoMeasureFormat(measure.format);
  let changed = false;
  const backup = new SmoMeasureFormat(measureFormat);

  // Default the measure index to the first selected measure
  let displayMeasure = measure.measureNumber.displayMeasure;
  const initialDisplayMeasure = measure.measureNumber.displayMeasure;
  const measureNumberCb = async (newIndex: number) => {
    // Renumber measures to reflect new index
    if (newIndex !== measure.measureNumber.displayMeasure) {
      changed = true;
      displayMeasure = newIndex;
    }
    await parameters.view.renumberMeasures(measure.measureNumber.measureIndex, newIndex);
  }
  const updateMeasureFormatCb = async (mf: SmoMeasureFormat) => {
    changed = true;
    const newValue = new SmoMeasureFormat(mf);
    // The default index value is 0, so restore to default if unchanged
    if (mf.measureIndex === measure.measureNumber.displayMeasure) {
      newValue.measureIndex = 0;
    }
    await parameters.view.setMeasureFormat(newValue);
  }
  const commitCb = async() => {
    if (changed) {
      parameters.view.resetPartView();
      await parameters.view.refreshViewport();
    }
  }
  const cancelCb = async() => {
    if (changed) {
      await parameters.view.setMeasureFormat(backup);
    }
  }
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = {
    domId: rootId,
    measureFormat,
    isPart,
    initialDisplayMeasure,
    measureNumberCb,
    commitCb,
    cancelCb,
    label: 'Measure Formatting',
    measureCount,
    updateMeasureFormatCb
  }
  InstallDialog({
    app: measureFormatApp,
    appParams,
    root: rootId,
    dialogParams: parameters,
    commitCb,
    cancelCb
  });

}
