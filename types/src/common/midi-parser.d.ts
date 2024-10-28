export function parseMidi(data: any): {
    header: {
        format: any;
        numTracks: any;
    };
    tracks: {
        deltaTime: any;
        meta: boolean;
        type: string;
        number: any;
        text: string;
        channel: any;
        port: any;
        microsecondsPerBeat: any;
        frameRate: any;
        hour: number;
        min: any;
        sec: any;
        frame: any;
        subFrame: any;
        numerator: any;
        denominator: number;
        metronome: any;
        thirtyseconds: any;
        key: any;
        scale: any;
        data: any;
        metatypeByte: any;
        running: boolean;
        noteNumber: any;
        velocity: any;
        byte9: boolean;
        amount: any;
        controllerType: any;
        value: any;
        programNumber: any;
    }[][];
};
//# sourceMappingURL=midi-parser.d.ts.map