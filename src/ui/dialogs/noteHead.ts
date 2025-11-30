// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoSelection, SmoSelector } from '../../smo/xform/selections';

import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams, InstallDialog } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { getButtonsFcn, SuiButtonArrayComponent, SuiButtonArrayParameters } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
import { SmoOperation } from '../../smo/xform/operations';
import { SmoNote } from '../../smo/data/note';
import { SuiButtonComponentParams } from './components/button';
import { default as noteHeadApp } from '../components/dialogs/noteHead.vue';
import { replaceVueRoot, modalContainerId } from '../common';
import { DialogButtonDefinition, DialogButtonState } from '../buttons/button';
export const SuiNoteHeadDialogVue = (parameters: SuiDialogParams) => {
  const rootId = replaceVueRoot(modalContainerId);
  let noteStateSame = false;
  const transitionButtonState = (button: DialogButtonDefinition) => {
    if (button.state === 'selected') {
      button.state = 'unselected';
    } else {
      button.state = 'selected';
    }
  }
  const selection = parameters.view.tracker.selections[0];
  const note = selection.note;
  const stemCbSame = async (button: DialogButtonDefinition) => {
    noteStateSame = false;
    if (button.id === 'slash') {
      await parameters.view.modifyCurrentSelections('set note head', (score, selections) => {
        selections.forEach((selection: SmoSelection) => {
          SmoOperation.makeNote(selection);
        });
      });
      if (button.state === 'selected') {
        await parameters.view.toggleSlash();
      }
    } else if (button.id === 'delete') {
      await parameters.view.modifyCurrentSelections('set note head', (score, selections) => {
        selections.forEach((selection: SmoSelection) => {
          SmoOperation.makeNote(selection);
        });
      });
      if (button.state === 'selected') {
        await parameters.view.deleteNote();
      }
    } else if (button.id === 'rest') {
      if (button.state === 'selected') {
        await parameters.view.makeRest();
      } else {
        await parameters.view.modifyCurrentSelections('set note head', (score, selections) => {
          selections.forEach((selection: SmoSelection) => {
            SmoOperation.makeNote(selection);
          });
        });
      }
    }
  }
  const stemCb = async (button: DialogButtonDefinition) => {
    transitionButtonState(button);
    if (noteStateSame) {
      return await stemCbSame(button);
    }
    if (button.id === 'slash') {
      await parameters.view.toggleSlash();
    } else if (button.id === 'delete') {
      await parameters.view.deleteNote();
    } else {
      await parameters.view.makeRest();
    }
  }
  const shapeCb = async (button: DialogButtonDefinition) => {
    transitionButtonState(button);
    const note = parameters.view.tracker.selections[0].note;
    if (note) {
      if (button.id === 'slash') {
        await parameters.view.toggleSlash();
      } else if (button.id === 'delete') {
        await parameters.view.deleteNote();
      } else {
        await parameters.view.makeRest();
      }
    }
  }
  const headsCb = async (button: DialogButtonDefinition) => {
    transitionButtonState(button);
    const code = button.id === 'Default' ? '' : button.id;
    parameters.view.modifyCurrentSelections('set note head', (score, selections) => {
      SmoOperation.setNoteHead(selections, code);
    });
  };

  const isSlash = (note: SmoNote | null): boolean => {
    return note !== null && note.isSlash();
  }
  const isRest = (note: SmoNote | null) => {
    return note !== null && note.isRest();
  }
  const isHidden = (note: SmoNote | null) => {
    return note !== null && note.isHidden();
  }
  const matchesNoteHeadFcn = (code: string) => {
    return (note: SmoNote | null): boolean => {
      return note !== null && note.noteHead === code;
    }
  }
  const testSelectionState = (func: (note: SmoNote | null) => boolean): DialogButtonState => {
    let state: DialogButtonState = 'unselected';
    let anyUnselected = false;
    const selections = parameters.view.tracker.selections;
    for (let i = 0; i < selections.length; ++i) {
      const selection = selections[i];
      if (func(selection.note)) {
        if (anyUnselected) {
          state = 'partiallySelected';
          break;
        } else {
          state = 'selected';
        }
      } else {
        if (state === 'selected') {
          state = 'partiallySelected';
          break;
        } else {
          anyUnselected = true;
        }
      }
    }
    return state;
  }
  const slashState = testSelectionState(isSlash);
  const restState = testSelectionState(isRest);
  const hiddenState = testSelectionState(isHidden);
  const stems: DialogButtonDefinition[] = [{
    classes: '',
    icon: 'icon-bravura icon-restQuarter',
    id: 'rest',
    hotkey: 'r',
    label: 'Rest',
    callback: stemCb,
    state: restState,
    group: 'stems'
  }, {  
    classes: '',
    icon: 'icon-bravura icon-restQuarter',
    id: 'delete',
    label: 'Delete',
    hotkey: 'Delete',
    callback: stemCb,
    state: hiddenState,
    group: 'stems'
  }, {
    classes: '',
    icon: 'icon-bravura icon-repeatBarSlash',
    id: 'slash',
    label: 'Slash',
    callback: stemCb,
    state: slashState,
    group: 'stems'
  }];
  const shapes: DialogButtonDefinition[] = [
    {
      classes: '',
      callback: shapeCb,
      icon: 'icon-bravura icon-noteheadXBlack',
      label: 'X',
      id: 'CX',
      group: 'shapes',
      state: testSelectionState(matchesNoteHeadFcn('CX'))
    },
    {
      classes: '',
      callback: shapeCb,
      icon: 'icon-bravura icon-noteheadTriangleUpBlack',
      label: 'Triangle Up',
      id: 'TU',
      group: 'shapes',
      state: testSelectionState(matchesNoteHeadFcn('TU'))
    }, {
      classes: '',
      callback: shapeCb,
      icon: 'icon-bravura icon-noteheadTriangleDownBlack',
      label: 'Triangle Down',
      id: 'TD',
      group: 'shapes',
      state: testSelectionState(matchesNoteHeadFcn('TD'))
    }, {
      classes: '',
      icon: 'icon-bravura icon-noteheadDiamondBlack',
      callback: shapeCb,
      label: 'Diamond',
      id: 'D',
      group: 'shapes',
      state: testSelectionState(matchesNoteHeadFcn('D'))
    }, {
      classes: '',
      icon: 'icon-bravura icon-noteheadSquareBlack',
      id: 'SQ',
      label: 'Square',
      callback: shapeCb,
      group: 'shapes',
      state: testSelectionState(matchesNoteHeadFcn('SQ'))
    }
  ];
  const heads: DialogButtonDefinition[] = [
    {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura ribbon-button-text icon-noteheadDiamondWhole',
      label: 'Diamond whole',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('D0')),
      id: 'D0'
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura  icon-noteheadDiamondHalf',
      id: 'D1',
      label: 'Diamond open',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('D1'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadDiamondBlack',
      id: 'D2',
      label: 'Diamond closed',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('D2'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadTriangleUpWhole',
      id: 'T0',
      label: 'Triangle up whole',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('T0'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadTriangleUpHalf',
      id: 'T1',
      label: 'Triangle up open',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('T1'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadTriangleUpBlack',
      id: 'T2',
      label: 'Triangle up closed',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('T2'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadXWhole',
      id: 'X0',
      label: 'X Whole',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('X0'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadXHalf',
      id: 'X1',
      label: 'X Half',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('X1'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadXBlack',
      id: 'X2',
      label: 'X Closed',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('X2'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadMoonBlack',
      id: 'RE',
      label: 'Moon Closed',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('RE'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadTriangleLeftBlack',
      id: 'FA',
      label: 'Left Triangle Closed',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('FA'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadTriangleRightBlack',
      id: 'FAUP',
      label: 'Right Triangle Up Closed',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn('FAUP'))
    }, {
      classes: '',
      callback: headsCb,
      icon: 'icon-bravura icon-noteheadBlack',
      id: 'Default',
      label: 'Moon Black',
      group: 'heads',
      state: testSelectionState(matchesNoteHeadFcn(''))
    }
  ];
  const commitCb = async () => {
  }
  const cancelCb = async () => {    
    await parameters.view.undo();
  }
  const appParams = {  domId: rootId,
    shapes,
    heads,
    stems};
  InstallDialog({root: rootId, app: noteHeadApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
/**
 * Notehead buttons, stem buttons etc.
 * @category SuiDialog
 * @returns SuiButtonArrayParameters
 */
const stemButtonFactory: getButtonsFcn = () => {
  const params: SuiButtonArrayParameters = {
    label: 'Stem',
    rows: [{
      label: 'Stems',
      classes: 'pad-span',
      buttons: [
        {
          classes: 'icon collapseParent button-array repetext',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-restQuarter',
          id: 'restIcon',
          text: 'r',
          label: 'Rest',
          smoName: 'rest'
        },
        {
          classes: 'icon collapseParent button-array repetext',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-transparent icon-restQuarter',
          id: 'hideIcon',
          label: 'Hidden',
          text: 'delete',
          smoName: 'hidden'
        }, {
          classes: 'icon collapseParent button-array repetext',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-repeatBarSlash',
          id: 'slashIcon',
          label: 'Slash',
          smoName: 'slash'
        },
      ]
    }]
  };
  return params;
}
/**
 * Notehead buttons, stem buttons etc.
 * @category SuiDialog
 * @returns SuiButtonArrayParameters
 */
const noteHeadButtonFactory: getButtonsFcn = () => {
  const params: SuiButtonArrayParameters = {
    label: 'Note Heads',
    rows: [{
      label: 'Shapes',
      classes: 'pad-span',
      buttons: [
        {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadXBlack',
          id: 'noteheadBlackX',
          label: 'X',
          smoName: 'CX'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadTriangleUpBlack',
          id: 'noteheadTriangleXUp',
          label: 'Triangle Up',
          smoName: 'TU'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadTriangleDownBlack',
          id: 'noteheadCircleX',
          label: 'Triangle Down',
          smoName: 'TD'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadDiamondBlack',
          id: 'noteheadDiamondBlack',
          label: 'Diamond',
          smoName: 'D'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadSquareBlack',
          id: 'noteheadSquareBlack',
          label: 'Square',
          smoName: 'SQ'
        }
      ]
    }, {
      label: 'Heads',
      classes: 'pad-span',
      buttons: [
        {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadDiamondWhole',
          id: 'noteheadDiamondWhole',
          label: 'Diamond whole',
          smoName: 'D0'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadDiamondHalf',
          id: 'noteheadDiamondHalf',
          label: 'Diamond open',
          smoName: 'D1'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadDiamondBlack',
          id: 'noteheadDiamondBlack',
          label: 'Diamond closed',
          smoName: 'D2'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadTriangleUpWhole',
          id: 'noteheadTriangleUpWhole',
          label: 'Triangle up whole',
          smoName: 'T0'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadTriangleUpHalf',
          id: 'noteheadTriangleUpHalf',
          label: 'Triangle up open',
          smoName: 'T1'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadTriangleUpBlack',
          id: 'noteheadTriangleUpBlack',
          label: 'Triangle up closed',
          smoName: 'T2'
        }
      ]
    },
    {
      label: '',
      classes: 'pad-span',
      buttons: [
        {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadXWhole',
          id: 'noteheadXWhole',
          label: 'X Whole',
          smoName: 'X0'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadXHalf',
          id: 'noteheadXHalf',
          label: 'X Helf',
          smoName: 'X1'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadXBlack',
          id: 'noteheadXBlack',
          label: 'X Closed',
          smoName: 'X2'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadMoonBlack',
          id: 'noteheadMoonBlack',
          label: 'Moon Black',
          smoName: 'RE'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadTriangleLeftBlack',
          id: 'noteheadTriangleLeftBlack',
          label: 'Left Triangle Closed',
          smoName: 'FA'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadTriangleRightBlack',
          id: 'noteheadTriangleRightBlack',
          label: 'Right Triangle Close',
          smoName: 'FAUP'
        }, {
          classes: 'icon collapseParent button-array',
          control: 'SuiButtonArrayButton',
          icon: 'icon-bravura icon-noteheadBlack',
          id: 'noteheadBlack',
          label: 'Default',
          smoName: ''
        }
      ]
    }
    ]
  }
  return params;
}
/**
 * @category SuiDialog
 */
export class SuiNoteHeadButtonComponent extends SuiButtonArrayComponent {
  constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams) {
    super(dialog, parameter, noteHeadButtonFactory);
  }
}
/**
 * @category SuiDialog
 */
export class SuiStemButtonComponent extends SuiButtonArrayComponent {
  constructor(dialog: SuiDialogNotifier, parameter: SuiBaseComponentParams) {
    super(dialog, parameter, stemButtonFactory);
  }
}
/**
 * @category SuiDialog
 */
export class SuiNoteHeadAdapter extends SuiComponentAdapter {
  code: string = '';
  stemCode: string = '';
  constructor(view: SuiScoreViewOperations) {
    super(view);
    this.view.groupUndo(true);
    const ss: Record<string, number> = {};
    const selections = this.view.tracker.selections.filter((nn) => nn.note);
    // count all the notes in selection, if they all have the same note head, that is the
    // selected note head so select it in the UI.
    for (let i = 0; i < selections.length; ++i) {
      const nn = selections[i].note;
      if (typeof (ss[nn!.noteHead]) === 'undefined') {
        ss[nn!.noteHead] = 0;
      }
      ss[nn!.noteHead] += 1;
    }
    const keys = Object.keys(ss);
    if (keys.length === 1) {
      this.code = keys[0];
    }
  }
  get stemComponent() {
    return this.stemCode;
  }
  set stemComponent(value: string) {
    const note = this.view.tracker.selections[0].note;
    if (note) {
      if (value === '') {
        this.stemCode = '';
        if (note.isSlash()) {
          this.view.toggleSlash();
        } else if (note.isHidden()) {
          this.view.deleteNote();
        } if (note.isRest()) {
          this.view.makeRest();
        }
      } else {
        this.stemCode = value;
        if (value === 'rest') {
          this.view.makeRest();
        } else if (value === 'hidden') {
          // hidden and rest are tri-state toggle.
          if (!note.isHidden()) {
            this.view.deleteNote();
            if (note.isRest()) {
              this.view.deleteNote();
            }
          }
        } else if (value === 'slash') {
          if (!note.isSlash()) {
            this.view.toggleSlash();
          }
        }
      }
    }
  }
  get noteHead() {
    return this.code;
  }
  set noteHead(value: string) {
    this.code = value;
    this.view.modifyCurrentSelections('set note head', (score, selections) => {
      SmoOperation.setNoteHead(selections, this.code);
    });
  }
  async commit() {
  }
  async cancel() {
    this.view.undo();
  }
  async remove() {
  }
}
/**
 * @category SuiDialog
 */
export class SuiNoteHeadDialog extends SuiDialogAdapterBase<SuiNoteHeadAdapter> {
  static get applyTo() {
    return {
      score: 0, selected: 1, remaining: 3
    };
  }
  // export type Clef = 'treble' | 'bass' | 'tenor' | 'alto' | 'soprano' | 'percussion'
  //| 'mezzo-soprano' | 'baritone-c' | 'baritone-f' | 'subbass' | 'french';
  static dialogElements: DialogDefinition =
    {
      label: 'Note Heads',
      elements:
        [{
          smoName: 'noteHead',
          control: 'SuiNoteHeadButtonComponent',
          label: 'Note Head'
        }, {
          smoName: 'stemComponent',
          control: 'SuiStemButtonComponent',
          label: 'Rest'
        }, {
          smoName: 'textMessage',
          control: 'SuiReadOnlyTextComponent',
          label: 'Use r to toggle note to rest.  Use delete to toggle visibility.',
          classes: 'hide-input'
        }, {
          smoName: 'textMessage2',
          control: 'SuiReadOnlyTextComponent',
          label: 'Use shortcuts when available - they are much faster!',
          classes: 'hide-input'
        }],
      staticText: []
    };
  constructor(parameters: SuiDialogParams) {
    const adapter = new SuiNoteHeadAdapter(parameters.view);
    super(SuiNoteHeadDialog.dialogElements, { adapter, ...parameters });
    this.displayOptions = ['BINDCOMPONENTS', 'DRAGGABLE', 'KEYBOARD_CAPTURE', 'MODIFIERPOS', 'HIDEREMOVE'];
  }
}