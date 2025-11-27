<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: {
    domId: {
      type: String,
      required: true
    },
    enable: {
      type: Object,
      required: true
    },
    quantizeCb: {
      type: Function,
      required: false
    },
    uploadCb: {
      type: Function,
      required: true
    },
    commitCb: {
      type: Function,
      required: true
    },
    cancelCb: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const { domId, uploadCb, quantizeCb, enable, commitCb, cancelCb } = { ...props };
    const top = '100';
    const left = '100';
    const quantizeValue = ref('1024');
    const quantizeValues = [
      { text: '1/8th note', value: '2048' },
      { text: '1/16th note', value: '1024' },
      { text: '1/32nd note', value: '512' }
    ];
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
      enable, uploadCb, commitCb, cancelCb, getDomId, getId, getLocString,
      domId, top, left, quantizeCb, quantizeValue, quantizeValues
    };
  }
});
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <span class="draggable-button">
        <span class="icon icon-move jsDbMove"></span></span>
      <div class="row">
        <h2 class="dialog-label">Load File</h2>
      </div>
      <div class="row" :id="getId('loadFile')" data-param="loadFile">
        <div class="col">
          <input type="file" class="file-button" accept=".json,.mid,.midi,.xml,.mxl" @change="uploadCb"
            :id="getId('loadFile-input')">
          <label :for="getId('loadFile-input')"></label>
        </div>
      </div>
      <div class="row" :class="{ hide: !quantizeCb }" id="quantize-row">
        <div class="col-md-6">
          <label :for="getId('quantize-select')" class="form-label">Quantize Midi:</label>
        </div>
        <div class="col-md-6">
          <select :id="getId('quantize-select')" v-model="quantizeValue" @change="quantizeCb(quantizeValue)"
            class="form-control">
            <option v-for="option in quantizeValues" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="buttonContainer">
        <button class="ok-button button-left btn btn-primary" :disabled="!enable" @click.prevent="commitCb">OK</button>
        <button class="cancel-button button-center btn btn-secondary" @click.prevent="cancelCb">Cancel</button>
      </div>
    </div>
  </div>
</template>