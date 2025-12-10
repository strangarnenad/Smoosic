<script setup lang="ts">
import { ref, Ref } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { SmoScorePreferences } from '../../../smo/data/scoreModifiers';
import { SelectOption } from '../../common';
import selectComp from './select.vue';

interface Props {
  domId: string,
  initialValue: SmoScorePreferences,
  doubleDurationCb: (value: string) => Promise<void>,
  tripleDurationCb: (value: string) => Promise<void>,
  autoAdvanceCb: (value: boolean) => Promise<void>,
  autoPlayCb: (value: boolean) => Promise<void>,
  showPianoCb: (value: boolean) => Promise<void>,
  autoScrollPlaybackCb: (value: boolean) => Promise<void>,
  hideEmptyLinesCb: (value: boolean) => Promise<void>,
  transposeScoreCb: (value: boolean) => Promise<void>,
  partNamesCb: (value: boolean) => Promise<void>,
  commitCb: () => void,
  cancelCb: () => void
}
const props: Props = defineProps<Props>();

const autoAdvanceValue = ref(false);
const autoPlayValue = ref(false);
const showPianoValue = ref(false);
const autoScrollPlaybackValue = ref(false);
const hideEmptyLinesValue = ref(false);
const transposingScoreValue = ref(false);
const showPartsValue = ref(false);

const resetValues = () => {
  autoAdvanceValue.value = props.initialValue.autoAdvance;
  autoPlayValue.value =  props.initialValue.autoPlay;
  showPianoValue.value = props.initialValue.showPiano;
  autoScrollPlaybackValue.value = props.initialValue.autoScrollPlayback;
  hideEmptyLinesValue.value = props.initialValue.hideEmptyLines;
  transposingScoreValue.value = props.initialValue.transposingScore;
  showPartsValue.value = props.initialValue.showPartNames;
}
resetValues();
const domId: string = props.domId;
const { doubleDurationCb, tripleDurationCb, autoAdvanceCb, autoPlayCb, showPianoCb, autoScrollPlaybackCb, hideEmptyLinesCb, 
  commitCb, cancelCb, initialValue } = { ...props };
const top = ref(100);
const left = ref(100);
const getCoordsCb = (): { topRef: Ref<number>, leftRef: Ref<number> }=> {
  return { topRef: top, leftRef: left };
}
  const defaultDoubleDurations: SelectOption[] = [
    { label: '1/4', value: '4096' },
    { label: '1/8', value: '2048' }
  ];
  const defaultTripleDurations: SelectOption[] = [
    { label: 'dotted 1/4', value: '6144' },
    { label: '1/8', value: '2048' }
  ];

const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const getLocString = () => {
  return `top: ${top}px; left: ${left}px;`;
}

/* return {
  enable, arpCb, commitCb, cancelCb, getDomId, getId, getLocString,
  domId, top, left, arpValue, arpValues
};*/

</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row">
        <h2 class="dialog-label">Score Preferences</h2>
      </div>
      <div class="row">
        <div class="col col-1">
          <input class="form-check-input" type="checkbox" v-model="autoAdvanceValue" :id="getId('autoAdvance')"
           @change="autoAdvanceCb(autoAdvanceValue)"></input>
        </div>
        <div class="col col-5">
          <label class="form-check-label" :for="getId('autoAdvance')">Auto-advance on pitch change</label>
        </div>
        <div class="col col-1">
          <input class="form-check-input" type="checkbox" v-model="autoPlayValue" :id="getId('autoPlay')" @change="autoPlayCb(autoPlayValue)"></input>
        </div>
        <div class="col col-5">
          <label class="form-check-label" :for="getId('autoPlay')" >Auto-play sounds for pitch change</label>
        </div>
      </div>
      <div class="row">
        <div class="col col-1">
          <input class="form-check-input" type="checkbox" v-model="showPianoValue" :id="getId('showPiano')"
           @change="showPianoCb(showPianoValue)"></input>
        </div>
        <div class="col col-5">
          <label class="form-check-label" :for="getId('showPiano')">Show piano widget</label>
        </div>
        <div class="col col-1">
          <input class="form-check-input" type="checkbox" v-model="transposingScoreValue" :id="getId('transposeScore')" @change="transposeScoreCb(transposingScoreValue)"></input>
        </div>
        <div class="col col-5">
          <label class="form-check-label" :for="getId('transposeScore')" >Transposing score</label>
        </div>
      </div>
      <div class="row">
        <div class="col col-1">
          <input class="form-check-input" type="checkbox" v-model="hideEmptyLinesValue" :id="getId('hideEmptyLines')"
           @change="hideEmptyLinesCb(hideEmptyLinesValue)"></input>
        </div>
        <div class="col col-5">
          <label class="form-check-label" :for="getId('hideEmptyLines')">Hide empty staves</label>
        </div>
        <div class="col col-1">
          <input class="form-check-input" type="checkbox" v-model="showPartsValue" :id="getId('partNames')" @change="partNamesCb(showPartsValue)"></input>
        </div>
        <div class="col col-5">
          <label class="form-check-label" :for="getId('partNames')" >Show part names in Score</label>
        </div>
      </div>
      <div class="row align-items-baseline" :id="getId('arp-row')">
        <div class="col col-3 float-end pe-0">
          <span :for="getId('duration-select1')" class="form-label">Default Duration (even meter):</span>
        </div>
        <div class="col col-3 text-start">
          <selectComp :domId="getId('duration-select1')" label="Select" :initialValue="initialValue.defaultDupleDuration.toString()"
            :selections="defaultDoubleDurations" :changeCb="doubleDurationCb" />
        </div>
        <div class="col col-3 float-end pe-0">
          <span :for="getId('duration-select2')" class="form-label">Default Duration (triple meter):</span>
        </div>
        <div class="col col-3 text-start">
          <selectComp :domId="getId('duration-select2')" label="Select" :initialValue="initialValue.defaultTripleDuration.toString()"
            :selections="defaultTripleDurations" :changeCb="tripleDurationCb" />
        </div>
      </div>
      <DialogButtons :enable="true" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>