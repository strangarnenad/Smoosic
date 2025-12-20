<script setup lang="ts">
import { ref, toRef, watch } from 'vue';
interface Props {
domId: string,
precision: number,
initialValue: number,
disabled?: boolean,
percent?: boolean,
inputClasses?: string,
buttonClasses?: string,
changeCb: (value: number) => Promise<void>
}
const props = defineProps<Props>();
const inputClasses = props.inputClasses ?? 'form-control d-inline-block text-center px-0 py-1 w-50 text-align-center number-click';
const buttonClasses = props.buttonClasses ?? 'btn btn-sm btn-outline-dark btn-square px-1 mb-1 number-click';
const value = ref(props.initialValue);
const percent = props.percent ?? false;
if (percent) {
  value.value = Math.round(value.value * 100);
}
const getId = (str: string) => {
  return `${props.domId}-${str}`;
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
roundValue();
</script>
<template>
  <button @click.prevent="increment(1)" 
    :id="getId('incButton')"
    :class="buttonClasses"
    :disabled="disabled">
    <span class="smo-icon icon-circle-up fs-6"></span>
    </button>
    <button @click.prevent="increment(-1)" :disabled="disabled"
    :class="buttonClasses + ' me-2'"
    :id="getId('decButton')">
    <span class="smo-icon icon-circle-down fs-6"></span>
  </button>
  <input :class="inputClasses" :disabled="disabled"
    v-model="value" @change="handleChange" :id="getId('text')"/>
</template>