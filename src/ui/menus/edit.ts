import { SuiMenuBase, SuiMenuParams, SuiConfiguredMenuOption, SuiConfiguredMenu } from './menu';

declare var $: any;
/**
 * Stuff you can do to notes
 * @category SuiMenu
 */
export class SuiEditMenu extends SuiConfiguredMenu {
  constructor(params: SuiMenuParams) {
    super(params, 'Edit', SuiEditMenuOptions);
  }  
}
/**
 * Copy Ctrl^C action
 * @category SuiMenu
 */
const copyMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    await menu.view.copy();
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: 'icon-copy',
    text: 'Copy',
    value: 'copyAction'
  }
}

/**
 * Copy Ctrl^C action
 * @category SuiMenu
 */
const pasteMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    await menu.view.paste();
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: 'icon-paste',
    text: 'Paste',
    value: 'pasteAction'
  }
}

/**
 * Copy Ctrl^C action
 * @category SuiMenu
 */
const pasteChordsMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    await menu.view.pasteChords();
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Paste Chords',
    value: 'pasteChordsAction'
  }
}

/**
 * Copy Ctrl^C action
 * @category SuiMenu
 */
const undoMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    await menu.view.undo();
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: 'icon-undo',
    text: 'Undo',
    value: 'undoAction'
  }
}

/**
 * Note menu.  Stuff you can do to notes.
 * @category SuiMenu
 */
const SuiEditMenuOptions: SuiConfiguredMenuOption[] = [
  copyMenuOption, pasteMenuOption, pasteChordsMenuOption, undoMenuOption
];