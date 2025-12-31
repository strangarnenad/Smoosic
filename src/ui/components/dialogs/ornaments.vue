<script setup lang="ts">
import dialogContainer from './dialogContainer.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import { ref, Ref } from 'vue';

interface Props {
  domId: string,
  basic: DialogButtonDefinition[],
  jazz: DialogButtonDefinition[],
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, basic, jazz, commitCb, cancelCb } = { ...props };
const getId = (str: string) => {
  return `${domId}-${str}`;
}

</script>
<template>
  <dialogContainer :domId="domId" :commitCb="commitCb" :cancelCb="cancelCb" label="'Ornaments'">
    <div class="row nw-40">
      <buttonGroup :label="'Basic'" :buttonDefs="basic" :domId="getId('shape-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
    </div>
    <div class="row nw-40">
      <buttonGroup :label="'Jazz'" :buttonDefs="jazz" :domId="getId('head-buttons')"
        :commonClasses="'btn btn-sm btn-outline-dark me-2'" />
    </div>
  </dialogContainer>
</template>