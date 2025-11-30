<script setup lang="ts">
import { DialogButtonState, DialogButtonDefinition, DialogButtonCallback } from '../../buttons/button';
interface Props {
  label: string,
  buttonDefs: DialogButtonDefinition[],
  commonClasses: string,
  domId: string
}
const props = defineProps<Props>();
const { buttonDefs, domId } = { ...props };
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
  <label class="align-self-center text-end col-2">{{ label }}</label>
  <div class="btn-toolbar dialog-button-group col-6" role="group" :id="domId">
    <button v-for="btnDef in buttonDefs" 
      data-bs-toggle="button"
      :key="btnDef.id" 
      :id="getId(btnDef.id)" 
      :class="getClasses(btnDef)"
      :aria-pressed="ariaPressed(btnDef)"
      :aria-label="btnDef.label"      
      @click.prevent="btnDef.callback(btnDef)">
      <span :class="getIconClasses(btnDef)"></span>
      <span v-if="btnDef.hotkey" class="ms-3">({{ btnDef.hotkey }})</span>
    </button>
  </div>
</template>