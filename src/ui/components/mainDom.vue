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
    return { pianoKeys, showBugModal, mainDomInit };
  }
});
</script>
<template>
  <div class="bug-modal" id="bug-modal" :class="{ hide: !showBugModal }"></div>
  <div class="draganime hide" aria-hidden="true" style="width: 380px; height: 153.031px; left: 754px; top: 265px;"></div>  
  <div class="dialogContainer attributeDialog" id="attribute-modal-container"></div>
  <div class="dom-container" :class="{ masked: showBugModal }">
    <div class="mask"></div>
    <div class="workspace language-dir">
      <div class="row navbar-expand justify-content-start ms-5 flex-md-fill controls-top" id="top-bar">
        <sub class="col-1 hide" id="link-hdr"><a href="https://github.com/Smoosic/smoosic" aria-label="Github link" 
          target="_blank" tabindex="0">Github
            site</a> |
          <a href="https://smoosic.github.io/Smoosic/changes.md" aria-label="Change notes" target="_blank" tabindex="0">change notes</a>
          |
          <a href="https://smoosic.github.io/Smoosic/release/html/smoosic.html" aria-label="application link"
            target="_blank" tabindex="0">application</a><button class="close-header" aria-label="Close"><span
              class="icon icon-cross"></span></button></sub>
        <h4 class="col-1 titleText">Smoosic</h4>
        <div class="hide piano-container">
          <div class="key-left-ctrl"></div>
          <div class="piano-keys" ref="pianoKeys">
          </div>
          <div class="key-right-ctrl"></div>
        </div>
        <div class="col-6" id="controls-top">
        </div>
      </div>
      <div class="media" id="media">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary sticky-top" id="controls-left">
        </div>
        <div class="flex-lg-column" id="smo-scroll-region">
        </div>
      </div>
    </div>
  </div>
</template>
