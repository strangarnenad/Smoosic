<script>
import { defineComponent } from 'vue';
import { default as buttonComp } from './button.vue';
export default defineComponent({
  components: { buttonComp },
  props: {
    domId: String,
    buttonProps: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const buttonProps = props.buttonProps;
    const domId = props.domId;
    const getId = (str) => `${domId}-${str}`;
    return { buttonProps, domId, getId };
  }
});
</script>
<template>
  <div class="ribbonButtonContainer collapseContainer" data-group="quickButtons" :id="domId">
    <buttonComp v-for="props in buttonProps" :domId="getId(props.buttonId)" :buttonId="props.buttonId"
      :buttonIcon="props.buttonIcon" :buttonText="props.buttonText" :callback="props.callback" :key="props.buttonId">
    </buttonComp>
  </div>
</template>