// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoArpeggio, isArpeggioType } from '../../smo/data/noteModifiers';
import { InstallDialog, SuiDialogParams } from './dialog';
import { default as arpDialog } from '../components/dialogs/arpeggio.vue';
import { replaceVueRoot, modalContainerId } from '../common';
import { Ref, ref } from 'vue';

export const SuiArpeggioDialog = (parameters: SuiDialogParams) => {
  const enable: Ref<boolean> = ref(false);
  let arpeggio = new SmoArpeggio({ type: 'none' });
  let backup = new SmoArpeggio({ type: 'none' });
  const selections = parameters.view.tracker.selections;
  if (selections.length && selections[0].note) {
    if (selections[0].note.arpeggio) {
      arpeggio = new SmoArpeggio({ type: selections[0].note.arpeggio.typeString });
    }
    backup = new SmoArpeggio({ type: arpeggio.typeString });
  }
  const commitCb = async () => {
  }
  const cancelCb = async () => {    
    await parameters.view.addRemoveArpeggio(backup.typeString);
  }
  const arpCb = async (value: string) =>{    if (isArpeggioType(value)) {
      parameters.view.addRemoveArpeggio(value);
      arpeggio = new SmoArpeggio({ type: value });
      enable.value = (backup.typeString !== arpeggio.typeString);
    }
  }
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = { arpCb, initialValue: arpeggio.typeString, domId: rootId, enable };
  InstallDialog({
    root: rootId,
    app: arpDialog,
    appParams,
    dialogParams: parameters,
    commitCb,
    cancelCb
  });
}
