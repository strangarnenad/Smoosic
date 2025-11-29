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
    initialValue: {
      type: String,
      required: true
    },
    clefChangeCb: {
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
    const { domId, clefChangeCb, enable, initialValue, commitCb, cancelCb } = { ...props };
    const top = '100';
    const left = '100';
    const clefChange = ref(initialValue);
    const clefChanges = [{
      label: 'Treble Clef Staff',
      value: 'treble'
    }, {
      label: 'Bass Clef Staff',
      value: 'bass'
    }, {
      label: 'Alto Clef Staff',
      value: 'alto'
    }, {
      label: 'Tenor',
      value: 'tenor'
    }, {
      label: 'Percussion',
      value: 'percussion'
    }];
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
      enable, clefChangeCb, commitCb, cancelCb, getDomId, getId, getLocString,
      domId, top, left, clefChange, clefChanges
    };
  }
});
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <span class="draggable-button">
        <span class="icon icon-move jsDbMove"></span>
      </span>
      <div class="row">
        <h2 class="dialog-label">Grace Notes</h2>
      </div>
      <div class="row align-items-baseline" :id="getId('clef-row')">
        <div class="col-md-6">
          <label :for="getId('clef-select')" class="form-label">Clef:</label>
        </div>
        <div class="col-md-6">
          <select :id="getId('clef-select')" v-model="clefChange" @change="clefChangeCb(clefChange)"
            class="form-control">
            <option v-for="clefChange in clefChanges" :key="clefChange.value" :value="clefChange.value">
              {{ clefChange.label }}
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