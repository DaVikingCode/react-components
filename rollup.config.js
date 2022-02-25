import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import del from 'rollup-plugin-delete';
import svgr from '@svgr/rollup';
import commonjs from '@rollup/plugin-commonjs'

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
            typescript({
                tsconfig: './tsconfig.lib.json',
                declaration: true,
                declarationDir: 'types/',
                rootDir: 'src/',
                noEmit: true
            }),
            peerDepsExternal(),
            resolve(),
            svgr(),
            commonjs()
        ],
        external: ['lodash']
    },
]
