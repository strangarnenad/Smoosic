<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import { ref, Ref } from 'vue';
import { draggableSession } from '../../composable/draggable';
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

const draggable = draggableSession(getDomId());
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="draggable.getLocString()">
    <div class="text-center" :id="getId('modal-content')">
      <draggableComp :draggableSession="draggable" />
      <div class="row">
        <h2 class="dialog-label">Microtones</h2>
      </div>
        <div class="row nw-30">
          <buttonGroup :label="'Value'" :buttonDefs="accidentals" :domId="getId('shape-buttons')"
            :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
        </div>       
      <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>

</template>