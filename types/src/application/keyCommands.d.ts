import { SuiScoreViewOperations } from '../render/sui/scoreViewOperations';
import { BrowserEventSource } from '../ui/eventSource';
import { SuiTracker } from '../render/sui/tracker';
import { KeyCommandParams } from './common';
import { CompleteNotifier } from '../ui/common';
import { PitchLetter, KeyEvent, keyHandler } from '../smo/data/common';
export interface EditorKeyHandler {
    transposeUp: keyHandler;
    transposeDown: keyHandler;
    upOctave: keyHandler;
    toggleCourtesyAccidental: keyHandler;
    toggleEnharmonic: keyHandler;
    doubleDuration: keyHandler;
    halveDuration: keyHandler;
    dotDuration: keyHandler;
    undotDuration: keyHandler;
    setPitch: keyHandler;
    slashGraceNotes: keyHandler;
    addGraceNote: keyHandler;
    removeGraceNote: keyHandler;
    playScore: keyHandler;
    stopPlayer: keyHandler;
    makeTuplet: keyHandler;
    interval: keyHandler;
    unmakeTuplet: keyHandler;
    addMeasure: keyHandler;
    deleteNote: keyHandler;
    unbeamSelections: keyHandler;
    beamSelections: keyHandler;
    addRemoveAccent: keyHandler;
    addRemoveTenuto: keyHandler;
    addRemoveStaccato: keyHandler;
}
/**
 * KeyCommands object handles key events and converts them into commands: keyHandler, updating the score and
 * display
 * @category SuiApplication
 * */
export declare class SuiKeyCommands implements EditorKeyHandler {
    view: SuiScoreViewOperations;
    slashMode: boolean;
    completeNotifier: CompleteNotifier;
    tracker: SuiTracker;
    eventSource: BrowserEventSource;
    constructor(params: KeyCommandParams);
    tempoDialog(): void;
    get score(): import("./exports").SmoScore;
    undo(): void;
    copy(): Promise<void>;
    paste(): Promise<void>;
    unbeamSelections(): Promise<void>;
    beamSelections(): Promise<void>;
    toggleBeamDirection(): Promise<void>;
    collapseChord(): Promise<void>;
    togglePlayer(): void;
    playScore(): void;
    stopPlayer(): void;
    pausePlayer(): void;
    intervalAdd(interval: number, direction: number): Promise<void>;
    interval(ev?: KeyEvent): Promise<void>;
    transpose(offset: number): Promise<void>;
    transposeDown(): Promise<void>;
    transposeUp(): Promise<void>;
    upOctave(): Promise<void>;
    downOctave(): Promise<void>;
    makeRest(): Promise<void>;
    setPitchCommand(letter: PitchLetter): Promise<void>;
    setPitch(ev?: KeyEvent): Promise<void>;
    dotDuration(): Promise<void>;
    undotDuration(): Promise<void>;
    doubleDuration(): Promise<void>;
    halveDuration(): Promise<void>;
    addMeasure(keyEvent?: KeyEvent): Promise<void>;
    deleteNote(): Promise<void>;
    toggleCourtesyAccidental(): Promise<void>;
    toggleEnharmonic(): Promise<void>;
    makeTupletCommand(numNotes: number): Promise<void>;
    makeTuplet(keyEvent?: KeyEvent): Promise<void>;
    unmakeTuplet(): Promise<void>;
    setNoteHead(): Promise<void>;
    removeGraceNote(): Promise<void>;
    addGraceNote(): Promise<void>;
    slashGraceNotes(): Promise<void>;
    toggleArticulationCommand(articulation: string, ctor: string): Promise<void>;
    addRemoveAccent(): Promise<void>;
    addRemoveTenuto(): Promise<void>;
    addRemoveStaccato(): Promise<void>;
    addRemoveMarcato(): Promise<void>;
    addRemovePizzicato(): Promise<void>;
}
