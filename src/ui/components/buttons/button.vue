<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    domId: String,
    buttonId: String,
    buttonIcon: String,
    buttonText: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const buttonId = props.buttonId;
    const callback = props.callback;
    const icon = props.buttonIcon;
    const buttonText = props.buttonText;
    const domId = props.domId;
    const getId = (str) => `${domId}-${str}`;
    const classes = `icon icon-smo icon-${icon}`;
    return { buttonId, callback, classes, icon, buttonText, getId };
  }
});
</script>
<template>
  <button :id="getId('refresh')" class="icon refresh" @click.prevent="callback">
    <span class="left-text"><span class="text-span"></span><span
        :class="classes"></span></span><span
      class="ribbon-button-hotkey">{{ buttonText }}</span></button>
</template>
