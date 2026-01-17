// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams, InstallDialog } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { getButtonsFcn, SuiButtonArrayComponent, SuiButtonArrayParameters } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
import { SmoMicrotone } from '../../smo/data/noteModifiers';
import { replaceVueRoot, modalContainerId } from '../common';
import { DialogButtonDefinition, DialogButtonState } from '../buttons/button';
import { reactive } from 'vue';
import { SmoScore } from '../../smo/data/score';
import { SmoSelection } from '../../smo/xform/selections';
import microtoneApp from '../components/dialogs/microtones.vue';

export const SuiMicrotoneDialogVue = (parameters: SuiDialogParams) => {
  const rootId = replaceVueRoot(modalContainerId);
  const setForAll: Record<string, number> = {};
  let notesCount = 0;
  parameters.view.tracker.selections.forEach((sel) => {
    const microtones = sel.note!.getMicrotones();
    notesCount += 1;
    microtones.forEach((microtone) => {
      if (!setForAll[microtone.tone]) {
        setForAll[microtone.tone] = 0;
      }
      setForAll[microtone.tone] = setForAll[microtone.tone] + 1;
    });
  });
  const keys = Object.keys(setForAll);
  const transitionButtonState = (button: DialogButtonDefinition) => {
    if (button.state === 'selected') {
      button.state = 'unselected';
    } else {
      button.state = 'selected';
    }
  }
  const microtoneCb = async (button: DialogButtonDefinition) => {
    transitionButtonState(button);
    const code = button.id;
    await parameters.view.modifyCurrentSelections('microtone', (score: SmoScore, selections: SmoSelection[]) => {
      for (let i = 0; i < selections.length; ++i) {
        const sel = selections[i];
        const note = sel.note!;
        note.removeMicrotone();
        if (button.state === 'selected') {
            const defs = SmoMicrotone.defaults;
            defs.tone = code;
            note.addMicrotone(new SmoMicrotone(defs));
          }
      }
    });
  }
  const accidentals: DialogButtonDefinition[] = reactive([{
    classes: '',
    icon: 'icon-bravura icon-accidentalThreeQuarterTonesFlatZimmermann',
    id: 'flat75sz',
    hotkey: '',
    label: '3/4 Flat',
    callback: microtoneCb,
    state: 'unselected',
    group: 'accidentals'
  }, {
    classes: '',
    icon: 'icon-bravura icon-accidentalQuarterToneFlatStein',
    id: 'flat25sz',
    hotkey: '',
    label: '1/4 Flat',
    callback: microtoneCb,
    state: 'unselected',
    group: 'accidentals'
  }, {
    classes: '',
    icon: 'icon-bravura icon-accidentalBakiyeFlat',
    id: 'flat25ar',
    hotkey: '',
    label: '1/4 flat (Armenian)',
    callback: microtoneCb,
    state: 'unselected',
    group: 'accidentals'
  }, {
    classes: '',
    icon: 'icon-bravura icon-accidentalThreeQuarterTonesSharpStein',
    id: 'sharp75',
    hotkey: '',
    label: '3/4 Sharp',
    callback: microtoneCb,
    state: 'unselected',
    group: 'Glyphs'
  }, {
    classes: '',
    icon: 'icon-bravura icon-accidentalQuarterToneSharpStein',
    id: 'sharp25',
    hotkey: '',
    label: '1/4 Sharp',
    callback: microtoneCb,
    state: 'unselected',
    group: 'accidentals'
  }, {
    classes: '',
    icon: 'icon-bravura icon-accidentalSori',
    id: 'sori',
    hotkey: '',
    label: 'Bow Down',
    callback: microtoneCb,
    state: 'unselected',
    group: 'accidentals'
  }, {
    classes: '',
    icon: 'icon-bravura icon-accidentalKoron',
    id: 'koron',
    hotkey: '',
    label: 'Koron',
    callback: microtoneCb,
    state: 'unselected',
    group: 'accidentals'
  }
  ]);

  keys.forEach((key) => {
    if (setForAll[key] === notesCount) {
      let btnId = accidentals.find((btn) => btn.id === key);
      if (btnId) {
        btnId.state = 'selected';
      }
    } else {
      let btnId = accidentals.find((btn) => btn.id === key);
      if (btnId) {
        btnId.state = 'partiallySelected';
      }
    }
  });

  // Undo on cancel for any changes made
  parameters.view.groupUndo(true);
  const commitCb = async () => {
  }
  const cancelCb = async () => {
    await parameters.view.undo();
  }
  const appParams = {
    domId: rootId,
    microtoneCb,
    accidentals
  };

  InstallDialog({ root: rootId, app: microtoneApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}