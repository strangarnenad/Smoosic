// [Smoosic](https://github.com/AaronDavidNewman/Smoosic)
// Copyright (c) Aaron David Newman 2021.
import { FontInfo } from '../../common/vex';
import { SmoScore, isEngravingFont } from '../../smo/data/score';
import { SuiDialogParams, InstallDialog } from './dialog';
import { replaceVueRoot, modalContainerId } from '../common';
import { reactive, watch, ref } from 'vue';
import scoreFontsApp from '../components/dialogs/scoreFonts.vue';

declare var $: any;
export const SuiScoreFontDialogVue = (parameters: SuiDialogParams) => {
  const currentFonts = parameters.view.score.fonts;
  const backupFonts = JSON.parse(JSON.stringify(currentFonts));
  let changed = false;
  const engravingFontInfo = currentFonts.find((ff) => ff.purpose === SmoScore.fontPurposes.ENGRAVING);
  if (!engravingFontInfo) {
    throw new Error('No engraving font found in score');
  }
  const chordFontInfo = currentFonts.find((ff) => ff.purpose === SmoScore.fontPurposes.CHORDS);
  if (!chordFontInfo) {
    throw new Error('No chord font found in score');
  }
  const lyricFontInfo = currentFonts.find((ff) => ff.purpose === SmoScore.fontPurposes.LYRICS);
  if (!lyricFontInfo) {
    throw new Error('No lyric font found in score');
  }
  const engravingFont = ref(engravingFontInfo.family ?? 'Bravura');
  const lyricFontCb = async  (fontInfo: FontInfo) => {
    changed = true;
    await parameters.view.setLyricFont(fontInfo);
  }
  const chordFontCb = async (fontInfo: FontInfo) => {
    changed = true;
    await parameters.view.setChordFont(fontInfo);
  }
  watch(engravingFont, async (newVal) => {
    changed = true;
    if  (isEngravingFont(newVal)) {
      await parameters.view.setEngravingFontFamily(newVal);
    }
  });
  const getFonts = () => {
    return {
      engravingFont,
      lyricFont: lyricFontInfo,
      chordFont: chordFontInfo
    }
  }
  const commitCb = async () => {}
  const cancelCb = async () => {
    if (changed) {
      await parameters.view.setEngravingFontFamily(backupFonts.find((ff) => ff.purpose === SmoScore.fontPurposes.ENGRAVING)?.family ?? 'Bravura');
      await parameters.view.setChordFont({
        weight: 'normal',
        style: 'normal',
        ...backupFonts.find((ff) => ff.purpose === SmoScore.fontPurposes.CHORDS)
      });
      await parameters.view.setLyricFont({
        weight: 'normal',
        style: 'normal',
        ...backupFonts.find((ff) => ff.purpose === SmoScore.fontPurposes.LYRICS)
      });
    }
  }
  const rootId = replaceVueRoot(modalContainerId);
  const appParams = {
    domId: rootId,
    label: 'Score Fonts',
    getFonts,
    updateLyricFontCb: lyricFontCb,
    updateChordFontCb: chordFontCb,
  };
  InstallDialog({
    app: scoreFontsApp,
    appParams,
    root: rootId,
    dialogParams: parameters,
    commitCb, 
    cancelCb
  });

}

