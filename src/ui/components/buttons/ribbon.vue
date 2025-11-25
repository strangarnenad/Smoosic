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
    const getClasses = (btnProps) => `${btnProps.icon} ${btnProps.classes}`;
    return { buttonProps, domId, getId, getClasses };
  }
});
</script>
<template>
  <div class="ribbonButtonContainer collapseContainer" data-group="quickButtons" :id="domId">
    <buttonComp v-for="props in buttonProps" :buttonProps="props" :domId="getId(props.id)" :key="props.id">
    </buttonComp>
  </div>
</template>