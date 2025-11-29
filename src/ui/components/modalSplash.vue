<script setup lang="ts">
import { onMounted } from 'vue';
interface Props {
  closeFunction: () => void,
  timer?: number
}
const props = defineProps < Props > ();
const closeFunction = props.closeFunction;
const timer = props.timer || 0;
const imageLoc = '../styles/images/logo.png';
onMounted(() => {
  if (timer && timer > 0) {
    setTimeout(() => {
      closeFunction();
    }, timer);
  }
})
</script>

<template>
  <div class="modal">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="row">
          <div class="help-closer"><button class="icon-cross close" @click.prevent="closeFunction"
              aria-label="Close"></button></div>
        </div>
        <div class="row align-items-center justify-content-center">

          <div class="col-md-4">
            <img :src="imageLoc" width="200px" height="200px" alt="Smoosic Logo" />
          </div>
          <div class="col-md-8">
            <div class="h4">
              <em class="small">Sm</em><em>ooooooooo</em><em>sic</em>
            </div>
            <div>Welcome to Smoosic - the web-based music notation editor</div>
            <div class=""><a href="https://github.com/Smoosic/smoosic" aria-label="Github link" target="_blank"
                tabindex="0">Github
                site</a> |
              <a href="https://smoosic.github.io/Smoosic/changes.md" aria-label="Change notes" target="_blank"
                tabindex="0">change
                notes</a>
              |
              <a href="https://smoosic.github.io/Smoosic/release/html/smoosic.html" target="_blank"
                aria-label="application link" tabindex="0">application</a>
            </div>
            <div>
              <strong> Copyright (c) 2021 Aaron David Newman</strong>
            </div>
            <div>
              Contributors include
              <a href="https://github.com/AaronDavidNewman" target="_blank" aria-label="Maintainer's Github"
                tabindex="0">Aaron David Newman</a>
              , <a href="https://github.com/strangarnenad" target="_blank" aria-label="Contributor's Github"
                tabindex="0">Strangar Nenad</a>
              and others.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
