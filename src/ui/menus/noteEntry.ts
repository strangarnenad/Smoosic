export class NoteEntryMenu {
    static get menuItems() {
      return {
        noteEntryToggle: {
          label: 'Note Entry',
          icon: 'note-entry-icon',
          action: 'toggleNoteEntry',
          type: 'toggle'
        },
        noteMode: {
          label: 'Note',
          icon: 'note-icon',
          action: 'setNoteMode',
          type: 'radio',
          group: 'entryMode'
        },
        restMode: {
          label: 'Rest',
          icon: 'rest-icon',
          action: 'setRestMode',
          type: 'radio',
          group: 'entryMode'
        },
        durationWhole: {
          label: '𝅝',
          action: 'setDuration',
          duration: { numerator: 16384, denominator: 1, remainder: 0 },
          type: 'button'
        },
        durationHalf: {
          label: '��𝅥',
          action: 'setDuration',
          duration: { numerator: 8192, denominator: 1, remainder: 0 },
          type: 'button'
        },
        durationQuarter: {
          label: '♩',
          action: 'setDuration',
          duration: { numerator: 4096, denominator: 1, remainder: 0 },
          type: 'button'
        },
        durationEighth: {
          label: '♪',
          action: 'setDuration',
          duration: { numerator: 2048, denominator: 1, remainder: 0 },
          type: 'button'
        },
        durationSixteenth: {
          label: '��𝅯',
          action: 'setDuration',
          duration: { numerator: 1024, denominator: 1, remainder: 0 },
          type: 'button'
        }
      };
    }
  }