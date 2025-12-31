// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoMeasure } from '../../smo/data/measure';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiToggleComponent } from './components/toggle';
import { replaceVueRoot, modalContainerId } from '../common';
import addMeasuresApp from '../../ui/components/dialogs/addMeasures.vue';
import { SuiRockerComponent } from './components/rocker';
import { watch, ref, Ref } from 'vue';
import { DialogDefinition, SuiDialogBase, SuiDialogParams, InstallDialog } from './dialog';

declare var $: any;
export const SuiInsertMeasuresVue =  async (parameters: SuiDialogParams) => {
  const selection = parameters.view.tracker.selections[0];
  const measure = selection.measure;
  let numberMeasures = ref(1);
  let append = ref(false);
  const getNumberMeasures = (): Ref<number> => {
    return numberMeasures;
  }
  const getAppend = (): Ref<boolean> => {
    return append;
  }
  const commitCb = async () => {
    await parameters.view.addMeasures(append.value, numberMeasures.value);
  }
  const cancelCb = async () => {

  }
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = {
    domId: rootId,
    label: 'Insert Measures',
    getNumberMeasures,
    getAppend,
    commitCb,
    cancelCb
  };
  InstallDialog({
    app: addMeasuresApp,
    appParams,
    root: rootId,
    dialogParams: parameters,
    commitCb, 
    cancelCb
  });
}
/**
 * Insert some number of measures
 * @category SuiDialog
 */
export class SuiInsertMeasures extends SuiDialogBase {
  static dialogElements: DialogDefinition =
      {
        label: 'Insert Measures',
        elements:
          [{
            smoName: 'measureCount',
            defaultValue: 0,
            control: 'SuiRockerComponent',
            label: 'Measures to Insert'
          }, {
            smoName: 'append',
            control: 'SuiToggleComponent',
            label: 'Append to Selection'
          }],
          staticText: []
      };
  measure: SmoMeasure;
  selection: SmoSelection;
  constructor(parameters: SuiDialogParams) {
    super(SuiInsertMeasures.dialogElements,
      parameters);
    this.selection = this.view.tracker.selections[0];
    const selection = parameters.view.tracker.selections[0];
    const measure = selection.measure;
    this.measure = measure;
    if (!this.startPromise) {
      this.startPromise = new Promise((resolve) => {
        resolve();
      });
    }
  }
  async commit() { 
    await this.view.addMeasures(this.appendCtrl.getValue(), this.measureCountCtrl.getValue());
  }

  get measureCountCtrl(): SuiRockerComponent {
    return this.cmap.measureCountCtrl as SuiRockerComponent;
  }
  get appendCtrl(): SuiToggleComponent {
    return this.cmap.appendCtrl as SuiToggleComponent;
  }
  populateInitial() {
    this.measureCountCtrl.setValue(1);
  }
  // noop
}