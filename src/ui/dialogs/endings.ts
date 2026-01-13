// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { DialogDefinition, SuiDialogParams, InstallDialog } from './dialog';
import { SmoBarline, SmoRepeatSymbol } from '../../smo/data/measureModifiers';
import { SmoMeasure } from '../../smo/data/measure';
import { reverseStaticMap } from '../../smo/data/common';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { getButtonsFcn, SuiButtonArrayComponent, SuiButtonArrayParameters } from './components/buttonArray';
import { SuiDialogNotifier, SuiBaseComponentParams } from './components/baseComponent';
import { DialogButtonDefinition, DialogButtonState } from '../buttons/button';
import { replaceVueRoot, modalContainerId } from '../common';
import measureEndingsApp from '../components/dialogs/measureEndings.vue';
import { reactive } from 'vue';

export const SuiEndingsDialogVue = (parameters: SuiDialogParams) => {
  parameters.view.groupUndo(true);
  let repeatSymbolCode = '';
  const startRestStateTest = (measure: SmoMeasure, barline: number): boolean=> {
    const cur = measure.getStartBarline();
    return cur.barline === barline;
  }
  const endRestStateTest = (measure: SmoMeasure, barline: number): boolean=> {
    const cur = measure.getEndBarline();
    return cur.barline === barline;
  }
  const repeatRestStateTest = (measure: SmoMeasure, symbol: number): boolean=> {
    const cur = measure.getRepeatSymbol();
    if (cur && cur.symbol === symbol) {
      return true;
    }
    return false;
  }
  const testBarlineState = (func: (measure: SmoMeasure, barline: number) => boolean, barline: number): DialogButtonState => {    
    const selections = SmoSelection.getMeasureList(parameters.view.tracker.selections);
    let anySelected = false;
    let allSelected = true;
    for (let i = 0; i < selections.length; ++i) {
      const measure = selections[i].measure;
      if (func(measure, barline)) {
        anySelected = true;
      } else {
        allSelected = false;
      }
    }
    if (allSelected) {
      return 'selected';
    }
    if (anySelected) {
      return 'partiallySelected';
    }
    return 'unselected';
  }
  const startBarlineState = (barline: number) =>  testBarlineState(startRestStateTest, barline);
  const endBarlineState = (barline: number) =>  testBarlineState(endRestStateTest, barline);
  const repeatSymbolState = (symbol: number) =>  testBarlineState(repeatRestStateTest, symbol);
  const startEndingCb = async (button: DialogButtonDefinition) => {
    const value = button.id;
    if (button.state === 'selected') {
      return;
    }
    for (let i = 0; i < startEndings.length; ++i) {
      const btn = startEndings[i];
      if (btn.id !== value) {
        btn.state = 'unselected';
      } else {
        btn.state = 'selected';
        await parameters.view.setBarline(SmoBarline.positions.start, SmoBarline.barlines[btn.id]);
      }
    }
  }
  const endEndingCb = async (button: DialogButtonDefinition) => {
    const value = button.id;
    if (button.state === 'selected') {
      return;
    }
    for (let i = 0; i < endEndings.length; ++i) {
      const btn = endEndings[i];
      if (btn.id !== value) {
        btn.state = 'unselected';
      } else {
        btn.state = 'selected';
        await parameters.view.setBarline(SmoBarline.positions.end, SmoBarline.barlines[btn.id]);
      }
    }
  }
  const repeatSymbolCb = async (button: DialogButtonDefinition) => {
    repeatSymbolCode = button.id;
    const value = repeatSymbolCode;
    if (button.state === 'selected') {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.None);
      button.state = 'unselected';
      return;
    }
    button.state = 'selected';
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.Coda) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.Coda);
    }
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.ToCoda) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.ToCoda);
    }
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.Segno) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.Segno);
    }
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.DsAlCoda) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.DsAlCoda);
    }
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.DcAlCoda) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.DcAlCoda);
    }
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.DsAlFine) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.DsAlFine);
    }
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.DcAlFine) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.DcAlFine);
    }
    if (SmoRepeatSymbol.symbols[value] === SmoRepeatSymbol.symbols.Fine) {
      parameters.view.setRepeatSymbol(SmoRepeatSymbol.positions.end, SmoRepeatSymbol.symbols.Fine);
    }
  }
  const endEndings: DialogButtonDefinition[] = reactive([{
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4 icon-end_rpt',
    id: 'endRepeat',
    label: 'end repeat',
    callback: endEndingCb,
    group: 'endEndings',
    state: endBarlineState(SmoBarline.barlines.endRepeat),
  },{
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4',
    id: 'noBar',
    label: 'no barline',
    callback: endEndingCb,
    group: 'endEndings',
    state: endBarlineState(SmoBarline.barlines.noBar),
  }, {
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4 icon-single_bar',
    id: 'singleBar',
    label: 'single bar',
    callback: endEndingCb,
    group: 'endEndings',
    state: endBarlineState(SmoBarline.barlines.singleBar),
  },{
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4 icon-end_bar',
    id: 'doubleBar',
    label: 'double barline',
    callback: endEndingCb,
    group: 'endEndings',
    state: endBarlineState(SmoBarline.barlines.doubleBar),
  }, {
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4 icon-end_bar',
    id: 'endBar',
    label: 'end barline',
    callback: endEndingCb,
    group: 'endEndings',
    state: endBarlineState(SmoBarline.barlines.endBar),
  }]);

  const startEndings: DialogButtonDefinition[] = reactive([{
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4 icon-start_rpt',
    id: 'startRepeat',
    label: 'start repeat',
    callback: startEndingCb,
    group: 'startEndings',
    state: startBarlineState(SmoBarline.barlines.startRepeat),
  },
  {
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4',
    id: 'noBar',
    label: 'no barline',
    callback: startEndingCb,
    group: 'startEndings',
    state: startBarlineState(SmoBarline.barlines.noBar),
  }, {
    classes: 'icon collapseParent button-array',
    icon: 'icon-smo fs-4 icon-single_bar',
    id: 'singleBar',
    label: 'single bar',
    callback: startEndingCb,
    group: 'startEndings',
    state: startBarlineState(SmoBarline.barlines.singleBar),
  }]);
  const repeatLandmarks: DialogButtonDefinition[] =  reactive([
    {
      classes: 'icon collapseParent button-array repetext',
      icon: '',
      id: 'DcAlCoda',
      label: 'DC Al Coda',
      callback: repeatSymbolCb,
      group: 'repeatLandmarks',
      state: repeatSymbolState(SmoRepeatSymbol.symbols.DcAlCoda),
    }, {
      classes: 'icon collapseParent button-array repetext',
      icon: '',
      id: 'DsAlCoda',
      label: 'DS Al Coda',
      callback: repeatSymbolCb,
      group: 'repeatLandmarks',
      state: repeatSymbolState(SmoRepeatSymbol.symbols.DsAlCoda),
    }, {
      classes: 'icon collapseParent button-array repetext',
      icon: '',
      id: 'ToCoda',
      label: 'to Coda',
      callback: repeatSymbolCb,
      group: 'repeatLandmarks',
      state: repeatSymbolState(SmoRepeatSymbol.symbols.ToCoda),
    }]);
  const repeatText: DialogButtonDefinition[] = reactive([{
        classes: 'icon collapseParent button-array repetext',
        icon: '',
        id: 'DcAlFine',
        label: 'DC Al Fine',
        callback: repeatSymbolCb,
        group: 'repeatText',
        state: repeatSymbolState(SmoRepeatSymbol.symbols.DcAlFine),
      }, {
        classes: 'icon collapseParent button-array repetext',
        icon: '',
        id: 'DsAlFine',
        label: 'DS Al Fine',
        callback: repeatSymbolCb,
        group: 'repeatText',
        state: repeatSymbolState(SmoRepeatSymbol.symbols.DsAlFine),
      }, {
        classes: 'icon collapseParent button-array repetext',
        icon: '',
        id: 'Fine',
        label: 'Fine',
        callback: repeatSymbolCb,
        group: 'repeatText',
        state: repeatSymbolState(SmoRepeatSymbol.symbols.Fine),
      }]);
  const repeatSymbols: DialogButtonDefinition[] = reactive([
    {
        classes: 'icon collapseParent button-array',
        icon: 'icon-bravura icon-segno fs-4 top-1',
        id: 'Segno',
        label: 'Segno',
        callback: repeatSymbolCb,
        group: 'repeatSymbols',
        state: repeatSymbolState(SmoRepeatSymbol.symbols.Fine),
      },
      {
        icon: 'icon-bravura icon-coda fs-4 top-1',
        classes: 'icon collapseParent button-array',
        callback: repeatSymbolCb,
        group: 'repeatSymbols',
        state: repeatSymbolState(SmoRepeatSymbol.symbols.Coda),
        label: 'Coda',
        id: 'Coda'
      }
  ]);
    const rootId = replaceVueRoot(modalContainerId);
    const commitCb = async() => {

    }
    const cancelCb = async() => {
      parameters.view.undo();
    }
    const appParams = {
      domId: rootId,
      label: 'Measure Endings',
      startEndings,
      endEndings,
      repeatSymbols,
      repeatLandmarks,
      repeatText,
    }
    InstallDialog({
      root: rootId,
      app: measureEndingsApp,
      dialogParams: parameters,
      appParams,
      commitCb,
      cancelCb
    })
  }
