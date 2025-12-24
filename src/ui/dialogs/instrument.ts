// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoInstrument, SmoInstrumentNumParamType, SmoInstrumentStringParamType } from '../../smo/data/staffModifiers';
import { SmoSelection, SmoSelector } from '../../smo/xform/selections';

import { SuiDialogParams, InstallDialog } from './dialog';
import { SuiSampleMedia } from '../../render/audio/samples';
import { replaceVueRoot, modalContainerId } from '../common';
import { reactive, watch, ref } from 'vue';
import instrumentPropertiesApp from '../components/dialogs/instrumentProperties.vue';

export const SuiInstrumentDialogVue = (parameters: SuiDialogParams) => {
  const selection = parameters.view.tracker.selections[0];
  const instrument = reactive(new SmoInstrument(parameters.view.score.getStaffInstrument(selection.selector)));
  let applies = 'Selected';
  const setApplyTo = (value: string)  => {
    applies = value;
    if (value === 'Score') {
      parameters.view.tracker.selections = SmoSelection.selectionsToEnd(parameters.view.score, parameters.view.tracker.selections[0].selector.staff, 0);
    } else if (applies === 'Remaining') {
      parameters.view.tracker.selections = SmoSelection.selectionsToEnd(parameters.view.score, parameters.view.tracker.selections[0].selector.staff, parameters.view.tracker.selections[0].selector.measure);
    } else {
      parameters.view.tracker.selections = parameters.view.tracker.selections;
    }
  }
  setApplyTo(applies);
  const commitCb = async () => {
    // hack: the family name for musicxml purposes is here.
    instrument.family = SuiSampleMedia.getFamilyForInstrument(instrument.instrument);
    await parameters.view.changeInstrument(instrument, parameters.view.tracker.selections);
  }
  const cancelCb = async () => {    
  }
  watch(instrument, async (newVal) => {
    console.log('Instrument changed');
  });
  const getInstrument = () => instrument;
  const appParams = {
    domId: replaceVueRoot(modalContainerId),
    label: 'Instrument Properties',
    applyToInitial: applies,
    getInstrument,
    updateApplyToCb: setApplyTo,
  }
  const rootId = replaceVueRoot(modalContainerId);
  InstallDialog({
      app: instrumentPropertiesApp,
      appParams,
      root: rootId,
      dialogParams: parameters,
      commitCb, 
      cancelCb
    });
}
