declare const BUILD_DIR: string;
import CopyPlugin = require("copy-webpack-plugin");
export let mode: string;
export let entry: string;
export namespace output {
    export { BUILD_DIR as path };
    export let filename: string;
    export let library: string;
    export let libraryTarget: string;
    export let libraryExport: string;
    export let globalObject: string;
}
export namespace resolve {
    let extensions: string[];
}
export let devtool: string;
export namespace externals {
    let jszip: string;
}
export namespace stats {
    let assets: boolean;
    let modules: boolean;
    let outputPath: boolean;
    let usedExports: boolean;
}
export namespace module {
    let rules: {
        test: RegExp;
        include: {
            or: string[];
        };
        use: {
            loader: string;
            options: {
                configFile: string;
            };
        }[];
    }[];
}
export let plugins: CopyPlugin[];
export {};
//# sourceMappingURL=webpack.config.d.ts.map