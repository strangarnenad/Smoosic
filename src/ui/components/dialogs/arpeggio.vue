<script setup lang="ts">
import { ref, Ref } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { SelectOption } from '../../common';
import selectComp from './select.vue';

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
const arpValues: SelectOption[] = [{
  value: 'directionless',
  label: 'Plain'
}, {
  value: 'rasquedo_up',
  label: 'Rasquedo Up'
}, {
  value: 'rasquedo_down',
  label: 'Rasquedo Down'
}, {
  value: 'roll_up',
  label: 'Roll Up'
}, {
  value: 'roll_down',
  label: 'Roll Down'
}, {
  value: 'brush_up',
  label: 'Brush Up'
}, {
  value: 'brush_down',
  label: 'Brush Down'
}, {
  value: 'none',
  label: 'None'
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
        <div class="col col-2 float-end pe-0">
          <label :for="getId('arp-select')" class="form-label">Type:</label>
        </div>
        <div class="col col-10 text-start">
          <selectComp :domId="getId('arp-select')" label="Select" :initialValue="initialValue"
            :selections="arpValues" :changeCb="arpCb" />
        </div>
      </div>
      <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>