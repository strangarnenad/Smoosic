<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { ButtonDefinition } from '../../buttons/button';
import buttonComp from '../buttons/buttonComp.vue';
import { ref, Ref } from 'vue';
interface Props {
  domId: string,
  addGraceNoteCb: () => Promise<void>,
  removeGraceNoteCb: () => Promise<void>,
  slashGraceNoteCb: () => Promise<void>,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, addGraceNoteCb, removeGraceNoteCb, slashGraceNoteCb, commitCb, cancelCb } = { ...props };
const enable = ref(true);

const top = ref(100);
const left = ref(100);
const getCoordsCb = (): { topRef: Ref<number>, leftRef: Ref<number> } => {
  return { topRef: top, leftRef: left };
}
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str) => {
  return `${domId}-${str}`;
}
const buttonClass = 'btn btn-outline-secondary mx-3 float-start no-vertical-padding';
const rowClass='row mb-3 align-items-center';
const getLocString = () => {
  return `top: ${top}px; left: ${left}px;`;
}
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center mw-40" id="smo-dialog-container">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row mb-3">
        <h2 class="dialog-label">Grace Notes</h2>
      </div>
      <div :class="rowClass">
        <div class="col col-6">
          <span class="float-end" :for="getId('add-button')">Add Grace Note</span>
        </div>
        <div class="col col-6">
          <button :domId="getId('add-button')" @click.prevent="addGraceNoteCb" :class="buttonClass">
            <span class="icon icon-smo icon-grace_note  me-2 h4"></span>
            <span class="ms-2">shift-G</span>
          </button>
        </div>
      </div>
      <div :class="rowClass">
        <div class="col col-6">
          <span class="float-end" :for="getId('remove-button')">Remove Grace Note</span>
        </div>
        <div class="col col-6">
          <button :domId="getId('remove-button')" @click.prevent="removeGraceNoteCb"
            :class="buttonClass">
            <span class="icon icon-smo icon-grace_note me-2 h4"></span>
            <span class="ms-2">alt-G</span>
          </button>
        </div>
      </div>
      <div :class="rowClass">
        <div class="col col-6">
          <span class="float-end" :for="getId('slash-button')">Toggle Slash</span>
        </div>
        <div class="col col-6">
          <button :domId="getId('slash-button')" @click.prevent="slashGraceNoteCb"
            :class="buttonClass">
            <div class="col align-self-start">
              <span class="icon icon-smo icon-grace_slash  me-2 h4"></span>
              <span class="ms-2"></span>
            </div>
          </button>
        </div>
      </div>
      <div class="row mb-3 border-top pt-2">
        <p class="text-muted">Use hot keys shift-G to add, alt-G to remove.</p>
        <p class="text-muted">Use hot key alt-L to select grace notes.</p>
      </div>
    </div>
    <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
  </div>
</template>