import { SuiMenuBase, SuiMenuParams, MenuDefinition, SuiMenuHandler, SuiMenuShowOption, 
  SuiConfiguredMenuOption, SuiConfiguredMenu } from './menu';
import { createAndDisplayDialog } from '../dialogs/dialog';

declare var $: any;
/**
 * Add, select, delete and change voices
 * @category SuiMenu
 */
export class SuiVoiceMenu extends SuiConfiguredMenu {
  constructor(params: SuiMenuParams) {
    super(params, 'Voices', SuiVoiceMenuOptions);
  }  
}

/**
 * @category SuiMenu
 */
const selectVoiceOneMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    menu.view.populateVoice(0);
  }, display: (menu: SuiMenuBase) => {
    for (let i = 0; i < menu.view.tracker.selections.length; ++i) {
      const mm = menu.view.tracker.selections[i].measure;
      if (mm.voices.length > 1) {
        return true;
      }
    }
    return false;
  },
  menuChoice: {
    icon: '',
    text: 'Voice 1',
    value: 'voiceOne'
  }
}
/**
 * @category SuiMenu
 */
const selectVoiceTwoMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    menu.view.populateVoice(1);
  }, display: (menu: SuiMenuBase) => {
    for (let i = 0; i < menu.view.tracker.selections.length; ++i) {
      const mm = menu.view.tracker.selections[i].measure;
      if (mm.voices.length < 4) {
        return true;
      }
    }
    return false;
  },
  menuChoice: {
    icon: '',
    text: 'Voice 2',
    value: 'voiceTwo'
  }
}
/**
 * @category SuiMenu
 */
const selectVoiceThreeMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    menu.view.populateVoice(2);
  }, display: (menu: SuiMenuBase) => {
    for (let i = 0; i < menu.view.tracker.selections.length; ++i) {
      const mm = menu.view.tracker.selections[i].measure;
      if (mm.voices.length < 4 && mm.voices.length > 1) {
        return true;
      }
    }
    return false;
  },
  menuChoice: {
    icon: '',
    text: 'Voice 3',
    value: 'voiceThree'
  }
}
/**
 * @category SuiMenu
 */
const selectVoiceFourMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    menu.view.populateVoice(3);
  }, display: (menu: SuiMenuBase) => {
    for (let i = 0; i < menu.view.tracker.selections.length; ++i) {
      const mm = menu.view.tracker.selections[i].measure;
      if (mm.voices.length < 4 && mm.voices.length > 2) {
        return true;
      }
    }
    return false;
  },
  menuChoice: {
    icon: '',
    text: 'Voice 4',
    value: 'voiceFour'
  }
}
/**
 * @category SuiMenu
 */
const removeVoiceMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    menu.view.depopulateVoice();
  }, display: (menu: SuiMenuBase) => {
    for (let i = 0; i < menu.view.tracker.selections.length; ++i) {
      const mm = menu.view.tracker.selections[i].measure;
      if (mm.activeVoice > 0) {
        return true;
      }
    }
    return false;
  },
  menuChoice: {
    icon: '',
    text: 'Remove Voice',
    value: 'removeVoice'
  }
}
/**
 * voice editing options (parallel voices in same stave)
 * @category SuiMenu
 */
const SuiVoiceMenuOptions: SuiConfiguredMenuOption[] = [
  selectVoiceOneMenuOption, selectVoiceTwoMenuOption, selectVoiceThreeMenuOption, selectVoiceFourMenuOption,
  removeVoiceMenuOption
];
