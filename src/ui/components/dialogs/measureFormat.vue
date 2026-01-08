<script setup lang="ts">
import { ref, Ref, watch, reactive } from 'vue';
import selectComp from './select.vue';
import numberInputApp from './numberInput.vue';
import collapsableRow from './collapsableRow.vue';
import { SelectOption } from '../../common';
import {
  SmoMeasureFormat, SmoMeasureFormatNumberAttributes, SmoMeasureFormatNumberKeys
} from '../../../smo/data/measureModifiers';
import dialogContainer from './dialogContainer.vue';

interface Props {
  domId: string,
  label: string,
  measureFormat: SmoMeasureFormat,
  isPart: boolean,
  initialDisplayMeasure: number,
  measureCount: number,
  updateMeasureFormatCb: (mf: SmoMeasureFormat) => Promise<void>,
  measureNumberCb: (newIndex: number) => Promise<void>,
  commitCb: () => Promise<void>,
  cancelCb: () => Promise<void>
}
const props = defineProps<Props>();
const { domId, label, commitCb, cancelCb, measureCount } = { ...props };
const measureFormat = reactive(new SmoMeasureFormat(props.measureFormat));
const measureIndex = ref(props.initialDisplayMeasure + 1);
const renumberMeasureCb = async (newIndex: number) => {
  measureIndex.value = newIndex;
  await props.measureNumberCb(newIndex - 1);
}
const writeNumberValue = async (attr: SmoMeasureFormatNumberAttributes, value: Number) => {
  measureFormat[attr] = value.valueOf();
}
const numberAttributeMap: Record<string, (value: number) => Promise<void>> = {};
SmoMeasureFormatNumberKeys.forEach((key) => {
  numberAttributeMap[key] = async (value: number) => {
    await writeNumberValue(key, value);
  };
});
watch(measureFormat, async () => {
  if (measureFormat.pageBreak) {
    measureFormat.systemBreak = true;
  }
  await props.updateMeasureFormatCb(measureFormat);
}, { deep: true });
const getId = (str: string) => {
  return `${domId}-${str}`;
}
</script>

<template>
  <dialogContainer :domId="domId" :label="label" :cancelCb="cancelCb" :commitCb="commitCb"
   :classes="'text-center mw-40 nw-40'">
    <div class="row align-items-center">
      <div class="checkbox-input-column-div">
        <input class="form-check-input" type="checkbox" v-model="measureFormat.systemBreak" 
        :disabled="measureFormat.pageBreak"
        :id="getId('system-break')">
        </input>
      </div>
      <div class="checkbox-input-label-div">
        <span class="form-check-label" :for="getId('system-break')">Break system before measure</span>
      </div>
      <div class="checkbox-input-column-div">
        <input class="form-check-input" type="checkbox" v-model="measureFormat.pageBreak" :id="getId('page-break')">
        </input>
      </div>
      <div class="checkbox-input-label-div">
        <span class="form-check-label" :for="getId('page-break')">Break page before measure</span>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="number-input-column-div">
        <numberInputApp :domId="getId('measureIndex')" :initialValue="measureIndex"
          :changeCb="renumberMeasureCb" :precision="0" :width="25" />
      </div>
      <div class="number-input-label-div">
        <span class="form-check-label">Measure Number</span>
      </div>
      <div class="col col-6"></div>
    </div>
    <div class="row align-items-center mb-4">
      <div class="number-input-column-div">
        <numberInputApp :domId="getId('pad-left')" :initialValue="measureFormat.padLeft" :minValue="0"
          :changeCb="numberAttributeMap['padLeft']" :precision="0" :width="25" />
      </div>
      <div class="number-input-label-div">
        <span class="form-check-label">Pad Left</span>
      </div>
      <div class="checkbox-input-column-div">
        <input class="form-check-input" type="checkbox" :disabled="measureFormat.padLeft < 1"
          v-model="measureFormat.padAllInSystem" :id="getId('pad-all-in-system')">
        </input>
      </div>
      <div class="checkbox-input-label-div">
        <span class="form-check-label" :for="getId('pad-all-in-system')">Pad All In System</span>
      </div>
    </div>
    <div class="row align-items-center mt-2 border-top" :class="{ hide: !isPart }">
      <div class="col col-12 text-center">
        <h2 class="h5">Part Format</h2>
      </div>
    </div>
    <div class="row align-items-center mb-4" :class="{ hide: !isPart }">
      <div class="checkbox-input-column-div">
        <input class="form-check-input" type="checkbox" v-model="measureFormat.restBreak" :id="getId('rest-break')">
        </input>
      </div>
      <div class="checkbox-input-label-div">
        <span class="form-check-label" :for="getId('rest-break')">Break Multi-measure rest</span>
      </div>
    </div>
    <div class="row align-items-center mt-2 border-top">
      <div class="col col-12 text-center">
        <h2 class="h5">Experimental</h2>
      </div>
    </div>
    <collapsableRow :domId="getId('advanced-options')" :initialState="true">
      <div class="number-input-column-div">
        <numberInputApp :domId="getId('stretch-contents')" :initialValue="measureFormat.customStretch"
          :changeCb="numberAttributeMap['customStretch']" :precision="0" :width="25" />
      </div>
      <div class="number-input-label-div">
        <span class="form-check-label">Stretch Contents</span>
      </div>
      <div class="number-input-column-div">
        <numberInputApp :domId="getId('proportionality')" :initialValue="measureFormat.proportionality"
          :changeCb="numberAttributeMap['proportionality']" :precision="0" :width="25" />
      </div>
      <div class="number-input-label-div">
        <span class="form-check-label">Proportionality (softmax)</span>
      </div>
      <div class="checkbox-input-column-div">
        <input class="form-check-input" type="checkbox" v-model="measureFormat.autoJustify" :id="getId('auto-justify')">
        </input>
      </div>
      <div class="checkbox-input-label-div">
        <label class="form-check-label" :for="getId('auto-justify')">Auto-Justify</label>
      </div>
      <div class="checkbox-input-column-div">
        <input class="form-check-input" type="checkbox" v-model="measureFormat.skipMeasureCount"
          :id="getId('skip-measure-count')">
        </input>
      </div>
      <div class="checkbox-input-label-div">
        <span class="form-check-label" :for="getId('skip-measure-count')">Skip in max measure count</span>
      </div>
    </collapsableRow>
  </dialogContainer>
</template>