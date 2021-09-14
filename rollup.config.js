import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import del from 'rollup-plugin-delete';
import svgr from '@svgr/rollup';
// eslint-disable-next-line import/no-anonymous-default-export
export default [
    // CommonJS
    {
        input: 'src/index.ts',
        output: {
            dir: './',
            entryFileNames: 'lib/cjs/index.js',
            format: 'cjs',
            globals:{
                'lodash': '_'
            }
        },
        plugins: [
            del({ targets: 'lib/*' }),
            peerDepsExternal(),
            resolve(),
            svgr()
        ],
        external: ['lodash']
    },
]