<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
import collapsableText from './collapsableText.vue';
import { draggableSession } from '../../composable/draggable';
import { ref, Ref, reactive } from 'vue';
interface Props {
  domId: string,
  pitches: DialogButtonDefinition[],
  intervals: DialogButtonDefinition[],
  letters: DialogButtonDefinition[],
  pitchCb: (value: string) => Promise<void>,
  intervalCb: (value: string) => void,
  letterCb: (value: string) => void,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, pitches, intervals, letters, commitCb, cancelCb } = { ...props };
const intervalSplit = intervals.length / 2;
const interval1 = reactive(intervals.slice(0, intervalSplit));
const interval2 = reactive(intervals.slice(intervalSplit));
const enable = ref(true);
const getDomId = () => {
  return `attr-modal-dialogx-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}

const draggable = draggableSession(getDomId());
const lines:string[] = [];
lines.push(`<span class="text-muted">Learn to use the shortcuts, they are much faster!</span>`);
lines.push(`<div class="col">A-G note letter</div> <div class="col"> - = half-step  </div> <div class="col">  _ and + octaves </div> <div class="col"> 2-8 intervals </div>  <div class="col">      arrow keys navigate       </div>`);

</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="draggable.getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :draggableSession="draggable" />
      <div class="row mb-2">
        <h2 class="dialog-label">Change Pitches</h2>
      </div>
      <div class="row mb-1 nw-40">
        <buttonGroup :label="'Change Pitch'" :buttonDefs="pitches" :domId="getId('pitch-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark'" rowClasses="align-items-center row"/>
      </div>
      <div class="row mb-1">
          <buttonGroup :label="'Intervals'" :buttonDefs="interval1" :domId="getId('interval-buttons1')"
            :commonClasses="'btn btn-sm btn-outline-dark me-1'" rowClasses="align-items-center row"/>
      </div>
      <div class="row mb-1">
          <buttonGroup :label="''" :buttonDefs="interval2" :domId="getId('interval-buttons2')"
            :commonClasses="'btn btn-sm btn-outline-dark me-1'" rowClasses="align-items-center row" />
      </div>
      <div class="row mb-1">
        <buttonGroup :label="'Letter Notes'" :buttonDefs="letters" :domId="getId('letter-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark py-0  me-1'" rowClasses="align-items-center row " />
      </div>
      <collapsableText :domId="getId('pitch-help')" :lines="lines" :initialState="false" />
    </div>
    <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
  </div>
</template>