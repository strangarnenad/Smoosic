<script setup lang="ts">
import { ref, Ref, watch, reactive } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import selectComp from './select.vue';
import numberInputApp from './numberInput.vue';
import { SelectOption } from '../../common';
import { SmoPageLayout } from '../../../smo/data/scoreModifiers';


interface Props {
  domId: string,
  label: string,
  initialValue: SmoPageLayout,
  changeCb: (value: SmoPageLayout, appyTo: string) => void,
  commitCb: () => void,
  cancelCb: () => void
}
const props = defineProps<Props>();
const domId: string = props.domId;
const top = ref(100);
const left = ref(100);
const getCoordsCb = (): { topRef: Ref<number>, leftRef: Ref<number> } => {
  return { topRef: top, leftRef: left };
}
const currentLayout: SmoPageLayout = reactive(new SmoPageLayout(props.initialValue))
const applyToOptions: SelectOption[] = [
  { label: 'Score', value: 'all' },
  { label: 'All Remaining', value: 'remaining' },
  { label: 'Page', value: 'page' }
];
const applyTo = ref('all');
const leftMarginChange = async (val: number) => {
  currentLayout.leftMargin = val;
  await props.changeCb(currentLayout, applyTo.value);
};
const rightMarginChange = async (val: number) => {
  currentLayout.rightMargin = val;
  await props.changeCb(currentLayout, applyTo.value);
};
const topMarginChange = async (val: number) => {
  currentLayout.topMargin = val;
  await props.changeCb(currentLayout, applyTo.value);
};
const bottomMarginChange = async (val: number) => {
  currentLayout.bottomMargin = val;
  await props.changeCb(currentLayout, applyTo.value);
};
const interGapChange = async (val: number) => {
  currentLayout.interGap = val;
  await props.changeCb(currentLayout, applyTo.value);
};
const intraGapChange = async (val: number) => {
  currentLayout.intraGap = val;
  await props.changeCb(currentLayout, applyTo.value);
};

const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const getLocString = () => {
  return `top: ${top}px; left: ${left}px;`;
}
const pageChangeCb = async (val: string) => {
  applyTo.value = val;
  await props.changeCb(currentLayout, applyTo.value);
};
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="text-center mw-40" :id="getId('modal-content')">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row mb-2">
        <h2 class="dialog-label">Page Layouts (px)</h2>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-4">
          <numberInputApp :domId="getId('page-width-input')" :initialValue="currentLayout.leftMargin" :precision="0"
            :changeCb="leftMarginChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Left Margin</span>
        </div>
        <div class="col col-4 ms-n4">
          <numberInputApp :domId="getId('page-height-input')" :initialValue="currentLayout.rightMargin" :precision="0"
            :changeCb="rightMarginChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Right Margin</span>
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-4">
          <numberInputApp :domId="getId('zoom-scale-input')" :initialValue="currentLayout.topMargin" :precision="0"
            :changeCb="topMarginChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Top Margin</span>
        </div>
        <div class="col col-4 ms-n4">
          <numberInputApp :domId="getId('zoom-scale-input')" :initialValue="currentLayout.bottomMargin" :precision="0"
            :changeCb="bottomMarginChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Bottom Margin</span>
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-4">
          <numberInputApp :domId="getId('svg-scale-input')" :initialValue="currentLayout.interGap" :precision="0"
            :changeCb="interGapChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Inter-System Gap</span>
        </div>
        <div class="col col-4 ms-n4">
          <numberInputApp :domId="getId('note-spacing-input')" :initialValue="currentLayout.intraGap" :precision="2"
            :changeCb="intraGapChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Intra-System Gap</span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col col-3 text-end">Apply To</div>
        <div class="col col-6">
          <selectComp :domId="getId('page-size-select')" :label="''" :selections="applyToOptions"
            :initialValue="applyTo" :changeCb="pageChangeCb" />
        </div>
      </div>
      <DialogButtons :enable="true" :commitCb="props.commitCb" :cancelCb="props.cancelCb" />
    </div>
  </div>
</template>