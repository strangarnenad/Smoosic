// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { DialogDefinition, SuiDialogParams, InstallDialog } from './dialog';
import { SmoSystemGroup } from '../../smo/data/scoreModifiers';
import { SmoSelection } from '../../smo/xform/selections';
import { SuiScoreViewOperations } from '../../render/sui/scoreViewOperations';
import { SuiComponentAdapter, SuiDialogAdapterBase } from './adapter';
import { PromiseHelpers } from '../../common/promiseHelpers';
import { replaceVueRoot, modalContainerId } from '../common';
import { reactive, createApp } from 'vue';
import staffGroupsComp from '../components/dialogs/staffGroups.vue';

declare var $: any;
export const SuiStaffGroupDialogVue = (parameters: SuiDialogParams) => {
  const rootId = replaceVueRoot(modalContainerId);
  const selection = parameters.view.tracker.selections[0];
  const score = parameters.view.score;
  let changed = false;
  const staffGroups: SmoSystemGroup[] = reactive([]);
  const populateGroups = () => {
    staffGroups.splice(0);
    for (let i = 0; i < parameters.view.score.staves.length; ++i) {
      const sel = SmoSelection.measureSelection(
        score,
        i,
        selection.selector.measure);
      if (sel) {
        const group = score.getSystemGroupForStaff(sel);
        if (group && group.startSelector.staff === i) {
          staffGroups.push(group);
        } 
      }  
    }
  }
  populateGroups();
  const setConnectorCb = async (staffId: number, connectorId: string) => {
    const conn = parseInt(connectorId, 10);
    const sg = score.getSystemGroupForStaffId(staffId);
    if (sg) {
      sg.leftConnector = conn;
      parameters.view.addOrUpdateStaffGroup(sg);
      await parameters.view.updatePromise();
    }
    await parameters.view.refreshViewport();
    changed = true;
    populateGroups();
  }
  const removeFromGroupCb = async (staffId: number) => {
    const sg = score.getSystemGroupForStaffId(staffId);
    if (sg) {
      if (sg.startSelector.staff < staffId) {
        sg.endSelector.staff = staffId - 1;
        parameters.view.addOrUpdateStaffGroup(sg);
      } else {
        parameters.view.removeStaffGroup(sg);
      }
    }
    await parameters.view.refreshViewport();
    changed = true;
    populateGroups();
  }
  const addToGroupCb = async (staffId: number) => {
    const sg = score.getSystemGroupForStaffId(staffId - 1);
    if (sg) {
      sg.endSelector.staff = staffId;
      await parameters.view.addOrUpdateStaffGroup(sg);
    }
    await parameters.view.refreshViewport();
    changed = true;
    populateGroups();
  }
  const createStaffGroupCb = async (staffId: number) => {
    const params = SmoSystemGroup.defaults;
    params.startSelector.staff = staffId;
    params.endSelector.staff = staffId;
    await parameters.view.addOrUpdateStaffGroup(new SmoSystemGroup(params));
    await parameters.view.refreshViewport();
    changed = true;
    populateGroups();
  }
  const backup: SmoSystemGroup[] = [];
  staffGroups.forEach((sg) => {
    const group = new SmoSystemGroup(sg);
    backup.push(group);
  });
  const commitCb = async () => {
  }
  const cancelCb = async () => {
    if (!changed) {
      return;
    }
    await parameters.view.clearSystemGroups();
    for (let i = 0; i < backup.length; ++i) {
      await parameters.view.addOrUpdateStaffGroup(backup[i]);
    }
    await parameters.view.refreshViewport();
  }
  
  const appParams = { domId: rootId, staffGroups, label: "Staff Groups", 
    score, setConnectorCb, removeFromGroupCb, addToGroupCb, createStaffGroupCb };
  
  InstallDialog({
    root: rootId,
    app: staffGroupsComp,
    appParams,
    dialogParams: parameters,
    commitCb,
    cancelCb
  });
}
/**
 * Handle grouping of staves in the score, for brackets and also for vertical formatting
 * @category SuiDialog
 */
export class SuiStaffGroupDialogAdapter extends SuiComponentAdapter {
  staffGroup: SmoSystemGroup;
  constructor(view: SuiScoreViewOperations) {
    super(view);
    const selection = this.view.tracker.selections[0];
    // Reset the view so we can see all the staves
    this.view.viewAll();
    const staffGroup = this.view.score.getSystemGroupForStaff(selection);
    if (!staffGroup) {
      const params = SmoSystemGroup.defaults;
      params.startSelector = JSON.parse(JSON.stringify(selection.selector));
      params.endSelector = JSON.parse(JSON.stringify(selection.selector));
      this.staffGroup = new SmoSystemGroup(params);
    } else {
      this.staffGroup = staffGroup;
    }
  }
  async commit() {
    return PromiseHelpers.emptyPromise();
  }
  cancel() {
    return PromiseHelpers.emptyPromise();
  }
  get leftConnector() {
    return this.staffGroup.leftConnector;
  }
  set leftConnector(val: number) {
    this.staffGroup.leftConnector = val;
    this.view.addOrUpdateStaffGroup(this.staffGroup);
  }
  get staffGroups() {
    return this.staffGroup;
  }
  set staffGroups(val: SmoSystemGroup) {
    this.staffGroup = val;
    this.view.addOrUpdateStaffGroup(this.staffGroup);
  }
}
/**
 * A staff group is a grouping of staves that can be bracketed and justified
 * @category SuiDialog
 */
export class SuiStaffGroupDialog extends SuiDialogAdapterBase<SuiStaffGroupDialogAdapter> {
  static dialogElements: DialogDefinition = 
      {
        label: 'Staff Group', elements:
          [{
            smoName: 'staffGroups',
            control: 'StaffAddRemoveComponent',
            label: 'Staves in Group',
          }, {
            smoName: 'leftConnector',
            control: 'SuiDropdownComponent',
            dataType: 'int',
            label: 'Left Connector',
            options: [
              {
                value: SmoSystemGroup.connectorTypes.bracket,
                label: 'Bracket'
              }, {
                value: SmoSystemGroup.connectorTypes.brace,
                label: 'Brace'
              }, {
                value: SmoSystemGroup.connectorTypes.single,
                label: 'Single'
              }, {
                value: SmoSystemGroup.connectorTypes.double,
                label: 'Double'
              }]
          }],
        staticText: [
          { includeStaff: 'Include Staff' }
        ]
      };
  static createAndDisplay(parameters: SuiDialogParams) {
    const dg = new SuiStaffGroupDialog(parameters);
    dg.display();
  }
  getModifier() {
    return this.adapter.staffGroups;
  }
  constructor(parameters: SuiDialogParams) {
    const adapter = new SuiStaffGroupDialogAdapter(parameters.view);
    super(SuiStaffGroupDialog.dialogElements, { adapter, ...parameters });
  }
}
