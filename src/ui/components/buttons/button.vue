<script>
import { defineComponent } from 'vue';
/* 
export interface ButtonDefinition {
    leftText: string,
    rightText: string,
    classes: string,
    icon: string,
    action: ButtonAction,
    ctor: string,
    group: string,
    id: string,
    callback?: ButtonCallback,
    hotKey?: string,
    dataElements?: {
      interval: string,
      direction: string
    }
  }*/
export default defineComponent({
  props: {
    domId: {
      type: String,
      required: true
    },
    buttonProps: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const buttonProps = props.buttonProps;
    const domId = props.domId;
    const getId = (str) => `${domId}-${str}`;
    const hasRightText = buttonProps.rightText && buttonProps.rightText.length > 0;
    const hasLeftText = buttonProps.leftText && buttonProps.leftText.length > 0;
    return { buttonProps, getId, domId, hasRightText, hasLeftText };
  }
});
</script>
<template>
  <button :id="getId(buttonProps.id)" 
    :class="buttonProps.classes"
    @click.prevent="buttonProps.callback(buttonProps)">
    <span class="left-text"><span class="text-span">{{ buttonProps.leftText }}</span>
    <span :class="buttonProps.icon"></span></span>
    <span class="right-text">{{ buttonProps.rightText }}</span></button>
</template>
