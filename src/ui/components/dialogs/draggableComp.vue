<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { draggable } from '../../../common/htmlHelpers';
declare var $: any;
interface Props3 {
  domId: string,
  getCoordsCb: () => { topRef: Ref<number>, leftRef: Ref<number> },
}
const props = defineProps<Props3>();
const { topRef, leftRef } = props.getCoordsCb();
const domId = props.domId;
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const ignore = () => {}
onMounted(() => {
  setTimeout(() => {
  const parent = $('#'+domId)[0];
  const handle = $('#'+getId('draggable-handle'))[0];
  draggable({
    parent,
    handle,
    topRef,
    leftRef,
    animateDiv: '.draganime',
    cb: ignore,
    moveParent: true
   });
  }, 1);
});
</script>
<template>
  <span class="draggable-button" :id="getId('draggable-handle')">
  <span class="icon icon-move jsDbMove"></span>
  </span>
</template>