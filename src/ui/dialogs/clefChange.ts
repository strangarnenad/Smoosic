// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { SmoClefChange } from '../../smo/data/noteModifiers';
import { SmoNote } from '../../smo/data/note';
import { IsClef }from '../../smo/data/common';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { DialogDefinition, SuiDialogParams, InstallDialog } from './dialog';
import { default as clefChangeApp } from '../components/dialogs/clefChange.vue';
import { replaceVueRoot, modalContainerId } from '../common';
import { Ref, ref } from 'vue';

export const SuiClefChangeDialog = (parameters: SuiDialogParams) => {
    const enable: Ref<boolean> = ref(false);
    let clefChange = new SmoClefChange(SmoClefChange.defaults);
    let backup = new SmoClefChange(SmoClefChange.defaults);
    const selections = parameters.view.tracker.selections;
    if (selections.length && selections[0].note) {
      const smoNote = selections[0].note;
      if (selections[0].note.clefNote) {
        const params = SmoClefChange.defaults;
        params.clef = selections[0].note.clefNote.clef;
        clefChange = new SmoClefChange(params);
        backup = new SmoClefChange(params);
      } else if (IsClef(smoNote.clef)) {
        clefChange.clef = smoNote.clef;
        backup.clef = smoNote.clef;
      }
    }
      const commitCb = async () => {
      }
      const cancelCb = async () => {    
        await parameters.view.addRemoveClefChange(backup);
      }
      const clefChangeCb = async (value: string) =>{    
        if (IsClef(value)) {
          clefChange = new SmoClefChange({ clef: value });
          parameters.view.addRemoveClefChange(clefChange);
          enable.value = (backup.clef !== clefChange.clef);
        }
      }
      const rootId = replaceVueRoot(modalContainerId);
      const appParams = { clefChangeCb, initialValue: clefChange.clef, domId: rootId, enable };
      InstallDialog({
        root: rootId,
        app: clefChangeApp,
        appParams,
        dialogParams: parameters,
        commitCb,
        cancelCb
      });
    
};
