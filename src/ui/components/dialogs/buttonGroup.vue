<script setup lang="ts">
import { DialogButtonState, DialogButtonDefinition, DialogButtonCallback } from '../../buttons/button';
interface Props {
  label: string,
  buttonDefs: DialogButtonDefinition[],
  commonClasses: string,
  domId: string,
  rowClasses?:string
}
const props = defineProps<Props>();
const { buttonDefs, domId } = { ...props };
const rowClasses = props.rowClasses ?? 'row mb-3 align-items-center';
const getId = (str: string) => `${domId}-${str}`;
const getClasses = (button: DialogButtonDefinition) => {
  let rv = button.classes + ' ' + props.commonClasses;
  if (button.state === 'selected' || button.state === 'partiallySelected') {
    rv += ' active';
  }
  return rv;
}
const getIconClasses = (button: DialogButtonDefinition) => {
  let rv = button.icon + ' ';
  if (button.hotkey) {
    rv += ' me-3';
  }
  return rv;
}
const ariaPressed = (button: DialogButtonDefinition) => {
  if (button.state === 'selected') {
    return 'true';
  } else if (button.state === 'partiallySelected') {
    return 'mixed';
  }
  return 'false';
}
</script>
<template>
  <div :class="rowClasses">
    <div class="col col-2">
      <span  v-if="label.length" class="float-end">{{ label }}</span>
    </div>
    <div class="col col-10">
      <div class="btn-toolbar dialog-button-group float-start" role="group" :id="domId">
        <button v-for="btnDef in buttonDefs" data-bs-toggle="button" :key="btnDef.id" :id="getId(btnDef.id)"
          :class="getClasses(btnDef)" :aria-pressed="ariaPressed(btnDef)" :aria-label="btnDef.label"
          @click.prevent="btnDef.callback(btnDef)">
          
          <span v-if="btnDef.icon.length" :class="getIconClasses(btnDef)"></span>
          <span v-if="btnDef.hotkey" class="font-monospace" :class="{ 'ms-1': btnDef.icon.length > 0 }">{{ btnDef.hotkey }}</span>
        </button>
      </div>
    </div>
  </div>
</template>