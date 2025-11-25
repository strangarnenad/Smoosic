<template>
  <div class="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="row">
          <div class="help-closer"><button class="icon-cross close" @click.prevent="closeFunction" aria-label="Close"></button></div>
        </div>
        <div class="row align-items-center justify-content-center">

          <div class="col-md-4">
            <img :src="imageLoc" width="200px" height="200px" alt="Smoosic Logo" />
          </div>
          <div class="col-md-4">
            <div class="row">
              <em class="small">Sm</em><em>ooooooooo</em><em>sic</em>
            </div>
            <div class="row">Welcome to Smoosic - the web-based music notation editor</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  props: {
    closeFunction: {
      type: Function,
      required: true
    }
  }
  , setup(props) {
    const closeFunction = props.closeFunction;
    const imageLoc = '../styles/images/logo.png';
    return { closeFunction, imageLoc };
  }
});
</script>
