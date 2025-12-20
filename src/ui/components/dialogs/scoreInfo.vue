<script setup lang="ts">
import { SmoScoreInfo } from '../../../smo/data/scoreModifiers';
import DialogButtons from './dialogButtons.vue';
import draggableComp from './draggableComp.vue';
import { draggableSession } from '../../composable/draggable';
import { ref, Ref, watch } from 'vue';
interface Props {
  domId: string,
  label: string,
  getScoreInfo: () => SmoScoreInfo,
  commitCb: () => void,
  cancelCb: () => void
}
const props = defineProps<Props>();
const { domId, label, getScoreInfo, commitCb, cancelCb } = { ...props };
const scoreInfo = getScoreInfo();
const name: Ref<string> = ref(scoreInfo.name);
const title: Ref<string> = ref(scoreInfo.title);
const subTitle: Ref<string> = ref(scoreInfo.subTitle);
const composer: Ref<string> = ref(scoreInfo.composer);
const copyright: Ref<string> = ref(scoreInfo.copyright);
type infoKey = 'name' | 'title' | 'subTitle' | 'composer' | 'copyright';
interface infoField {
  field: infoKey,
  value: Ref<string>
}
const infoFields: infoField[] = [
  {
    field: 'name',
    value: name
  }, {
    field: 'title',
    value: title
  }, {
    field: 'subTitle',
    value: subTitle
  }, {
    field: 'composer',
    value: composer
  }, {
    field: 'copyright',
    value: copyright
  }];
infoFields.forEach((f) => {
  watch(f.value, () => {
    scoreInfo[f.field] = f.value.value;
  });
});
const getDomId = () => {
  return `attr-modal-dialog-${domId}`;
}
const getId = (str: string) => {
  return `${domId}-${str}`;
}
const draggable = draggableSession(getDomId());
</script>
<template>
  <div class="attributeModal" :id="getDomId()" :style="draggable.getLocString()">
    <div class="text-center mw-50" :id="getId('modal-content')">
      <draggableComp :draggableSession="draggable" />
      <div class="row mb-2 nw-50">
        <h2 class="dialog-label">{{ label }}</h2>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-8">
          <input type="text" class="form-control" :placeholder="infoFields['name']" aria-label="Score Name"
            :id="getId('score-name-input')" v-model="name">
        </div>
        <div class="col col-4 text-start">
          <span class="" :id="getId('score-name-label')">Name</span>
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-8">
          <input type="text" class="form-control" :placeholder="infoFields['title']" aria-label="Score Name"
            :id="getId('score-title-input')" v-model="title">
        </div>
        <div class="col col-4 text-start">
          <span class="" :id="getId('score-title-label')">Title</span>
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-8">
          <input type="text" class="form-control" :placeholder="infoFields['subTitle']" aria-label="Score Name"
            :id="getId('score-subtitle-input')" v-model="subTitle">
        </div>
        <div class="col col-4 text-start">
          <span class="" :id="getId('score-subtitle-label')">Subtitle</span>
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-8">
          <input type="text" class="form-control" :placeholder="infoFields['composer']" aria-label="Score Name"
            :id="getId('score-composer-input')" v-model="composer">
        </div>
        <div class="col col-4 text-start">
          <span class="" :id="getId('score-composer-label')">Composer</span>
        </div>
      </div>
      <div class="row mb-2 align-items-center">
        <div class="col col-8">
          <input type="text" class="form-control" :placeholder="infoFields['copyright']" aria-label="Score Name"
            :id="getId('score-copyright-input')" v-model="copyright">
          </input>
        </div>
        <div class="col col-4 text-start">
          <span class="" :id="getId('score-copyright-label')">Copyright</span>
        </div>
      </div>
      <DialogButtons :enable="true" :commitCb="props.commitCb" :cancelCb="props.cancelCb" />
    </div>
  </div>
</template>