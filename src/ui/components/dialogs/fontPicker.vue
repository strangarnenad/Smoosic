<script setup lang="ts">
import { FontInfo } from '../../../common/vex';
import { SelectOption } from '../../common';
import { SourceSerifProFont } from '../../../styles/font_metrics/ssp-serif-metrics';
import { SourceSansProFont } from '../../../styles/font_metrics/ssp-sans-metrics';
import selectComp from './select.vue';

import numberInputApp from './numberInput.vue';
import { ref, Ref, reactive, watch } from 'vue';
interface Props {
  domId: string,
  label: string,
  font: FontInfo
};
const props = defineProps<Props>();
const fontFamilies: SelectOption[] = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Serif', value: SourceSerifProFont.fontFamily },
  { label: 'Sans', value: SourceSansProFont.fontFamily },
  { label: 'Roboto Slab', value: 'Roboto Slab' },
  { label: 'Petaluma', value: 'Petaluma Script' },
  { label: 'Commissioner', value: 'Commissioner' },
  { label: 'Concert One', value: 'ConcertOne' },
  { label: 'Merriweather', value: 'Merriweather' }
]
const { domId, font } = { ...props };
const getDomId = () => {
  return `fontpick-${domId}`;
}
const getId = (str: string) => {
  return `${getDomId()}-${str}`;
}
const fontSize = ref(12);

const fontCopy = reactive({
  family: font.family ?? 'Arial',
  size: font.size ?? 12,
  weight: font.weight ?? 'normal',
  style: font.style ?? 'normal'
});
if (!isNaN(fontCopy.size as number)) {
  fontSize.value = fontCopy.size as number;
}
const isBold = ref(fontCopy.weight === 'bold');
watch(isBold, (newVal) => {
  fontCopy.weight = newVal ? 'bold' : 'normal';
});
const isItalic = ref(fontCopy.style === 'italic');
watch(isItalic, (newVal) => {
  fontCopy.style = newVal ? 'italic' : 'normal';
});
const changeSizeCb = async (size: number) => {
  fontCopy.size = size;
};
const changeFamilyCb = async (family: string) => {
  fontCopy.family = family;
};
</script>
<template>
  <div class="row mb-2 ms-2">
    <div class="col col-3">
      <label class="form-label fw-bolder" :for="getId('size-label')">{{ label }}</label>
    </div>
    <div class="col col-5 pe-0">
      <selectComp :domId="getId('font-family-select')" :label="''" :selections="fontFamilies"
        :initialValue="fontCopy.family" :changeCb="changeFamilyCb" />
    </div>
    <div class="col col-3">
      <label class="form-label" :for="getId('family-label')">Font Family</label>
    </div>
  </div>
  <div class="row mb-2 ms-2">
    <div class="col col-4 pe-0">
      <numberInputApp :domId="getId('page-width-input')" :initialValue="fontSize" :precision="1"
        :changeCb="changeSizeCb" :disabled="false" />
    </div>
    <div class="col col-2 text-start ps-0 pe-0">
      <label class="form-label" :for="getId('size-label')">Size</label>
    </div>
    <div class="col col-3 ps-0">
      <input class="form-check-input me-2" type="checkbox" v-model="isBold" :id="getId('font-weight')"></input>
      <label class="form-check-label" :for="getId('font-weight')">Bold</label>
    </div>
    <div class="col col-3 ps-0">
      <input class="form-check-input me-2" type="checkbox" v-model="isItalic" :id="getId('font-style')"></input>
      <label class="form-check-label" :for="getId('font-style')">Italic</label>
    </div>
  </div>
</template>