<script>
  import { defineComponent, ref, watch, useTemplateRef, onMounted } from 'vue';
  export default defineComponent({
    props: {
      domId: {
        type: String,
        required: true
      },
      contents: {
        type: Object,
        required: true
      },
      suggestedName: {
        type: String,
        required: true
      },
      extension: {
        type: Object,
        required: true
      },      
      commitCb: {
        type: Function,
        required: true
      },
      cancelCb: {
        type: Function,
        required: true
      },changeExtensionCb: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      const { domId, commitCb, contents, cancelCb, extension, suggestedName } = {...props};
      const top = '100';
      const left = '100';
      const url = ref('');
      const getId = (str) => {
        return `${domId}-${str}`;
      }
      const selectedExtension = ref(extension.value);
      const extensions = [
        { text: 'Smoosic', value: '.json' },
        { text: 'MusicXML', value: '.xml' },
        { text: 'midi', value: '.mid' },
        { text: 'vex', value: '.js' },
        { text: 'Validation (large)', value: '.smojson' },
      ];      
      const filename = ref(suggestedName);
      if (!filename.value.endsWith(extension.value)) {
        filename.value = filename.value + extension.value;
      }
      const mimeType = 'application/octet-stream'
      const getDomId = () => {
        return `attr-modal-dialog-${domId}`;
      }
      const saveLink = ref(null);
      const saveFileCb = () => {
        if (saveLink.value) {
          saveLink.value.click();
        }
        commitCb();
      }
      const getLocString = () => {
        return `top: ${top}px; left: ${left}px;`;
      }
      watch(contents, () => {
        url.value = URL.createObjectURL(new Blob([contents.value], { type: mimeType }));
      });
      watch(filename, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if (!filename.value.endsWith(extension.value)) {
            filename.value = filename.value + extension.value;
          }
        }
      });
      watch(extension, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          if(typeof(oldVal) === 'string' && filename.value.endsWith(oldVal)) {
            filename.value = filename.value.slice(0, -oldVal.length);
          }
          if (!filename.value.endsWith(extension.value)) {
            filename.value = filename.value + extension.value;
          }
        }
      });
      onMounted(() => {
        if (saveLink.value === null) {
          console.warn('saveLink is null on mounted');
        }
        url.value = URL.createObjectURL(new Blob([contents.value], { type: mimeType }));
      });
      return { commitCb, cancelCb, getDomId, getLocString, saveLink, filename,
        domId, top, left, contents, extension, url, saveFileCb, extensions, 
        selectedExtension, getId
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
        <h2 class="dialog-label">Save File</h2>
      </div>
      <div class="input-group mb-3" id="save-saveFileName" data-param="saveFileName">
        <label class="input-group-text" for="save-saveFileName-input">File Name</label>
        <input type="text" class="form-control" id="save-saveFileName-input" v-model="filename" />
      </div>
      <div class="input-group mb-3" id="quantize-row">
          <label class="input-group-text" :for="getId('format-select')">File Format:</label>
        <div class="col-md-6">
          <select :id="getId('format-select')" v-model="selectedExtension" @change="changeExtensionCb(selectedExtension)"
            class="form-control">
            <option v-for="option in extensions" :key="option.value" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>

      <div class="buttonContainer">
        <div class="saveLink hide" aria-hidden="true">
          <a :href="url" :download="filename" class="btn btn-primary" id="save-download-link" ref="saveLink">Download File</a>
        </div>
        <button class="ok-button button-left btn btn-primary" :disabled="filename.length < extension.length" @click.prevent="saveFileCb">OK</button>
        <button class="cancel-button button-center btn btn-secondary" @click.prevent="cancelCb">Cancel</button></div>
      </div>
    </div>
</template>