<script setup lang="ts">
import dialogContainer from './dialogContainer.vue';
import { ref, Ref, watch, reactive } from 'vue';

import buttonGroup from './buttonGroup.vue';
import { DialogButtonDefinition } from '../../buttons/button';

interface Props {
  domId: string,
  label: string,
  startEndings: DialogButtonDefinition[],
  endEndings: DialogButtonDefinition[],
  repeatSymbols: DialogButtonDefinition[],
  repeatLandmarks: DialogButtonDefinition[],
  repeatText: DialogButtonDefinition[],

  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, label, startEndings, endEndings, repeatSymbols, repeatLandmarks, repeatText, commitCb, cancelCb } = { ...props };
const getId = (str: string) => {
  return `${domId}-${str}`;
}
</script>
<template>
  <dialogContainer :domId="domId" :label="label" :commitCb="commitCb" :cancelCb="cancelCb" :classes="'container text-center'">
    <div class="row nw-30 ms-2">
      <buttonGroup :label="'Start Endings'" :buttonDefs="startEndings" :domId="getId('start-ending-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
    </div>
    <div class="row nw-30 ms-2">
      <buttonGroup :label="'End Endings'" :buttonDefs="endEndings" :domId="getId('end-ending-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2'" />        
    </div>
    <div class="row nw-30 ms-2">
      <buttonGroup :label="'Repeat Landmarks'" :buttonDefs="repeatLandmarks" :domId="getId('repeat-landmark-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2 px-2'" />
    </div>
    <div class="row nw-30 ms-2">
      <buttonGroup :label="'Repeat Symbols'" :buttonDefs="repeatSymbols" :domId="getId('repeat-symbol-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
    </div>
    <div class="row nw-30 ms-2">
      <buttonGroup :label="'Repeat Text'" :buttonDefs="repeatText" :domId="getId('repeat-text-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2 px-2'" />
    </div>
  </dialogContainer>
</template>