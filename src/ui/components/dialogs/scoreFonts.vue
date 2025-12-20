<script setup lang="ts">
import { ref, Ref, watch, reactive } from 'vue';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import selectComp from './select.vue';
import fontPickerApp from './fontPicker.vue';
import { SelectOption } from '../../common';
import { draggableSession } from '../../composable/draggable';
import { FontInfo } from '../../../common/vex';

type scoreFontInfo = {
  lyricFont: FontInfo,
  chordFont: FontInfo,
  engravingFont: Ref<string>
}
interface Props {
  domId: string,
  label: string,
  getFonts: () => scoreFontInfo,
  updateLyricFontCb: (font: FontInfo) => void,
  updateChordFontCb: (font: FontInfo) => void,
  commitCb: () => void,
  cancelCb: () => void
}
const props = defineProps<Props>();
const { domId, label, getFonts, updateLyricFontCb, updateChordFontCb, commitCb, cancelCb } = { ...props };
const fontInfo = getFonts();
const engravingFontValue = fontInfo.engravingFont.value;
const engravingFonts: SelectOption[] = [{
  value: 'Bravura',
  label: 'Bravura'
}, {
  value: 'Gonville',
  label: 'Gonville'
}, {
  value: 'Petaluma',
  label: 'Petaluma'
}, {
  value: 'Leland',
  label: 'Leland'
}]
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const engravingFontChange = (val: string) => {
  fontInfo.engravingFont.value = val;
}
const draggable = draggableSession(getDomId());
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="draggable.getLocString()">
    <div class="text-center mw-40" :id="getId('modal-content')">
      <draggableComp :draggableSession="draggable" />
      <div class="row mb-2">
        <h2 class="dialog-label">{{ label }}</h2>
      </div>
      <div class="row mb-2 ms-2">
        <div class="col-6 col">
        <selectComp :domId="getId('score-font-select')" :label="'Engraving Font'" :selections="engravingFonts" :initialValue="engravingFontValue"
          :changeCb="engravingFontChange" />
        </div>
        <div class="col col-6 fw-bolder">
          <span>Engraving</span>
        </div>        
      </div>
      <div class="row mb-2 border-top dropdown-divider">
      </div>
        <fontPickerApp :domId="getId('chord-font-picker')" :font="fontInfo.chordFont" :label="'Chords'" />
      <div class="row mb-2 border-top dropdown-divider">
      </div>
        <fontPickerApp :domId="getId('lyric-font-picker')" :font="fontInfo.lyricFont" :label="'Lyrics'"/>
      <div class="row mb-2 border-top dropdown-divider">
      </div>
      <DialogButtons :enable="true" :commitCb="props.commitCb" :cancelCb="props.cancelCb" />
    </div>
  </div>
</template>