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

const getId = (str: string) => {
  return `${domId}-${str}`;
}
</script>
<template>
  <div class="row pt-4 collapsable-container ms-2" :class="containerClasses">
    <button class="btn btn-sm collapsable-button position-absolute left-3 top-n4 border-0" data-bs-toggle="collapse" role="button"
      :aria-expanded="!isCollapsed" :aria-controls="getId('collapsable')" @click.prevent="toggleCollapse">
      <span class="smo-icon icon-circle-down fs-6"></span>
    </button>
    <div class="collapse collapsable-row row" :id="getId('collapse')" :class="{ show: !isCollapsed, collapsing: collapsing }">
    <slot></slot>
    </div>
  </div>
</template>