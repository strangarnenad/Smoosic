<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import { SelectOption } from '../../common';
import selectComp from './select.vue';
import { ref, Ref } from 'vue';
import { draggableSession } from '../../composable/draggable';

interface Props {
  domId: string,
  articulations: DialogButtonDefinition[],
  positionChangeCb: (value: string) => void,
  initialValue: string,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}

const props = defineProps<Props>();
const { domId, articulations, commitCb, cancelCb } = { ...props };
const enable = ref(true);
const position = ref(props.initialValue);
const positions: SelectOption[] = [
  { label: 'Above Note', value: 'above' },
  { label: 'Below Note', value: 'below' },
  { label: 'Auto', value: 'auto' }
];
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}

const draggable = draggableSession(getDomId());
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="draggable.getLocString()">
    <div class="text-center nw-30" :id="getId('modal-content')">
      <draggableComp :draggableSession="draggable" />
      <div class="row">
        <h2 class="dialog-label">Articulations</h2>
      </div>
      <div class="row w-40">
        <buttonGroup :label="'Glyph'" :buttonDefs="articulations" :domId="getId('shape-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
      </div>
      <div class="row align-items-center">
        <div class="col col-2 float-end pe-0">
          <span class="float-end" :for="getId('clef-select')">Position</span>
        </div>
        <div class="col col-4 text-start">
          <selectComp :domId="getId('art-select')" label="Select" :initialValue="initialValue"
            :selections="positions" :changeCb="positionChangeCb" />
        </div>
      </div>
      <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>