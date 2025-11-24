<script>
import { defineComponent, onMounted, useTemplateRef, toRef } from 'vue';
export default defineComponent({
  props: {
    bugModalView: Object,
    mainDomInit: {
      required: true,
      type: Function
    }
  },
  setup(props) {
    const pianoKeys = useTemplateRef('pianoKeys');
    const showBugModal = props.bugModalView;
    const mainDomInit = props.mainDomInit;
    onMounted(() => {
      mainDomInit(pianoKeys.value);
    });
    return { pianoKeys, showBugModal, mainDomInit  };
  }
});
</script>
<template>
  <div class="bug-modal" id="bug-modal" :class="{ hide: !showBugModal }"></div>
  <div class="dom-container">
    <div class="workspace language-dir">
      <div class="row navbar-expand" id="top-bar">
        <div class="titleText">Smoosic</div>
        <div class="hide piano-container">
          <div class="key-left-ctrl"></div>
          <div class="piano-keys" ref="pianoKeys">
          </div>
          <div class="key-right-ctrl"></div>
        </div>
        <div class="controls-top" id="controls-top">
        </div>
      </div>
      <div class="media" id="media">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary">
          <ul class="nav nav-pills flex-column mb-auto" id="controls-left">
          </ul>
        </div>
        <div class="flex-lg-column" id="smo-scroll-region">
        </div>
      </div>
    </div>
  </div>
</template>
