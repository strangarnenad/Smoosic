<script setup lang="ts">
import { ref, Ref } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
interface ArpOption {
  value: string;
  text: string;
}
interface Props {
  domId: string,
  enable: Ref<boolean>,
  initialValue: string,
  arpCb: (value: string) => void,
  commitCb: () => void,
  cancelCb: () => void
}
const props: Props = defineProps<{
  domId: string,
  enable: Ref<boolean>,
  initialValue: string,
  arpCb: (value: string) => void,
  commitCb: () => void,
  cancelCb: () => void
}>();
const domId: string = props.domId;
const { arpCb, enable, initialValue, commitCb, cancelCb } = { ...props };
const top = ref(100);
const left = ref(100);
const getCoordsCb = (): { topRef: Ref<number>, leftRef: Ref<number> }=> {
  return { topRef: top, leftRef: left };
}
const arpValue = ref(initialValue);
const arpValues: ArpOption[] = [{
  value: 'directionless',
  text: 'Plain'
}, {
  value: 'rasquedo_up',
  text: 'Rasquedo Up'
}, {
  value: 'rasquedo_down',
  text: 'Rasquedo Down'
}, {
  value: 'roll_up',
  text: 'Roll Up'
}, {
  value: 'roll_down',
  text: 'Roll Down'
}, {
  value: 'brush_up',
  text: 'Brush Up'
}, {
  value: 'brush_down',
  text: 'Brush Down'
}, {
  value: 'none',
  text: 'None'
}];
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const getLocString = () => {
  return `top: ${top}px; left: ${left}px;`;
}
/* return {
  enable, arpCb, commitCb, cancelCb, getDomId, getId, getLocString,
  domId, top, left, arpValue, arpValues
};*/

</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row">
        <h2 class="dialog-label">Arpeggio</h2>
      </div>
      <div class="row align-items-baseline" :id="getId('arp-row')">
        <div class="col-md-6">
          <label :for="getId('arp-select')" class="form-label">Type:</label>
        </div>
        <div class="col-md-6">
          <select :id="getId('arp-select')" v-model="arpValue" @change="arpCb(arpValue)" class="form-control">
            <option v-for="option in arpValues" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>