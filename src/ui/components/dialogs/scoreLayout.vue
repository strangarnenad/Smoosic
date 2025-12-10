<script setup lang="ts">
import { ref, Ref, watch, reactive } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import selectComp from './select.vue';
import numberInputApp from './numberInput.vue';
import { SelectOption } from '../../common';
import { SmoGlobalLayout } from '../../../smo/data/scoreModifiers';


interface Props {
  domId: string,
  label: string,
  initialValue: SmoGlobalLayout,
  changeCb: (value: SmoGlobalLayout) => void,
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
const currentLayout: SmoGlobalLayout = reactive({
  pageWidth: props.initialValue.pageWidth,
  pageHeight: props.initialValue.pageHeight,
  zoomScale: props.initialValue.zoomScale,
  svgScale: props.initialValue.svgScale,
  proportionality: props.initialValue.proportionality,
  maxMeasureSystem: props.initialValue.maxMeasureSystem,
  noteSpacing: props.initialValue.noteSpacing
})
const pageSizes: SelectOption[] = [
  { label: 'Letter', value: 'letter' },
  { label: 'Legal', value: 'legal' },
  { label: 'Tabloid', value: 'tabloid' },
  { label: 'A4', value: 'a4' },
  { label: 'Custom', value: 'custom' }
];
interface dimensions {
  width: number,
  height: number
}
const predefinedDimensions: { [key: string]: dimensions } = {
  'letter': { width: 816, height: 1056 },
  'legal': { width: 816, height: 1344 },
  'tabloid': { width: 1056, height: 1632 },
  'a4': { width: 794, height: 1123 }
};
const pageSize = ref('custom');
const pageChange = (val: string) => {
  pageSize.value = val;
};
const widthChange = async (val: number) => {
  currentLayout.pageWidth = val;
  await props.changeCb(currentLayout);
  setPageSize();
};
const heightChange = async (val: number) => {
  currentLayout.pageHeight = val;
  await props.changeCb(currentLayout);
  setPageSize();
};
const zoomChange = async (val: number) => {
  currentLayout.zoomScale = val;
  await props.changeCb(currentLayout);
};
const svgChange = async (val: number) => {
  currentLayout.svgScale = val;
  await props.changeCb(currentLayout);
};
const noteSpacingChange = async (val: number) => {
  currentLayout.noteSpacing = val;
  await props.changeCb(currentLayout);
};
const maxMeasureSystemChange = async (val: number) => {
  currentLayout.maxMeasureSystem = val;
  await props.changeCb(currentLayout);
};

const lockDimensions = ref(false);

const setPageSize = () => {
  Object.keys(predefinedDimensions).forEach((key) => {
    const dims = predefinedDimensions[key];
    if (dims.width === currentLayout.pageWidth &&
      dims.height === currentLayout.pageHeight) {
      pageSize.value = key;
    }
  });
}
setPageSize();
watch(pageSize, (newVal) => {
  if (predefinedDimensions[newVal]) {
    lockDimensions.value = true;
    const dims = predefinedDimensions[newVal];
    currentLayout.pageWidth = dims.width;
    currentLayout.pageHeight = dims.height;
    props.changeCb(currentLayout);
  } else {
    lockDimensions.value = false;
  }
});
if (predefinedDimensions[pageSize.value]) {
  lockDimensions.value = true
}
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const getLocString = () => {
  return `top: ${top}px; left: ${left}px;`;
}
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="getLocString()">
    <div class="text-center mw-40" :id="getId('modal-content')">
      <draggableComp :domId="getDomId()" :getCoordsCb="getCoordsCb" />
      <div class="row mb-2">
        <h2 class="dialog-label">{{ props.label }}</h2>
      </div>
      <div class="row mb-2">
        <div class="col col-3 text-end">Page Size</div>
        <div class="col col-6">
          <selectComp :domId="getId('page-size-select')" :label="''" :selections="pageSizes" :initialValue="pageSize"
            :changeCb="pageChange" />
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-4">
          <numberInputApp :domId="getId('page-width-input')" :initialValue="currentLayout.pageWidth" :precision="0"
            :changeCb="widthChange" :disabled="lockDimensions" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Page Width</span>
        </div>
        <div class="col col-4 ms-n4">
          <numberInputApp :domId="getId('page-height-input')" :initialValue="currentLayout.pageHeight" :precision="0"
            :changeCb="heightChange" :disabled="lockDimensions" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Page Height</span>
        </div>
      </div>
        <div class="row mb-2 align-items-center">
        <div class="col col-4">
          <numberInputApp :domId="getId('zoom-scale-input')" :initialValue="currentLayout.zoomScale" :precision="0"
            :percent=true :changeCb="zoomChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Zoom Scale (%)</span>
        </div>
        <div class="col col-4 ms-n4">
          <numberInputApp :domId="getId('svg-scale-input')" :initialValue="currentLayout.svgScale" :precision="0"
            :percent="true" :changeCb="svgChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">SVG Scale (%)</span>
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-4">
          <numberInputApp :domId="getId('note-spacing-input')" :initialValue="currentLayout.noteSpacing" :precision="2"
            :changeCb="noteSpacingChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Note Spacing</span>
        </div>
        <div class="col col-4 ms-n4">
          <numberInputApp :domId="getId('max-measure-system-input')" :initialValue="currentLayout.maxMeasureSystem"
            :precision="0" :changeCb="maxMeasureSystemChange" />
        </div>
        <div class="col col-2 fs-7 ms-n4 ps-0 text-start">
          <span class="form-check-label">Max Measures/System</span>
        </div>
      </div>
      <DialogButtons :enable="true" :commitCb="props.commitCb" :cancelCb="props.cancelCb" />
    </div>
  </div>
</template>