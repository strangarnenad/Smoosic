<script setup lang="ts">
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import { ref, Ref } from 'vue';
import dialogContainer from './dialogContainer.vue';
interface Props {
  domId: string,
  accidentals: DialogButtonDefinition[],
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, accidentals, commitCb, cancelCb } = { ...props };
const enable = ref(true);

const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
</script>
<template>
  <dialogContainer :domId="domId" :label="'Microtones'" :commitCb="commitCb" :cancelCb="cancelCb">
    <div class="row nw-30">
      <buttonGroup :label="'Value'" :buttonDefs="accidentals" :domId="getId('shape-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
    </div>
  </dialogContainer>
</template>