<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    startDialogSession: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const startDialogSession = props.startDialogSession;
    const { elements, parameters } = startDialogSession();
    const getDomId = () => {
      return `attr-modal-dialog-${parameters.id}`;
    }
    const getLocString = () => {
      return `top: ${parameters.top}px; left: ${parameters.left}px;`;
    }
    return { startDialogSession, elements, parameters, getDomId, getLocString };
  }
});
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <span class="draggable button"><span class="icon icon-move jsDbMove"></span></span>
    <h2 class="dialog-label">Load File</h2>
    <div class="smoControlContainer" id="smo-dialog-container">
    </div>
    <div class="buttonContainer"><button class="ok-button button-left btn btn-primary">OK</button><button
        class="cancel-button button-center btn btn-secondary">Cancel</button></div>
  </div>
</template>