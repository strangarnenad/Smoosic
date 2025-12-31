<script setup lang="ts">
import { ref, Ref, watch, reactive } from 'vue';
import selectComp from './select.vue';
import numberInputApp from './numberInput.vue';
import { SelectOption } from '../../common';
import { SmoPageLayout } from '../../../smo/data/scoreModifiers';
import dialogContainer from './dialogContainer.vue';
interface Props {
  domId: string,
  label: string,
  getValues: () => { currentLayout: SmoPageLayout, applyTo: Ref<string> },
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { currentLayout, applyTo } = props.getValues();
const domId: string = props.domId;

const applyToOptions: SelectOption[] = [
  { label: 'Score', value: 'all' },
  { label: 'All Remaining', value: 'remaining' },
  { label: 'Page', value: 'page' }
];
type numberParams = 'leftMargin' | 'rightMargin' | 'topMargin' | 'bottomMargin' | 'interGap' | 'intraGap';

const updateLayout = (param: numberParams) => {
  const cb = async (value: number) => {
    (currentLayout as any)[param] = value;
  }
  return cb;
}
const updateApplyTo = (value: string) => {
  applyTo.value = value;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}

</script>
<template>
  <dialogContainer :domId="domId" label="Page Layout" :commitCb="props.commitCb" :cancelCb="props.cancelCb">
    <div class="row mb-2 align-items-center">
      <div class="col col-4">
        <numberInputApp :domId="getId('page-width-input')" :initialValue="currentLayout.leftMargin" :precision="0"
          :changeCb="updateLayout('leftMargin')" />
      </div>
      <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
        <span class="form-check-label">Left Margin</span>
      </div>
      <div class="col col-4 ms-n4">
        <numberInputApp :domId="getId('page-height-input')" :initialValue="currentLayout.rightMargin" :precision="0"
          :changeCb="updateLayout('rightMargin')" />
      </div>
      <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
        <span class="form-check-label">Right Margin</span>
      </div>
    </div>
    <div class="row mb-2 align-items-center">
      <div class="col col-4">
        <numberInputApp :domId="getId('zoom-scale-input')" :initialValue="currentLayout.topMargin" :precision="0"
          :changeCb="updateLayout('topMargin')" />
      </div>
      <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
        <span class="form-check-label">Top Margin</span>
      </div>
      <div class="col col-4 ms-n4">
        <numberInputApp :domId="getId('zoom-scale-input')" :initialValue="currentLayout.bottomMargin" :precision="0"
          :changeCb="updateLayout('bottomMargin')" />
      </div>
      <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
        <span class="form-check-label">Bottom Margin</span>
      </div>
    </div>
    <div class="row mb-2 align-items-center">
      <div class="col col-4">
        <numberInputApp :domId="getId('svg-scale-input')" :initialValue="currentLayout.interGap" :precision="0"
          :changeCb="updateLayout('interGap')" />
      </div>
      <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
        <span class="form-check-label">Inter-System Gap</span>
      </div>
      <div class="col col-4 ms-n4">
        <numberInputApp :domId="getId('note-spacing-input')" :initialValue="currentLayout.intraGap" :precision="0"
          :changeCb="updateLayout('intraGap')" />
      </div>
      <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
        <span class="form-check-label">Intra-System Gap</span>
      </div>
    </div>
    <div class="row mb-2">
      <div class="col col-3 text-end">Apply To</div>
      <div class="col col-6">
        <selectComp :domId="getId('page-size-select')" :label="''" :selections="applyToOptions" :initialValue="applyTo"
          :changeCb="updateApplyTo" />
      </div>
    </div>
  </dialogContainer>
</template>