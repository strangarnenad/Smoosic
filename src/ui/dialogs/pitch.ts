import { IsPitchLetter } from '../../smo/data/common';
import { SuiDialogParams, InstallDialog } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import { DialogButtonDefinition } from '../buttons/button';
import { reactive } from 'vue';
import pitchApp from '../components/dialogs/pitch.vue';

export const SuiPitchDialogVue = (parameters: SuiDialogParams) => {
  const intervalUp = ['chordsecond', 'chordthird', 'chordfourth', 'chordfifth', 'chordsixth', 'chordseventh', 'chordoctave'];
  const intervalDown = ['downchordsecond', 'downchordthird', 'downchordfourth', 'downchordfifth', 'downchordsixth',
     'downchordseventh', 'downchordoctave'];
  const rootId = replaceVueRoot(modalContainerId);

  const intervalCb = async (button: DialogButtonDefinition) => {
    const intervalUpIx = intervalUp.findIndex((xx) => xx === button.id);
    const intervalDownIx = intervalDown.findIndex((xx) => xx === button.id);
    if (intervalUpIx >= 0) {
      await parameters.view.setInterval(intervalUpIx + 1);
    }
    if (intervalDownIx >= 0) {
      await parameters.view.setInterval((intervalDownIx + 1) * -1);
    }
  }
  const pitchCb = async (button: DialogButtonDefinition): Promise<void> => {
    const value = button.id;
    if (value === 'upOctave') {
      await parameters.view.transposeSelections(12);
    }
    if (value === 'downOctave') {
      await parameters.view.transposeSelections(-12);
    }
    if (value === 'upStep') {
      await parameters.view.transposeSelections(1);
    }
    if (value === 'downStep') {
      await parameters.view.transposeSelections(-1);
    }
    if (value === 'toggleEnharmonic') {
      await parameters.view.toggleEnharmonic();  
    }
    if (value === 'toggleCourtesy') {
      await parameters.view.toggleCourtesyAccidentals();
    }
  }
  const letterCb = async (button: DialogButtonDefinition): Promise<void> => {
    const value = button.id[button.id.length - 1].toLowerCase();
    if (IsPitchLetter(value)) {
      await parameters.view.setPitch(value);
    }
  }
  const pitches: DialogButtonDefinition[] = reactive([{
    classes: '',
    icon: 'icon-bravura icon-ottavaAlta fs-3',
    id: 'upOctave',
    hotkey: '+',
    label: '8va Up',
    callback: pitchCb,
    state: 'unselected',
    group: 'Pitches'
  }, {
    classes: '',
    icon: 'icon-bravura icon-ottavaBassa fs-3',
    id: 'downOctave',
    hotkey: '_',
    label: '8va Down',
    callback: pitchCb,
    state: 'unselected',
    group: 'Pitches'
  },{
    classes: '',
    icon: 'icon-bravura icon-accidentalSharp fs-3',
    id: 'upStep',
    hotkey: '=',
    label: '1/2 step Up',
    callback: pitchCb,
    state: 'unselected',
    group: 'Pitches'
  },{
    classes: '',
    icon: 'icon-bravura icon-accidentalFlat fs-3',
    id: 'downStep',
    hotkey: '-',
    label: '1/2 step Down',
    callback: pitchCb,
    state: 'unselected',
    group: 'Pitches'
  },{
    classes: '',
    icon: 'icon-smo icon-accident fs-4',
    id: 'toggleEnharmonic',
    hotkey: 'Shift-E',
    label: 'Select a different spelling of the pitch',
    callback: pitchCb,
    state: 'unselected',
    group: 'Pitches'
  },{
    classes: '',
    icon: 'icon-smo icon-courtesy fs-4',
    id: 'toggleCourtesy',
    hotkey: 'Shift-F',
    label: 'Courtesy accidental',
    callback: pitchCb,
    state: 'unselected',
    group: 'Pitches'
  }
  ]);
  const intervals: DialogButtonDefinition[] = reactive([ {
    classes: '',
    icon: '',
    id: 'chordsecond',
    hotkey: '2',
    label: '2nd',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'chordthird',
    hotkey: '3',
    label: '3rd',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'chordfourth',
    hotkey: '4',
    label: '4th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'chordfifth',
    hotkey: '5',
    label: '5th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'chordsixth',
    hotkey: '6',
    label: '6th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'chordseventh',
    hotkey: '7',
    label: '7th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'chordoctave',
    hotkey: '8',
    label: '8va',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  }, {
    classes: '',
    icon: '',
    id: 'downchordsecond',
    hotkey: '@',
    label: 'Down 2nd',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'downchordthird',
    hotkey: '#',
    label: 'Down 3rd',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'downchordfourth',
    hotkey: '$',
    label: 'Down 4th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'downchordfifth',
    hotkey: '%',
    label: 'Down 5th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'downchordsixth',
    hotkey: '^',
    label: 'Down 6th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'downchordseventh',
    hotkey: '&',
    label: 'Down 7th',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  },{
    classes: '',
    icon: '',
    id: 'downchordoctave',
    hotkey: '*',
    label: 'Down 8va',
    callback: intervalCb,
    state: 'unselected',
    group: 'Intervals'
  }]);
  const letters: DialogButtonDefinition[] = reactive([{
    classes: '',
    icon: '',
    id: 'pitchA',
    hotkey: 'A',
    label: 'A',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',
    icon: '',
    id: 'pitchB',
    hotkey: 'B',
    label: 'B',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  },
  {
    classes: '',
    icon: '',
    id: 'pitchC',
    hotkey: 'C',
    label: 'C',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',
    icon: '',
    id: 'pitchD',
    hotkey: 'D',
    label: 'D',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',

    icon: '',
    id: 'pitchE',
    hotkey: 'E',
    label: 'E',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',
    icon: '',
    id: 'pitchF',
    hotkey: 'F',
    label: 'F',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',
    icon: '',
    id: 'pitchG',
    hotkey: 'G',
    label: 'G',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }  
  ]);
  const cursor: DialogButtonDefinition[] = reactive([{
    classes: '',
    icon: '',
    id: 'moveRight',
    hotkey: '\u2192',
    label: 'Advance cursor',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',
    icon: '',
    id: 'growRight',
    hotkey: 'Shift \u2192',
    label: 'Grow selection',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',
    icon: '',
    id: 'moveLeft',
    hotkey: '\u2190',
    label: 'Cursor Left',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }, {
    classes: '',
    icon: '',
    id: 'moveLeft',
    hotkey: 'Shift \u2190',
    label: 'Grow Left',
    callback: letterCb,
    state: 'unselected',
    group: 'Letters'
  }]);
  parameters.view.tracker.moveSelectionRight();
  // Undo on cancel for any changes made
  parameters.view.groupUndo(true);
  const commitCb = async () => {
  }
  const cancelCb = async () => {
    await parameters.view.undo();
  }
  const appParams = {
    domId: rootId,
    pitches, pitchCb, letters, letterCb, intervals, intervalCb
  };

  InstallDialog({ root: rootId, app: pitchApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
