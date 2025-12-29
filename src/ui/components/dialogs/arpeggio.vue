<script setup lang="ts">
import { ref, Ref } from 'vue';
import { SelectOption } from '../../common';
import selectComp from './select.vue';
import dialogContainer from './dialogContainer.vue';

interface Props {
  domId: string,
  enable: Boolean,
  initialValue: string,
  arpCb: (value: string) => void,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props: Props = defineProps<{
  domId: string,
  enable: Boolean,
  initialValue: string,
  arpCb: (value: string) => void,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}>();

const domId: string = props.domId;
const { arpCb, enable, initialValue, commitCb, cancelCb } = { ...props };
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
const getId = (str: string) => {
  return `${domId}-${str}`;
}

/* return {
  enable, arpCb, commitCb, cancelCb, getDomId, getId, getLocString,
  domId, top, left, arpValue, arpValues
};*/

</script>
<template>
  <dialogContainer :domId="domId" label="Arpeggio" :commitCb="commitCb" :cancelCb="cancelCb" 
    :classes="'text-center container'" :enable="enable">
      <div class="row align-items-baseline" :id="getId('arp-row')">
        <div class="col col-2 float-end pe-0">
          <label :for="getId('arp-select')" class="form-label">Type:</label>
        </div>
        <div class="col col-10 text-start">
          <selectComp :domId="getId('arp-select')" label="Select" :initialValue="initialValue"
            :selections="arpValues" :changeCb="arpCb" />
        </div>
      </div>
    </dialogContainer>
</template>