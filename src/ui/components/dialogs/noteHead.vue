<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import collapsableText from './collapsableText.vue';
import { ref, Ref } from 'vue';
import { draggableSession } from '../../composable/draggable';
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

const lines:string[] = [];
lines.push('<span class="text-muted">Use R to toggle note to rest. Use &lt;Delete&gt; to toggle visibility.</span>');
lines.push('<span class="text-muted">Use keyboard shortcuts when available - they are much faster!</span>');
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
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :draggableSession="draggable" />
      <div class="row mb-2">
        <h2 class="dialog-label">Note Heads and Stems</h2>
      </div>
      <div class="row">
        <buttonGroup :label="'Head Shapes'" :buttonDefs="shapes" :domId="getId('shape-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
      </div>
      <div class="row nw-50">
        <buttonGroup :label="'Heads'" :buttonDefs="heads" :domId="getId('head-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
      </div>
      <div class="row ">
        <buttonGroup :label="'Note Stems'" :buttonDefs="stems" :domId="getId('stem-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark py-0  me-2'" />
      </div>
      <collapsableText :domId="getId('notehead-help')" :lines="lines" :initialState="false" />
    </div>
    <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
  </div>
</template>