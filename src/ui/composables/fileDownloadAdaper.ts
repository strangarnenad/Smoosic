import { ref, Ref } from 'vue';
import { SuiComponentBase, SuiDialogNotifier, SuiComponentParent } from '.././dialogs/components/baseComponent';
import { SuiFileInput } from '.././fileio/fileInput';
declare var $: any;
/**
 * @category SuiDialog
 */
export interface SuiFileDownloadComponentParams {
  id: string,
  classes: string,
  type?: string,
  increment?: number,
  defaultValue: string,
  label: string,
  smoName: string,
  control: string
}
/**
 * Download a test file using the file input.
 * @category SuiDialog
 */
export const manageFileUploadSession = (dialogParam: SuiDialogNotifier, parameter: SuiFileDownloadComponentParams) => { 
  const defaultValue: string = '';
  const value: Ref<any> = ref(null);
  const dialog: SuiDialogNotifier = dialogParam;
  const isLoaded: Ref<boolean> = ref(false);

  const  _handleUploadedFiles = async (evt: any)  => {
    const localFile = new SuiFileInput(evt);
    await localFile.loadAsync();
    value.value = localFile.value;
    isLoaded.value = true;
    dialog.changed();
  }
  const getValue = () => {
    return value;
  }
  const setValue = (value: any) => {
    value.value = value;
  }
  const uploadCb = async (e: any) => {
    await _handleUploadedFiles(e);
  }
  return { uploadCb, setValue, getValue, defaultValue, isLoaded }
}