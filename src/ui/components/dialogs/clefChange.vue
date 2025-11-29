<script setup lang="ts">
import { ref, Ref } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';

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
const clefChange = ref(initialValue);
const clefChanges = [{
  label: 'Treble Clef Staff',
  value: 'treble'
}, {
  label: 'Bass Clef Staff',
  value: 'bass'
}, {
  label: 'Alto Clef Staff',
  value: 'alto'
}, {
  label: 'Tenor',
  value: 'tenor'
}, {
  label: 'Percussion',
  value: 'percussion'
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
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row">
        <h2 class="dialog-label">Clef Change</h2>
      </div>
      <div class="row align-items-baseline" :id="getId('clef-row')">
        <div class="col-md-6">
          <label :for="getId('clef-select')" class="form-label">Clef:</label>
        </div>
        <div class="col-md-6">
          <select :id="getId('clef-select')" v-model="clefChange" @change="clefChangeCb(clefChange)"
            class="form-control">
            <option v-for="clefChange in clefChanges" :key="clefChange.value" :value="clefChange.value">
              {{ clefChange.label }}
            </option>
          </select>
        </div>
      </div>
      <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>