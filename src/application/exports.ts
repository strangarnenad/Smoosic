// Smoosic relies on dynamic creation of almost everything.  This class exports all the symbols
// that need to be created via reflection.
// ui application components
// vexflow interface
import { TextFormatter } from '../common/textformatter';
import { VexFlow } from '../common/vex';
import { SuiApplication } from './application';
import { SuiEventHandler } from './eventHandler';
import { SuiExceptionHandler } from '../ui/exceptions';
import { Qwerty } from '../ui/qwerty';
import { SuiPiano } from '../render/sui/piano';
import { SuiDom } from './dom';
import { SuiHelp } from '../ui/help';
import { CollapseRibbonControl, ExtendedCollapseParent } from '../ui/buttons/collapsable';
import { DisplaySettings } from '../ui/buttons/display';
import { SmoTranslationEditor } from '../ui/i18n/translationEditor';
import { SmoConfiguration } from './configuration';
import { RibbonButtons } from '../ui/buttons/ribbon';
import { simpleRibbonLayout } from '../ui/ribbonLayout/default/tabletRibbon';
import { ModalEventHandler } from './common';
// Language strings
import { cardKeysHtmlEn, cardNotesLetterHtmlEn, cardNotesChromaticHtmlEn, cardNotesChordsHtmlEn,
  cardNotesRestsHtmlEn, cardDurationNotesHtmlEn, cardDurationTupletsHtmlEn,
  cardSelectionsNotesHtmlEn, cardSelectionsModifiersHtmlEn, cardSelectionsNonSelectableHtmlEn, cardSelectionsSlashHtmlEn,
  cardBeamsAndStemsDirectionHtmlEn, cardBeamsAndStemsGroupingHtmlEn,
  cardMeasuresAddDeleteHtmlEn, cardVoicesCreateDeleteHtmlEn, cardPartAddDeleteHtmlEn
} from '../ui/i18n/language_en';

// ui dialogs and menus
// Dialogs
import { SuiDialogBase } from '../ui/dialogs/dialog';
import { SuiGraceNoteAdapter, SuiGraceNoteDialog, SuiGraceNoteButtonsComponent } from '../ui/dialogs/gracenote';
import { SuiModifierDialogFactory } from '../ui/dialogs/factory';
import { SuiTransposeScoreDialog, SuiTransposeScoreAdapter } from '../ui/dialogs/transposeScore';
import { SuiMeasureDialog } from '../ui/dialogs/measureFormat';
import { SuiInsertMeasures } from '../ui/dialogs/addMeasure';
import { SuiInstrumentDialog } from '../ui/dialogs/instrument';
import { SuiTimeSignatureDialog } from '../ui/dialogs/timeSignature';
import { SuiTempoDialog } from '../ui/dialogs/tempo';
import { SuiNoteHeadAdapter, SuiNoteHeadDialog, SuiNoteHeadButtonComponent, SuiStemButtonComponent } from '../ui/dialogs/noteHead';
import { SuiEndingsAdapter, SuiEndingsDialog, 
  SuiEndBarButtonComponent, SuiStartBarButtonComponent, SuiRepeatSymbolButtonComponent } from '../ui/dialogs/endings';
import { SuiScoreIdentificationDialog } from '../ui/dialogs/scoreId';
import { SuiScorePreferencesDialog } from '../ui/dialogs/preferences';
import { SuiPageLayoutDialog } from '../ui/dialogs/pageLayout';
import { SuiTextBracketDialog } from '../ui/dialogs/textBracket';
import { SuiScoreFontDialog } from '../ui/dialogs/fonts';
import { SuiGlobalLayoutDialog } from '../ui/dialogs/globalLayout';
import { SuiScoreViewDialog } from '../ui/dialogs/scoreView';import { SuiLibraryDialog } from '../ui/dialogs/library';
import { SuiChordChangeDialog } from '../ui/dialogs/chordChange';
import { SuiLyricDialog } from '../ui/dialogs/lyric';
import { SuiTextBlockDialog, helpModal } from '../ui/dialogs/textBlock';
import { SuiDynamicModifierDialog } from '../ui/dialogs/dynamics';
import { SuiSlurAttributesDialog } from '../ui/dialogs/slur';
import { SuiPedalMarkingDialog } from '../ui/dialogs/pedalMarking';
import { SuiTieAttributesDialog } from '../ui/dialogs/tie';
import { SuiVoltaAttributeDialog } from '../ui/dialogs/volta';
import { SuiHairpinAttributesDialog } from '../ui/dialogs/hairpin';
import { SuiStaffGroupDialog } from '../ui/dialogs/staffGroup';
import { SuiOrnamentDialog, SuiOrnamentButtonComponent } from '../ui/dialogs/ornament';
import { SuiArticulationDialog, SuiArticulationButtonComponent, SuiArticulationAdapter } from '../ui/dialogs/articulation';
import { SuiMicrotoneAdapter, SuiMicrotoneButtonComponent, SuiMicrotoneDialog } from '../ui/dialogs/microtones';
import { SuiArpeggioDialog } from '../ui/dialogs/arpeggio';
import { SuiClefChangeDialog } from '../ui/dialogs/clefChange';
import { SuiPartInfoDialog } from '../ui/dialogs/partInfo';
import { SuiLoadMxmlDialog, SuiLoadFileDialog,
    /* SuiLoadActionsDialog,  SuiSaveActionsDialog, */
    SuiPrintFileDialog, SuiSaveFileDialog, SuiSaveXmlDialog,
    SuiSaveMidiDialog, SuiSaveVexDialog } from '../ui/dialogs/fileDialogs';
    // Dialog components

import { SuiTextInputComponent, SuiTextInputComposite, SuiReadOnlyTextComponent } from '../ui/dialogs/components/textInput';
import { SuiDropdownComponent, SuiDropdownComposite } from '../ui/dialogs/components/dropdown';
import { SuiButtonComposite, SuiButtonComponent } from '../ui/dialogs/components/button';
import { SuiButtonArrayComponent, SuiButtonArrayMSComponent } from '../ui/dialogs/components/buttonArray';
import { SuiToggleComponent, SuiToggleComposite } from '../ui/dialogs/components/toggle';
import { SuiFileDownloadComponent } from '../ui/dialogs/components/fileDownload';
import { SuiRockerComponent, SuiRockerComposite } from '../ui/dialogs/components/rocker';
import { SuiFontComponent } from '../ui/dialogs/components/fontComponent';
import { SuiTextBlockComponent } from '../ui/dialogs/components/textInPlace';
import { SuiTreeComponent } from '../ui/dialogs/components/tree';
import { SuiPitchArrayComponent, SuiPitchArrayComponentTab, 
   SuiPitchComponent, SuiPitchComposite } from '../ui/dialogs/components/pitch';
import {
    SuiLyricComponent, SuiChordComponent,
    SuiNoteTextComponent
} from '../ui/dialogs/components/noteText';
import { SuiDragText } from '../ui/dialogs/components/dragText';
import { SuiTextInPlace } from '../ui/dialogs/components/textInPlace';
import { CheckboxDropdownComponent } from '../ui/dialogs/components/checkdrop';
import { TieMappingComponent } from '../ui/dialogs/components/tie';
import { StaffAddRemoveComponent,
    StaffCheckComponent} from '../ui/dialogs/components/staffComponents';
import { SuiKeySignatureDialog, SuiKeySignatureAdapter } from '../ui/dialogs/keySignature';
import { TextCheckComponent } from '../ui/dialogs/components/textCheck';
// menus
import { SuiMenuManager} from '../ui/menus/manager';
import { SuiMenuBase } from '../ui/menus/menu';
import { SuiScoreMenu } from '../ui/menus/score';
import { SuiTextMenu } from '../ui/menus/text';
import { SuiPartMenu } from '../ui/menus/parts';
import { SuiVoiceMenu } from '../ui/menus/voices';
import { SuiBeamMenu } from '../ui/menus/beams';
import { SuiPartSelectionMenu } from '../ui/menus/partSelection';
import { SuiDynamicsMenu } from '../ui/menus/dynamics';
import { SuiTimeSignatureMenu } from '../ui/menus/timeSignature';
import { SuiKeySignatureMenu } from '../ui/menus/keySignature';
import { SuiStaffModifierMenu } from '../ui/menus/staffModifier';
import { SuiFileMenu } from '../ui/menus/file';
import { SuiLanguageMenu } from '../ui/menus/language';
import { SmoLanguage, SmoTranslator } from '../ui/i18n/language';
import { SuiMeasureMenu } from '../ui/menus/measure';
import { SuiNoteMenu } from '../ui/menus/note';
import { SuiXhrLoader } from '../ui/fileio/xhrLoader';
import { PromiseHelpers } from '../common/promiseHelpers';
// render library
import { SuiScoreView } from '../render/sui/scoreView';
import { SuiScoreViewOperations } from '../render/sui/scoreViewOperations';
import { SuiScoreRender } from '../render/sui/scoreRender';
import { layoutDebug } from '../render/sui/layoutDebug';
import { SuiMapper } from '../render/sui/mapper';
import { SuiScroller } from '../render/sui/scroller';
import { SvgHelpers } from '../render/sui/svgHelpers';

// audio library
import { SuiAudioPlayer } from '../render/audio/player';
import { SuiOscillator, SuiSampler, SuiReverb } from '../render/audio/oscillator';
import { SuiSampleMedia } from '../render/audio/samples';


// SMO object model
import { SmoScore, engravingFontTypes, isEngravingFont } from '../smo/data/score';
import { UndoBuffer } from '../smo/xform/undo';
import { SmoNote } from '../smo/data/note';
// import { SmoDuration } from '../smo/xform/tickDuration';
import { createLoadTests } from '../../tests/file-load';
import { SmoStaffHairpin, StaffModifierBase, SmoInstrument, SmoSlur, SmoTie, SmoStaffTextBracket,
  SmoTabStave, SmoPedalMarking
 } from '../smo/data/staffModifiers';
import { SmoMeasure } from '../smo/data/measure';
import { SmoMusic } from '../smo/data/music';
import { SmoAudioPitch } from '../smo/data/music';
import { SmoSelection, SmoSelector } from '../smo/xform/selections';
import { SmoOrnament, SmoArticulation, SmoDynamicText, SmoGraceNote, SmoMicrotone, SmoLyric,
  SmoArpeggio, SmoClefChange } from '../smo/data/noteModifiers';
import { SmoSystemStaff } from '../smo/data/systemStaff';
import { SmoSystemGroup, SmoAudioPlayerSettings, SmoScorePreferences } from '../smo/data/scoreModifiers';
import { SmoTextGroup, SmoTextGroupParams } from '../smo/data/scoreText';
import { SmoOperation } from '../smo/xform/operations';
import {
    SmoRehearsalMark, SmoMeasureFormat, SmoBarline, SmoRepeatSymbol,
    SmoVolta, SmoMeasureText, SmoTempoText, TimeSignature
} from '../smo/data/measureModifiers';
import { SmoToXml } from '../smo/mxml/smoToXml';
import { MidiToSmo } from '../smo/midi/midiToSmo';
import { SmoToMidi } from '../smo/midi/smoToMidi';
import { XmlToSmo } from '../smo/mxml/xmlToSmo';
import { SmoToVex } from '../render/vex/toVex';
// utilities
import { buildDom, addFileLink, InputTrapper, draggable, closeDialogPromise, getDomContainer, createTopDomContainer } from '../common/htmlHelpers';

import { renderVexTests } from './generateVexTests';
import { SuiDurationAdapter, SuiDurationButtonComponent, SuiDurationDialog } from '../ui/dialogs/durations';
import { SuiPitchAdapter, SuiPitchDialog, SuiLetterButtonComponent, SuiIntervalButtonComponent, SuiTransposeButtonComponent } from '../ui/dialogs/pitch';
const getClass = (jsonString: string) => {
    return eval('Smo.' + jsonString);
};
export const Smo = {
    // Application-level classes
    SmoConfiguration,
    SuiApplication,
    SuiDom,  SuiEventHandler, SuiExceptionHandler,
    Qwerty, SuiHelp, SmoTranslationEditor, ModalEventHandler,
    // Ribbon buttons
    simpleRibbonLayout,
    RibbonButtons,
    DisplaySettings,  ExtendedCollapseParent, CollapseRibbonControl,
    // Menus
    SuiMenuManager, SuiMenuBase, SuiScoreMenu, SuiFileMenu,
    SuiDynamicsMenu, SuiTimeSignatureMenu, SuiKeySignatureMenu, SuiStaffModifierMenu,
    SuiLanguageMenu, SuiMeasureMenu, SuiNoteMenu, SmoLanguage, SmoTranslator, SuiPartMenu,
    SuiPartSelectionMenu, SuiTextMenu, SuiVoiceMenu, SuiBeamMenu,
    // Dialogs
    SuiGraceNoteAdapter, SuiGraceNoteDialog, SuiGraceNoteButtonsComponent,
    SuiDurationAdapter, SuiDurationDialog, SuiDurationButtonComponent,
    SuiTempoDialog, SuiInstrumentDialog, SuiModifierDialogFactory, SuiLibraryDialog,
    SuiTextBracketDialog, SuiKeySignatureDialog, SuiKeySignatureAdapter,
    SuiScoreViewDialog, SuiGlobalLayoutDialog, SuiScoreIdentificationDialog, SuiTransposeScoreAdapter,
    SuiTransposeScoreDialog,
    SuiScoreFontDialog, SuiPageLayoutDialog, SuiMeasureDialog, SuiInsertMeasures,
    SuiTimeSignatureDialog,SuiTextBlockDialog, SuiLyricDialog, SuiChordChangeDialog,
    SuiSlurAttributesDialog, SuiPedalMarkingDialog, SuiTieAttributesDialog, SuiVoltaAttributeDialog,
    SuiHairpinAttributesDialog, SuiStaffGroupDialog, helpModal,
    SuiLoadFileDialog, SuiLoadMxmlDialog, SuiScorePreferencesDialog,
    SuiPartInfoDialog, SuiOrnamentDialog, SuiOrnamentButtonComponent, 
    SuiArticulationDialog, SuiArticulationButtonComponent, SuiArticulationAdapter,
    SuiMicrotoneAdapter, SuiMicrotoneButtonComponent, SuiMicrotoneDialog,
    SuiNoteHeadAdapter, SuiNoteHeadDialog, SuiStemButtonComponent, SuiNoteHeadButtonComponent,    
    SuiEndingsAdapter, SuiEndingsDialog, 
    SuiEndBarButtonComponent, SuiStartBarButtonComponent, SuiRepeatSymbolButtonComponent,    
    /* SuiLoadActionsDialog, SuiSaveActionsDialog, */
    SuiPrintFileDialog, SuiSaveFileDialog, SuiSaveXmlDialog, SuiSaveVexDialog,
    SuiSaveMidiDialog, SuiDialogBase, 
    SuiPitchDialog, SuiPitchAdapter,SuiIntervalButtonComponent, SuiLetterButtonComponent,
    SuiTransposeButtonComponent,
    // Dialog components
    SuiTreeComponent,
    SuiDropdownComponent,
    SuiRockerComponent, SuiFileDownloadComponent, SuiButtonArrayComponent, SuiButtonArrayMSComponent,
    SuiToggleComponent, SuiButtonComponent, SuiDropdownComposite,
    SuiToggleComposite, SuiButtonComposite, SuiRockerComposite, SuiTextInputComposite,
    SuiFontComponent, SuiTextInPlace, SuiLyricComponent, SuiChordComponent, SuiDragText,
    SuiNoteTextComponent, SuiTextBlockComponent, SuiTextInputComponent, SuiReadOnlyTextComponent,
    SuiDynamicModifierDialog, CheckboxDropdownComponent, TieMappingComponent, StaffAddRemoveComponent,
    StaffCheckComponent, TextCheckComponent, SuiArpeggioDialog, SuiClefChangeDialog,
    SuiPitchArrayComponent, SuiPitchArrayComponentTab, SuiPitchComponent,

  SuiPitchComposite, 
    SuiXhrLoader,PromiseHelpers,
    // Rendering components
    SuiPiano, layoutDebug, SuiScoreView,SuiScroller, SvgHelpers, SuiMapper, SuiScoreRender,
    SuiScoreViewOperations, TextFormatter, VexFlow,

    // Audio components
    SuiAudioPlayer, SuiOscillator, SuiSampleMedia, SuiSampler, SuiReverb,

    // Smo Music Objects
    SmoScore,
    SmoScorePreferences, 
    engravingFontTypes, isEngravingFont,
    XmlToSmo,
    SmoToXml,
    MidiToSmo,
    SmoToMidi,
    SmoMusic,
    SmoAudioPitch,
    SmoMeasure,
    SmoSystemStaff,
    SmoNote,
    // staff modifier
    SmoStaffHairpin, StaffModifierBase,
    SmoStaffTextBracket,
    SmoInstrument, SmoSlur, SmoPedalMarking, SmoTie, SmoTabStave,
    // score modifiers
    SmoSystemGroup, SmoAudioPlayerSettings, SmoTextGroup,
    // measure modifiers
    SmoRehearsalMark, SmoMeasureFormat, SmoBarline, SmoRepeatSymbol,
    SmoVolta, SmoMeasureText, SmoTempoText, TimeSignature,
    // note modifiers
    SmoOrnament,
    SmoArticulation, SmoDynamicText, SmoGraceNote, SmoMicrotone, SmoLyric, SmoArpeggio, SmoClefChange,
    // Smo Transformers
    SmoSelection, SmoSelector, /*SmoDuration,*/ UndoBuffer, SmoToVex, SmoOperation,
    // new score bootstrap
    // help strings
    cardKeysHtmlEn, cardNotesLetterHtmlEn, cardNotesChromaticHtmlEn, cardNotesChordsHtmlEn,
      cardNotesRestsHtmlEn, cardDurationNotesHtmlEn, cardDurationTupletsHtmlEn,
      cardSelectionsNotesHtmlEn, cardSelectionsModifiersHtmlEn, cardSelectionsNonSelectableHtmlEn, cardSelectionsSlashHtmlEn,
      cardBeamsAndStemsDirectionHtmlEn, cardBeamsAndStemsGroupingHtmlEn,
      cardMeasuresAddDeleteHtmlEn, cardVoicesCreateDeleteHtmlEn, cardPartAddDeleteHtmlEn,
      getClass,
    createLoadTests,
    // utilities
    buildDom, addFileLink, InputTrapper, draggable, closeDialogPromise, getDomContainer, createTopDomContainer,
    renderVexTests
}
export default Smo;