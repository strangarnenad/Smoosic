<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import { ref, Ref } from 'vue';
interface Props {
  domId: string,
  shapes: DialogButtonDefinition[],
  heads: DialogButtonDefinition[],
  stems: DialogButtonDefinition[],
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, shapes, heads, stems, commitCb, cancelCb } = { ...props };
const enable = ref(true);

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
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row mb-2">
        <h2 class="dialog-label">Note Heads and Stems</h2>
      </div>
      <div class="row mb-2">
        <buttonGroup :label="'Head Shapes'" :buttonDefs="shapes" :domId="getId('shape-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
      </div>
      <div class="row mb-2 col-8">
        <buttonGroup :label="'Heads'" :buttonDefs="heads" :domId="getId('head-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
      </div>
      <div class="row mb-2">
        <buttonGroup :label="'Note Stems'" :buttonDefs="stems" :domId="getId('stem-buttons')"
          :commonClasses="'btn btn-lg btn-outline-dark py-0  me-2'" />
      </div>
      <div class="row mb-2 border-top pt-2">
        <span class="text-muted">Use R to toggle note to rest. Use &lt;Delete&gt; to toggle visibility.</span>
      </div>
      <div class="row mb-2">
        <span class="text-muted">Use keyboard shortcuts when available - they are much faster!</span>
      </div>
    </div>
    <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
  </div>
</template>