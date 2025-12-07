<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import selectComp from './select.vue';
import { SelectOption } from '../../common';

interface Props2 {
  domId: string,
  enable: any,
  initialValue: string,
  clefChangeCb: (value: string) => void,
  commitCb: () => void,
  cancelCb: () => void
}
const props = defineProps<Props2>();
const { domId, clefChangeCb, enable, initialValue, commitCb, cancelCb } = { ...props };
const clefChange:Ref<string> = ref(initialValue);
const clefChanges:SelectOption[] = [{
  label: 'Treble Clef Staff',
  value: 'treble',
  icon: 'icon-bravura icon-gClef btn end-0'
}, {
  label: 'Bass Clef Staff',
  value: 'bass',
  icon: 'icon-bravura icon-fClef btn end-0'
}, {
  label: 'Alto Clef Staff',
  value: 'alto',
  icon: 'icon-bravura icon-cClef btn end-0'
}, {
  label: 'Tenor',
  value: 'tenor',
  icon: 'icon-bravura icon-gClef btn end-0'
}, {
  label: 'Percussion',
  value: 'percussion',
  icon: 'icon-bravura icon-unpitchedPercussionClef1 btn end-0'
}];
const top = ref(100);
const left = ref(100);
const getCoordsCb = (): { topRef: Ref<number>, leftRef: Ref<number> }=> {
  return { topRef: top, leftRef: left };
}
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const getLocString = () => {
  return `top: ${top}px; left: ${left}px;`;
}
const handleSelect = (option: string) => {  
  clefChange.value = option;
}
watch(clefChange, (newVal) => {
  clefChangeCb(newVal);
});
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row">
        <h2 class="dialog-label">Clef Change</h2>
      </div>
      <div class="row align-items-baseline" :id="getId('clef-row')">
        <div class="col-2 float-end">
          <label :for="getId('clef-select')" class="form-label">Clef:</label>
        </div>
        <div class="col-10 text-start">
          <selectComp :domId="getId('clef-select')" label="Clef" :initialValue="initialValue"
            :selections="clefChanges" :changeCb="handleSelect" />
        </div>
      </div>
      <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>