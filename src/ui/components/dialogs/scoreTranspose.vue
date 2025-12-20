<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { draggableSession } from '../../composable/draggable';

import numberInputApp from './numberInput.vue';
import { ref, Ref, reactive, watch } from 'vue';
interface Props {
  domId: string,
  label: string,
  getTranspose: () => Ref<number>,
  commitCb: () => void,
  cancelCb: () => void
};
const props = defineProps<Props>();

const { domId, getTranspose } = { ...props };

const transposeIndex: Ref<number> = getTranspose();
const xposeCb = async (val: number) => {
  transposeIndex.value = val;
};
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
    <div class="text-center" :id="getId('modal-content')">
      <draggableComp :draggableSession="draggable" />
      <div class="row mb-2">
        <h2 class="dialog-label">{{ label }}</h2>
      </div>
      <div class="row mb-2 ms-2">
        <div class="col col-9 pe-0 me-n2">
          <numberInputApp :domId="getId('page-width-input')" :initialValue="transposeIndex" :precision="0"
            :changeCb="xposeCb" :disabled="false"/>
        </div>
        <div class="col col-3 text-start ps-0 pe-0 ms-n4">
          <label class="form-label" :for="getId('page-width-input-text')">Semitones</label>
        </div>
      </div>
      <DialogButtons :enable="true" :commitCb="props.commitCb" :cancelCb="props.cancelCb" />
    </div>
  </div>
</template>