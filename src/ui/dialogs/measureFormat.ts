// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoMeasure } from '../../smo/data/measure';
import { SmoMeasureFormat, SmoMeasureFormatNumberAttributes, SmoMeasueFormatBooleanAttributes } from '../../smo/data/measureModifiers';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams, InstallDialog } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { PromiseHelpers } from '../../common/promiseHelpers';
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

/**
 * @category SuiDialog
 */
export class SuiMeasureFormatAdapter extends SuiComponentAdapter {
  format: SmoMeasureFormat;
  backup: SmoMeasureFormat;
  measure: SmoMeasure;
  renumberIndex: number;
  originalIndex: number;
  measureCount: number;
  edited: boolean = false;
  constructor(view: SuiScoreViewOperations, measure: SmoMeasure) {
    super(view);
    this.format = measure.format;
    this.measureCount = 0;
    if (this.view.score.isPartExposed()) {
      const partInfo = this.view.score.staves[0].partInfo;
      this.measureCount = partInfo.layoutManager.globalLayout.maxMeasureSystem;
    } else {
      this.measureCount = this.view.score.layoutManager?.globalLayout.maxMeasureSystem || 0;
    }
    this.renumberIndex = this.originalIndex = measure.measureNumber.displayMeasure;
    this.backup = new SmoMeasureFormat(this.format);
    this.measure = measure;
  }
  writeNumber(param: SmoMeasureFormatNumberAttributes, value: number) {
    this.format.measureIndex = this.measure.measureNumber.measureIndex;
    this.format[param] = value;
    this.view.setMeasureFormat(this.format);
    this.edited = true;
  }
  writeBoolean(param: SmoMeasueFormatBooleanAttributes, value: boolean) {
    this.format.measureIndex = this.measure.measureNumber.measureIndex;
    this.format[param] = value;
    this.view.setMeasureFormat(this.format);
    this.edited = true;
  }
  async commit(){
    return PromiseHelpers.emptyPromise();
  }
  async cancel() {
    if (this.edited) {
      await this.view.setMeasureFormat(this.backup);
    }
    if (this.localIndex !== this.originalIndex) {
      await this.view.renumberMeasures(this.measure.measureNumber.measureIndex, this.originalIndex);
    }
  }
  get padLeft() {
    return this.format.padLeft;
  }
  set padLeft(value: number) {
    if (value >  0) {
      $('.attributeDialog .attributeModal').addClass('pad-left-select');
    } else {
      $('.attributeDialog .attributeModal').removeClass('pad-left-select');
    }
    this.writeNumber('padLeft', value);
  }
  get skipMeasureCount() {
    return this.format.skipMeasureCount;
  }
  set skipMeasureCount(value: boolean) {
    this.writeBoolean('skipMeasureCount', value);
  }
  get localIndex(): number {
    return this.renumberIndex;
  }
  set localIndex(value: number) {
    if (this.renumberIndex !== value && value >= 0) {
      this.renumberIndex = value;
      this.view.renumberMeasures(this.measure.measureNumber.measureIndex, this.localIndex);
    }
  }
  get forceRest() {
    return this.format.forceRest;
  }
  set forceRest(value: boolean) {
    this.writeBoolean('forceRest', value);
  }
  get repeatSymbol() {
    return this.measure.repeatSymbol;
  }
  set repeatSymbol(value: boolean) {
    const repeatCount = value ? 1 : 0;
    this.view.updateRepeatCount(repeatCount);
    this.measure.repeatSymbol = value;
    this.measure.repeatCount = repeatCount;
  }
  get restBreak() {
    return this.format.restBreak;
  }
  set restBreak(value: boolean) {
    this.writeBoolean('restBreak', value);
  }
  get customStretch() {
    return this.format.customStretch;
  }
  set customStretch(value: number) {
    this.writeNumber('customStretch', value);
  }
  get customProportion() {
    return this.format.proportionality;
  }
  set customProportion(value: number) {
    this.writeNumber('proportionality', value);
  }
  get autoJustify() {
    return this.format.autoJustify;
  }
  set autoJustify(value: boolean) {
    this.writeBoolean('autoJustify', value);
  }
  get padAllInSystem() {
    return this.format.padAllInSystem;
  }
  set padAllInSystem(value: boolean) {
    this.writeBoolean('padAllInSystem', value);
  }
  get systemBreak() {
    return this.format.systemBreak;
  }
  set systemBreak(value: boolean) {
    this.writeBoolean('systemBreak', value);
  }
}
/**
 * This file contains dialogs that affect all measures at a certain position (column),
 * such as tempo or time signature.
 * @category SuiDialog
 */
export class SuiMeasureDialog extends SuiDialogAdapterBase<SuiMeasureFormatAdapter> {
  static dialogElements: DialogDefinition = 
      {
        label: 'Measure Properties',
        elements:
          [{
            smoName: 'padLeft',
            control: 'SuiRockerComponent',
            label: 'Pad Left (px)'
          }, {
            smoName: 'customStretch',
            control: 'SuiRockerComponent',
            label: 'Stretch Contents'
          }, {
            smoName: 'customProportion',
            control: 'SuiRockerComponent',
            increment: 10,
            label: 'Proportionalality'
          }, {
            smoName: 'localIndex',
            control: 'SuiRockerComponent',
            increment: 1,
            label: 'Measure Number'
          }, {
            smoName: 'padAllInSystem',
            control: 'SuiToggleComponent',
            label: 'Pad all measures in system'
          }, {
            smoName: 'autoJustify',
            control: 'SuiToggleComponent',
            label: 'Justify Columns'
          }, {
            smoName: 'restBreak',
            control: 'SuiToggleComponent',
            label: 'Break Multimeasure Rest in Part'
          }, {
            smoName: 'forceRest',
            control: 'SuiToggleComponent',
            label: 'Force Multimeasure Rest'
          }, {
            smoName: 'repeatSymbol',
            control: 'SuiToggleComponent',
            label: 'Repeat Symbol'
          }, {
            smoName: 'skipMeasureCount',
            control: 'SuiToggleComponent',
            label: 'Skip in max measure count'
          }, {
            smoName: 'systemBreak',
            control: 'SuiToggleComponent',
            label: 'System break before this measure'
          }],
          staticText: []
      };
  constructor(parameters: SuiDialogParams) {
    const selection = parameters.view.tracker.selections[0];
    const measure = selection.measure;
    const adapter = new SuiMeasureFormatAdapter(parameters.view, measure);
    super(SuiMeasureDialog.dialogElements, { adapter, ...parameters });
  }
}
