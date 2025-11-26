<script>
import { defineComponent, watch } from 'vue';
import { manageFileUploadSession } from '../../composables/fileDownloadAdaper';
export default defineComponent({
  props: {
    domId: {
      type: String,
      required: true
    }, dialog: {
      type: Object,
      required: true
    }, parameters: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { domId, dialog, parameter } = { ...props }
    const getId = (str) => {
      return `${props.domId}-${str}`;
    }
    const { uploadCb, setValue, getValue, defaultValue, isLoaded } = manageFileUploadSession(dialog, parameters);
    return { domId, getId, handleFileUpload, uploadCb, setValue, getValue, defaultValue, isLoaded  };  
  }
});
</script>
<template>
  <div class="select-file" :id="getId('loadFile')" data-param="loadFile">
    <input type="file" class="file-button" @change="uploadCb"
      :id="getId('loadFile-input')"><label :for="getId('loadFile-input')"></label></div>
</template>