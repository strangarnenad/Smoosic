import { createAndDisplayDialog } from '../dialogs/dialog';
import {SuiArpeggioDialog } from '../dialogs/arpeggio';
import { SuiClefChangeDialog } from '../dialogs/clefChange';
import { SuiNoteHeadDialog } from '../dialogs/noteHead';
import { SuiOrnamentDialog } from '../dialogs/ornament';
import { SuiDurationDialog } from '../dialogs/durations';
import { SuiArticulationDialog } from '../dialogs/articulation';
import { SuiGraceNoteDialog } from '../dialogs/gracenote';
import { SuiMicrotoneDialog } from '../dialogs/microtones';
import { SuiPitchDialog } from '../dialogs/pitch';
import { SmoPedalMarking } from '../../smo/data/staffModifiers';
import { SmoSelector } from '../../smo/xform/selections';
import { SuiMenuBase, SuiMenuParams, MenuDefinition, SuiMenuHandler, SuiMenuShowOption, 
  SuiConfiguredMenuOption, SuiConfiguredMenu, customizeMenuOptionsFcn } from './menu';
  import { addOrReplacePedalMarking } from './staffModifier';
declare var $: any;
/**
 * Stuff you can do to notes
 * @category SuiMenu
 */
export class SuiNoteMenu extends SuiConfiguredMenu {
  constructor(params: SuiMenuParams) {
    super(params, 'Notes', SuiNoteMenuOptions);
  }  
}
/**
 * @category SuiMenu
 */
const toggleCueMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    await menu.view.toggleCue();
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Toggle Cue',
    value: 'toggleCueMenuOption'
  }
}
/**
 * @category SuiMenu
 */
const arpeggioMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiArpeggioDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiArpeggioDialog',
      id: 'insert-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Arpeggio',
    value: 'arpeggioDialog'
  }
}
/**
 * @category SuiMenu
 */
const noteHeadMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiNoteHeadDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiNoteHeadDialog',
      id: 'notehead-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Head and Stem',
    value: 'noteHeadDialog'
  }
}
/**
 * @category SuiMenu
 */
const pitchMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiPitchDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiPitchDialog',
      id: 'pitch-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Pitches',
    value: 'pitchDialog'
  }
}
/**
 * @category SuiMenu
 */
const graceNotesMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiGraceNoteDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiNoteHeadDialog',
      id: 'insert-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Grace Notes',
    value: 'graceNotes'
  }
}
/**
 * @category SuiMenu
 */
const clefNoteDialogMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiClefChangeDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiClefChangeDialog',
      id: 'insert-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Change Clef',
    value: 'clefNoteDialog'
  }
}
/**
 * @category SuiMenu
 */
const togglePedalRelease: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    menu.tracker.selections.forEach(async (selection) => {
      const pms = selection.staff.getPedalMarkingsContaining(selection.selector);
      const selectorToAdd = selection.selector;
      let shouldAdd = true;
      
      pms.forEach(async (mod) => {
        const pm = mod as SmoPedalMarking;
        const releaseAr = [];
        pm.releases.forEach((rr) => {
          if (SmoSelector.eq(rr, selectorToAdd)) {
            shouldAdd = false;
          } else if (SmoSelector.gt(mod.startSelector, selectorToAdd) && SmoSelector.lt(mod.endSelector, selectorToAdd)) {
            releaseAr.push(rr);
          }
        });
        if (shouldAdd) {
          releaseAr.push(selectorToAdd);
        }
        pm.releases = releaseAr.sort((a, b) => SmoSelector.gt(a, b) ? 1 : -1);
        await addOrReplacePedalMarking(menu.view, pm);
      });
    });
  }, display: ((menu: SuiMenuBase) =>  {
    let show = false;
    menu.tracker.selections.forEach((selection) => {
      const pms = selection.staff.getPedalMarkingsContaining(selection.selector);
      if (pms.length) {
        show = true;
      }
    });
    return show;
  }),
  menuChoice: {
    icon: '',
    text: 'Toggle Pedal Release',
    value: 'togglePedalRelease'
  }
}
/**
 * @category SuiMenu
 */
const ornamentNoteDialogMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiOrnamentDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiOrnamentDialog',
      id: 'ornament-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Ornaments',
    value: 'ornamentDialog'
  }
}
/**
 * @category SuiMenu
 */
const durationDialogMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiDurationDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiDurationDialog',
      id: 'duration-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Durations',
    value: 'durationDialog'
  }
}
/**
 * @category SuiMenu
 */
const articulationNoteDialogMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiArticulationDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiArticulationDialog',
      id: 'ornament-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Articulations',
    value: 'articulationDialog'
  }
}
/**
 * @category SuiMenu
 */
const microtoneNoteDialogMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    createAndDisplayDialog(SuiMicrotoneDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiMicrotoneDialog',
      id: 'microtone-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Microtones',
    value: 'microtoneDialog'
  }
}
/**
 * Note menu.  Stuff you can do to notes.
 * @category SuiMenu
 */
const SuiNoteMenuOptions: SuiConfiguredMenuOption[] = [
  toggleCueMenuOption, arpeggioMenuOption, clefNoteDialogMenuOption, 
  graceNotesMenuOption,
  noteHeadMenuOption, ornamentNoteDialogMenuOption,
  articulationNoteDialogMenuOption, 
  microtoneNoteDialogMenuOption, togglePedalRelease, 
  durationDialogMenuOption, pitchMenuOption
];