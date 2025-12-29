<script setup lang="ts">
import { draggableSession } from '../../composable/draggable';
import dialogContainer from './dialogContainer.vue';
import numberInputApp from './numberInput.vue';
import { ref, Ref, reactive, watch } from 'vue';
interface Props {
  domId: string,
  label: string,
  getTranspose: () => Ref<number>,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
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
</script>
<template>
  <dialogContainer :domId="domId" :label="label" :commitCb="props.commitCb" :cancelCb="props.cancelCb">
      <div class="row mb-2 ms-2">
        <div class="col col-9 pe-0 me-n2">
          <numberInputApp :domId="getId('page-width-input')" :initialValue="transposeIndex" :precision="0"
            :changeCb="xposeCb" :disabled="false"/>
        </div>
        <div class="col col-3 text-start ps-0 pe-0 ms-n4">
          <label class="form-label" :for="getId('page-width-input-text')">Semitones</label>
        </div>
      </div>
  </dialogContainer>
</template>