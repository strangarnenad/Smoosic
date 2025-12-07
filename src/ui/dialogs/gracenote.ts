import { SuiDialogParams, InstallDialog } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import graceNotes from '../components/dialogs/graceNotes.vue';

  export const SuiGraceNoteDialog = (parameters: SuiDialogParams) =>{
    const addGraceNoteCb = async () => {
      await parameters.view.addGraceNote();
    }
    const removeGraceNoteCb = async () => {
      await parameters.view.removeGraceNote();
    }
    const slashGraceNoteCb = async () => {
      await parameters.view.slashGraceNotes();
    }
    const commitCb = async () => {
    }
    const cancelCb = async () => {    
      await parameters.view.undo();
    }
    const rootId = replaceVueRoot(modalContainerId);
    const appParams = { addGraceNoteCb, removeGraceNoteCb, slashGraceNoteCb, domId: rootId };
  InstallDialog({
    root: rootId,
    app: graceNotes,
    appParams,
    dialogParams: parameters,
    commitCb,
    cancelCb
  });

  }
