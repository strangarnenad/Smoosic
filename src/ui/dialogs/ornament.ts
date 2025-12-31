// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SuiDialogParams, InstallDialog } from './dialog';
import { SmoOrnament } from '../../smo/data/noteModifiers';
import { default as ornamentApp } from '../components/dialogs/ornaments.vue';
import { replaceVueRoot, modalContainerId } from '../common';
import { DialogButtonDefinition } from '../buttons/button';
import { reactive } from 'vue';

export const SuiOrnamentDialogVue = (parameters: SuiDialogParams) => {
  const rootId = replaceVueRoot(modalContainerId);
  
  const setForAll: Record<string, number> = {};
  let notesCount = 0;
  parameters.view.tracker.selections.forEach((sel) => {
    const ornaments = sel.note!.getOrnaments();
    notesCount += 1;
    ornaments.forEach((ornament) => {
      if (!setForAll[ornament.ornament]) {
        setForAll[ornament.ornament] = 0;
      }
      setForAll[ornament.ornament] = setForAll[ornament.ornament] + 1;
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
  const ornamentCb = async (button: DialogButtonDefinition) => {
    transitionButtonState(button);
    const code = SmoOrnament.ornaments[button.id];
    await parameters.view.toggleArticulation(code, 'SmoOrnament');
  }  

  const basic: DialogButtonDefinition[] = reactive([{
    classes: '',
    icon: 'icon-bravura icon-ornamentShortTrill',
    id: 'mordent',
    hotkey: '',
    label: 'Mordent Inverted',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
  },{
    classes: '',
    icon: 'icon-bravura icon-ornamentMordent',
    id: 'mordent_inverted',
    hotkey: '',
    label: 'Mordent',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
  },{
    classes: '',
    icon: 'icon-bravura icon-ornamentPrecompTrillSuffixDandrieu',
    id: 'prallup',
    hotkey: '',
    label: 'Prall Up Trill',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
  },{
    classes: '',
    icon: 'icon-bravura icon-ornamentPrecompTrillLowerSuffix',
    id: 'pralldown',
    hotkey: '',
    label: 'Prall Down Trill',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
  }, {
    classes: '',
    icon: 'icon-bravura icon-ornamentTrill',
    id: 'trill',
    hotkey: '',
    label: 'Trill',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
  }, {
    classes: '',
    icon: 'icon-bravura icon-ornamentTurn',
    id: 'turn',
    hotkey: '',
    label: 'Turn',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
  }, {
    classes: '',
    icon: 'icon-bravura icon-ornamentTurnSlash',
    id: 'turn_inverted',
    hotkey: '',
    label: 'Turn Inverted',
    callback: ornamentCb,
    state: 'unselected', 
    group: 'basic'
  }, {
    classes: '',
    icon: 'icon-bravura icon-breathMarkComma',
    id: 'breath',
    hotkey: '',
    label: 'Breath Mark',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
  },   {
    classes: '',
    icon: 'icon-bravura icon-caesura',
    id: 'caesura',
    hotkey: '',
    label: 'Caesura',
    callback: ornamentCb,
    state: 'unselected',
    group: 'basic'
    }
  ]);
  const jazz: DialogButtonDefinition[] =reactive([{
    classes: '',
    icon: 'icon-bravura icon-brassScoop',
    id: 'scoop',
    hotkey: '',
    label: 'Scoop',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }, {
    classes: '',
    icon: 'icon-bravura icon-brassFallLipShort',
    id: 'fall',
    hotkey: '',
    label: 'Drop',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }, {
    classes: '',
    icon: 'icon-bravura icon-brassFallRoughMedium fs-4',
    id: 'fallLong',
    hotkey: '',
    label: 'Long Drop',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }, {
    classes: '',
    icon: 'icon-bravura icon-brassDoitMedium',
    id: 'doit',
    hotkey: '',
    label: 'Doit',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  },{
    classes: '',
    icon: 'icon-bravura icon-brassLiftMedium fs-4',
    id: 'doitLong',
    hotkey: '',
    label: 'Lift/Long Doit',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  },{
    classes: '',
    icon: 'icon-bravura icon-brassFlip',
    id: 'flip',
    hotkey: '',
    label: 'Flip',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }, {
    classes: '',
    icon: 'icon-bravura icon-brassSmear',
    id: 'smear',
    hotkey: '',
    label: 'Smear',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }, {
    classes: '',
    icon: 'icon-bravura icon-brassMuteClosed',
    id: 'plungerClosed',
    hotkey: '',
    label: 'Brass Mute Closed',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }, {
    classes: '',
    icon: 'icon-bravura icon-brassMuteOpen',
    id: 'plungerOpen',
    hotkey: '',
    label: 'Brass Mute Open',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }, {
    classes: '',
    icon: 'icon-bravura icon-brassBend',
    id: 'bend',
    hotkey: '',
    label: 'Brass Bend',
    callback: ornamentCb,
    state: 'unselected',
    group: 'jazz'
  }]);
  keys.forEach((key) => {
    if (setForAll[key] === notesCount) {
      let btnId = basic.find((btn) => btn.id === key);
      if (!btnId) {
        btnId = jazz.find((btn) => btn.id === key);
      }
      if (btnId) {
        btnId.state = 'selected';
      }
    } else {
      let btnId = basic.find((btn) => btn.id === key);
      if (!btnId) {
        btnId = jazz.find((btn) => btn.id === key);
      }
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
  const appParams = {  domId: rootId,
    basic,
    jazz
  };

  InstallDialog({root: rootId, app: ornamentApp, appParams, dialogParams: parameters, commitCb, cancelCb });
}
