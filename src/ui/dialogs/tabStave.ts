// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoTabStave } from '../../smo/data/staffModifiers';
import { Pitch } from '../../smo/data/common';
import { SmoSelection, SmoSelector } from '../../smo/xform/selections';

import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams, InstallDialog, DialogInstallParams } from './dialog';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { replaceVueRoot, modalContainerId } from '../common';
import { reactive, createApp } from 'vue';
import guitarTabApp from '../components/dialogs/guitarTab.vue';
export const  SuiTabStaveDialogVue= async(parameters: SuiDialogParams) => {
    const selections = SmoSelection.getMeasureList(parameters.view.tracker.selections);
    let changed = false;
    let existing = true;
    let tabStave = selections[0].staff.getTabStaveForMeasure(selections[0].selector);    
    if (!tabStave) {
      existing = false;
      tabStave = new SmoTabStave(SmoTabStave.defaults);
    }
    const backup = new SmoTabStave(tabStave)
    const commitCb = async () => {
      // If we are creating the default, make sure it is created
      if (!existing && !changed) {
        parameters.view.updateTabStave(tabStave);
      }
    }
    const cancelCb = async () => {
      if (!existing) {
        // If this was created just now, remove it
        await removeCb();
      } else {
        // If it existed, restore previous values
        await parameters.view.updateTabStave(backup);
      }
    }
    const removeCb = async () => {
      await parameters.view.removeTabStave();      
    }
    const toggleStemsCb = async () => {
      tabStave.showStems = !tabStave.showStems;
      await parameters.view.updateTabStave(tabStave);
    }
    const updatePitchesCb = async (pitches: Pitch[]) => {
      tabStave.stringPitches = pitches;
      tabStave.numLines = pitches.length;
      await parameters.view.updateTabStave(tabStave);
      changed = true;
    }
    const changeLineDistanceCb = async (lines: number) => {
      tabStave.spacing = lines;
      await updatePitchesCb(tabStave.stringPitches);
    }
    const rootId = replaceVueRoot(modalContainerId);
    const appParams = {
      domId: rootId,
      label: 'Guitar Tab Properties',
      tabStave,
      toggleStemsCb,
      updatePitchesCb,
      changeLineDistanceCb
    }
    const ctor: DialogInstallParams = {
        app: guitarTabApp,
        appParams,
        root: rootId,
        dialogParams: parameters,
        commitCb, 
        cancelCb
      };
    if (existing) {
      ctor.removeCb = removeCb;
    }
    InstallDialog(ctor);    
}
/**
 * Create or edit guitar tablature settings for a stave
 * @category SuiDialog
 */
export class SuiTabStaveAdapter extends SuiComponentAdapter {
  selections: SmoSelection[];
  tabStave: SmoTabStave;
  constructor(view: SuiScoreViewOperations, modifier?: SmoTabStave) {
    super(view);
    this.selections = SmoSelection.getMeasureList(this.view.tracker.selections);
    if (modifier) {
      this.tabStave = modifier;
    } else {
      const tabStave = this.selections[0].staff.getTabStaveForMeasure(this.selections[0].selector);
      if (tabStave) {
        this.tabStave = tabStave
      } else {
        this.tabStave = new SmoTabStave(SmoTabStave.defaults);
        this.tabStave.startSelector = JSON.parse(JSON.stringify(this.selections[0].selector));
        this.tabStave.endSelector = JSON.parse(JSON.stringify(this.selections[this.selections.length - 1].selector));
      }
    }
  }
  get numLines(): number {
    return this.tabStave.numLines;
  }
  set numLines(value: number) {
    this.tabStave.numLines = value;
  }
  set spacing(value: number) {
    this.tabStave.spacing = value;
  }
  get spacing(): number {
    return this.tabStave.spacing;
  }
  get showStems(): boolean {
    return this.tabStave.showStems;
  }
  set showStems(value: boolean) {
    this.tabStave.showStems = value;
  }
  get allMeasures(): boolean {
    return this.tabStave.allMeasures;
  }
  set allMeasures(value: boolean) {
    this.tabStave.allMeasures = value;
  }
  get stringPitches(): Pitch[] {
    return this.tabStave.stringPitches;
  }
  set stringPitches(value: Pitch[]) {
    this.tabStave.stringPitches = value;
    this.numLines = this.tabStave.stringPitches.length;
  }
  resetStrings() {
    this.tabStave.stringPitches = SmoTabStave.defaultStringPitches;
  }
  async commit() {
    this.view.updateTabStave(this.tabStave);
  }
  async cancel() {
  }
  async remove() { 
    return await this.view.removeTabStave();
  }
}
/**
 * Create or edit guitar tablature settings for a stave
 * @category SuiDialog
 */
export class SuiTabStaveDialog extends SuiDialogAdapterBase<SuiTabStaveAdapter> {
  static get applyTo() {
    return {
      score: 0, selected: 1, remaining: 3
    };
  }
  // export type Clef = 'treble' | 'bass' | 'tenor' | 'alto' | 'soprano' | 'percussion'
    //| 'mezzo-soprano' | 'baritone-c' | 'baritone-f' | 'subbass' | 'french';
  static dialogElements: DialogDefinition = 
      {
        label: 'Tab Properties',
        elements:
          [{smoName: 'stringPitches',
           control:'SuiPitchArrayComponentTab', 
           label: 'Pitches'
          }, {
            smoName: 'spacing',
            defaultValue: 13,
            control: 'SuiRockerComponent',
            label: 'Space between lines'
          }, {
            smoName: 'showStems',
            control: 'SuiToggleComponent',
            label: 'Show Stems'
          }, {
            smoName: 'allMeasures',
            control: 'SuiToggleComponent',
            label: 'Apply to all measures'
          }],
          staticText: []
      };
  constructor(parameters: SuiDialogParams) {
    const adapter = new SuiTabStaveAdapter(parameters.view, parameters.modifier);
    super(SuiTabStaveDialog.dialogElements, { adapter, ...parameters });
    this.displayOptions = ['BINDCOMPONENTS', 'DRAGGABLE', 'KEYBOARD_CAPTURE', 'MODIFIERPOS'];
  }
}