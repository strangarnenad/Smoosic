<script setup lang="ts">
import { ref, toRef, watch } from 'vue';
interface Props {
domId: string,
precision: number,
initialValue: number,
disabled?: boolean,
percent?: boolean,
changeCb: (value: number) => Promise<void>
}
const props = defineProps<Props>();
const value = ref(props.initialValue);
const percent = props.percent ?? false;
if (percent) {
  value.value = Math.round(value.value * 100);
}
const disabled = toRef(props, 'disabled');
const roundValue = () => {
  value.value = Math.round(value.value * Math.pow(10, props.precision)) / Math.pow(10, props.precision);
}
watch(() => props.initialValue, (newVal) => {
  if (percent) {
    value.value = Math.round(newVal * 100);
  } else {
    value.value = newVal;
  }
});
const increment = (sign: number) => {
  if (sign > 0) {
    value.value += Math.pow(10, -props.precision);
  } else {
    value.value -= Math.pow(10, -props.precision);
  }
  roundValue();
  const cbVal = percent ? value.value / 100 : value.value;
  props.changeCb(cbVal);
}
const handleChange = () => {
  roundValue();
  const cbVal = percent ? value.value / 100 : value.value;
  props.changeCb(cbVal);
}
</script>
<template>
  <button class="btn btn-sm btn-outline-dark btn-square" @click.prevent="increment(1)" :disabled="disabled">
    <span class="smo-icon icon-circle-up fs-6"></span>
    </button>
    <button class="btn btn-sm btn-outline-dark btn-square me-2" @click.prevent="increment(-1)" :disabled="disabled">
<span class="smo-icon icon-circle-down fs-6"></span>
  </button>
  <input class="form-control d-inline-block text-center w-50 pe-0 py-1 text-align-center" :disabled="disabled"
    v-model="value" @change="handleChange" />
</template>