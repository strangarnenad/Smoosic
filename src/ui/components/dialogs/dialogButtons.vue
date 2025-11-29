<script setup lang="ts">
import { toRef, ref } from 'vue';
interface Props {
  commitCb: ()=>void,
  cancelCb: () => void,
  removeCb?: () => void,
  enable: boolean
}
const props = defineProps<Props>();

const commitCb = props.commitCb;
const cancelCb = props.cancelCb;
const removeCb = props.removeCb;
const enable = toRef(props, 'enable');
</script>
<template>
  <div class="buttonContainer">
    <button class="ok-button button-left btn btn-primary" :disabled="!enable" @click.prevent="commitCb">OK</button>
    <button class="cancel-button button-center btn btn-secondary" @click.prevent="cancelCb">Cancel</button>
    <button v-if="removeCb" @click.prevent="removeCb">Remove</button>
  </div>
</template>