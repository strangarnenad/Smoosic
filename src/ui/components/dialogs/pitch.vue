<script setup lang="ts">
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { DialogButtonDefinition } from '../../buttons/button';
import buttonGroup from './buttonGroup.vue';
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

const top = ref(100);
const left = ref(100);
const getCoordsCb = (): { topRef: Ref<number>, leftRef: Ref<number> } => {
  return { topRef: top, leftRef: left };
}
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const getLocString = () => {
  return `top: ${top.value}px; left: ${left.value}px;`;
}
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row mb-2">
        <h2 class="dialog-label">Change Pitches</h2>
      </div>
      <div class="row mb-1">
        <buttonGroup :label="'Change Pitch'" :buttonDefs="pitches" :domId="getId('pitch-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark'" rowClasses="align-items-center"/>
      </div>
      <div class="row mb-1">
          <buttonGroup :label="'Intervals'" :buttonDefs="interval1" :domId="getId('interval-buttons1')"
            :commonClasses="'btn btn-sm btn-outline-dark me-1'" rowClasses="align-items-center"/>
      </div>
      <div class="row mb-1">
          <buttonGroup :label="''" :buttonDefs="interval2" :domId="getId('interval-buttons2')"
            :commonClasses="'btn btn-sm btn-outline-dark me-1'" rowClasses="align-items-center" />
      </div>
      <div class="row mb-1">
        <buttonGroup :label="'Letter Notes'" :buttonDefs="letters" :domId="getId('letter-buttons')"
          :commonClasses="'btn btn-sm btn-outline-dark py-0  me-1'" rowClasses="align-items-center" />
      </div>
      <div class="row mb-1 border-top pt-2">
        <span class="text-muted">Learn to use the shortcuts, they are much faster!</span>
      </div>
      <div class="row mb-1">
        <div class="col">A-G note letter</div>
        <div class="col">
          - = half-step
        </div>
        <div class="col">
          _ and + octaves
        </div>
        <div class="col">
          2-8 intervals
        </div>
        <div class="col">
          arrow keys navigate
        </div>
      </div>
    </div>
    <DialogButtons :enable="enable" :commitCb="commitCb" :cancelCb="cancelCb" />
  </div>
</template>