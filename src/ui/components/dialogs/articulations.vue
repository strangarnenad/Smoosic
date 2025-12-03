<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import { ref, Ref } from 'vue';
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
const positions = [
  { label: 'Above Note', value: 'above' },
  { label: 'Below Note', value: 'below' },
  { label: 'Auto', value: 'auto' }
];
const top = ref(100);
const left = ref(100);
const getCoordsCb = (): { topRef: Ref<number>, leftRef: Ref<number> } => {
  return { topRef: top, leftRef: left };
}
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const getLocString = () => {
  return `top: ${top.value}px; left: ${left.value}px;`;
}
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="text-center" :id="getId('modal-content')">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row mb-3">
        <h2 class="dialog-label">Ornaments</h2>
      </div>
      <div class="row mb-3">
        <buttonGroup :label="'Glyph'" :buttonDefs="articulations" :domId="getId('shape-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark'" />
      </div>
      <div class="col-md-6">

        <select :id="getId('clef-select')" v-model="positions" @change="positionChangeCb(position)"
          class="form-control">
          <option v-for="position in positions" :key="position.value" :value="position.value">
            {{ position.label }}
          </option>
        </select>
      </div>
      <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>