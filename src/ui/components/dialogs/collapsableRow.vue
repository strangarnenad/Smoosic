<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
interface Props {
  domId: string, 
  initialState: boolean,
  containerClasses?:string
}

const props = defineProps<Props>();
const { domId, initialState } = { ...props };
const containerClasses = props.containerClasses ??'';
const isCollapsed = ref(props.initialState);
const collapsing = ref(false);
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  if (!collapsing.value) {
    collapsing.value = true;
    setTimeout(() => {
      collapsing.value = false;
    }, 500);
  }
}
const classForLine = (ix: number) => {
  return "row mb-2";
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
</script>
<template>
  <div class="row border-top pt-2 collapsable-container ms-2" :class="containerClasses">
    <button class="btn btn-sm btn-outline-dark collapsable-button" data-bs-toggle="collapse" role="button"
      :aria-expanded="!isCollapsed" :aria-controls="getId('collapsable')" @click.prevent="toggleCollapse">
      <span class="smo-icon icon-circle-down fs-6"></span>
    </button>
    <slot></slot>
  </div>
</template>