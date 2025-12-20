<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { draggable } from '../../../common/htmlHelpers';
import { DraggableSession } from '../../composable/draggable';
declare var $: any;
interface Props3 {
  draggableSession: DraggableSession
}
const props = defineProps<Props3>();
const { topRef, leftRef } = props.draggableSession.getCoordsCb();
const session: DraggableSession = props.draggableSession;
const domId = session.domId;
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