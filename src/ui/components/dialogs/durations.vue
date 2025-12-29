<script setup lang="ts">
import collapsableText from './collapsableText.vue';
import { draggableSession } from '../../composable/draggable';
import dialogContainer from './dialogContainer.vue';

interface Props {
  domId: string,
  increaseDurationCb: () => Promise<void>,
  decreaseDurationCb: () => Promise<void>,
  addDotCb: () => Promise<void>,
  removeDotCb: () => Promise<void>,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, increaseDurationCb, decreaseDurationCb, addDotCb, removeDotCb, commitCb, cancelCb } = { ...props };

const buttonClass = 'btn btn-outline-secondary mx-3 float-start no-vertical-padding';
const rowClass = 'row mb-3 align-items-center';
const getId = (str) => {
  return `${domId}-${str}`;
}

const lines:string[] = [];
lines.push(`<p class="text-muted">Learn the keyboard shortcuts, they're much faster!</p>`);
lines.push(`<p class="text-muted">Use <span class="fs-4">, . </span> <span class="muted">(comma, period) </span> to          decrease/increase note length.</p>`);
lines.push(`<p class="text-muted">Use &lt; &gt; to add/remove dots.</p>`);
lines.push(`<p class="text-muted">Use shift + arrow keys to select notes.</p>`);
</script>
<template>
  <dialogContainer :domId="domId" label="Durations" :commitCb="commitCb" :cancelCb="cancelCb" 
     :classes="'text-center container mw-40'">
      <div :class="rowClass">
        <div class="col col-6">
          <span class="float-end" :for="getId('add-button')">Increase Duration</span>
        </div>
        <div class="col col-6">
          <button :domId="getId('add-button')" @click.prevent="increaseDurationCb" :class="buttonClass">
            <span class="icon icon-smo icon-duration_grow  me-2 h4"></span>
            <span class="ms-2 fs-1">.</span>
          </button>
        </div>
      </div>
      <div :class="rowClass">
        <div class="col col-6">
          <span class="float-end" :for="getId('remove-button')">Decrease Duration</span>
        </div>
        <div class="col col-6">
          <button :domId="getId('remove-button')" @click.prevent="decreaseDurationCb" :class="buttonClass">
            <span class="icon icon-smo icon-duration_less  me-2 h4"></span>
            <span class="ms-2 fs-1 font-monospace">,</span>
          </button>
        </div>
      </div>
      <div :class="rowClass">
        <div class="col col-6">
          <span class="float-end" :for="getId('slash-button')">Add Dot</span>
        </div>
        <div class="col col-6">
          <button :domId="getId('slash-button')" @click.prevent="addDotCb" :class="buttonClass">
            <div class="col align-self-start">
              <span class="icon icon-smo icon-duration_grow_dot  me-2 h4"></span>
              <span class="ms-2 fs-1">&gt;</span>
            </div>
          </button>
        </div>
      </div>
      <div :class="rowClass">
        <div class="col col-6">
          <span class="float-end" :for="getId('slash-button')">Remove Dot</span>
        </div>
        <div class="col col-6">
          <button :domId="getId('slash-button')" @click.prevent="removeDotCb" :class="buttonClass">
            <div class="col align-self-start">
              <span class="icon icon-smo icon-duration_less_dot  me-2 h4"></span>
              <span class="ms-2 fs-1">&lt;</span>
            </div>
          </button>
        </div>
      </div>
      <collapsableText :domId="getId('duration-help')" :lines="lines" :initialState="false" containerClasses="nw-40"/>
    </dialogContainer>
</template>