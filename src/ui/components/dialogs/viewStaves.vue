<script setup lang="ts">
import { reactive, Ref, ref, watch } from 'vue';
import { SmoScore } from '../../../smo/data/score';
import { ViewMapEntry } from '../../../render/sui/scoreView';
import draggableComp from './draggableComp.vue';
import DialogButtons from './dialogButtons.vue';
import { draggableSession } from '../../composable/draggable';
interface Props {
  domId: string,
  label: string,
  score: SmoScore,
  getViewMap: () => ViewMapEntry[]
  commitCb: () => void,
  cancelCb: () => void
}
const props = defineProps<Props>();
const { label, domId, score, getViewMap, commitCb, cancelCb } = props;
const viewMap = getViewMap();
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string, staffId: number) => {
  return `${domId}-${staffId}-${str}`;
}
const toggleStave = async (ix: number) => {
  // viewMap[ix].show = !viewMap[ix].show;
}
const draggable = draggableSession(getDomId());
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="draggable.getLocString()">
    <div class="container text-center" id="smo-dialog-container">
      <draggableComp :draggableSession="draggable" />
      <div class="row">
        <h2 class="dialog-label">{{ label }}</h2>
      </div>      
      <div class="row nw-30">
        <div class="col col-6 text-end">
          <h4 class="h5">Stave</h4>
        </div>
        <div class="col col-6 text-start">
          <h4 class="h5">Visible</h4>
        </div>
      </div>
      <div v-for="(stave, ix) in viewMap" class="row">
        <div class="col col-6 text-end ">{{ score.staves[ix].partInfo.partName }}</div>
        <div class="col col-6 text-start">
          <input class="form-check-input" type="checkbox" v-model="viewMap[ix].show" :id="getId('group-checkbox', ix)"
              @change="toggleStave(ix)"
            ></input>
        </div>
      </div>
      <DialogButtons :enable="true" :commitCb="commitCb" :cancelCb="cancelCb" />
    </div>
  </div>
</template>