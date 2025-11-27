<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
export default defineComponent({
  props: {
    domId: {
      type: String,
      required: true
    },
    headline: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },      
    okCb: {
      type: Function,
      required: true
    }   
  }, setup(props) {
    const { domId, headline, message, okCb } = { ...props };
    const top = '100';
    const left = '100';
    const getDomId = () => {
      return `attr-modal-dialog-${domId}`;
    }
    const getId = (str) => {
      return `${domId}-${str}`;
    }
    const getLocString = () => {
      return `top: ${top}px; left: ${left}px;`;
    }
    return {
      domId, top, left, headline, message, okCb, getDomId, getLocString, getId
    };
  }
})
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <span class="draggable-button">
        <span class="icon icon-move jsDbMove"></span></span>
      <div class="row">
        <h2 class="dialog-label">{{ headline }}</h2>
      </div>
      <div class="text-input smoControl" id="save-saveFileName" data-param="saveFileName">
        <p>{{ message }} </p>
      </div>
      <div class="buttonContainer">
        <button class="ok-button button-left btn btn-primary" @click.prevent="okCb">OK</button>        
      </div>
    </div>
    </div>
</template>