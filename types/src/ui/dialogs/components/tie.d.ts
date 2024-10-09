import { SuiDialogNotifier, DialogDefinitionElement, SuiComponentParent } from '../components/baseComponent';
import { SuiDropdownComposite } from '../components/dropdown';
import { SmoSelection } from '../../../smo/xform/selections';
import { SmoTie, TieLine } from '../../../smo/data/staffModifiers';
import { SmoNote } from '../../../smo/data/note';
/**
 * @category SuiDialog
 */
export interface PitchTieControlRow {
    leftControl: SuiDropdownComposite;
    rightControl: SuiDropdownComposite;
}
/**
 * @category SuiDialog
 */
export interface TieMappingComponentParams {
    id: string;
    classes: string;
    label: string;
    smoName: string;
    control: string;
    toggleElement: DialogDefinitionElement;
    dropdownElement: DialogDefinitionElement;
}
/**
 * Represent the pitches in 2 chords that can be individually tied together
 * @category SuiDialog
 */
export declare class TieMappingComponent extends SuiComponentParent {
    startSelection: SmoSelection | null;
    endSelection: SmoSelection | null;
    modifier: SmoTie;
    controlRows: PitchTieControlRow[];
    constructor(dialog: SuiDialogNotifier, parameter: TieMappingComponentParams);
    bind(): void;
    _generateOptions(note: SmoNote): {
        value: number;
        label: string;
    }[];
    getValue(): TieLine[];
    setValue(modifier: TieLine[]): void;
    changed(): void;
    get html(): import("../../../common/htmlHelpers").DomBuilder;
}
//# sourceMappingURL=tie.d.ts.map