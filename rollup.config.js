import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import del from 'rollup-plugin-delete';
import svgr from '@svgr/rollup';
import commonjs from '@rollup/plugin-commonjs'
import css from "rollup-plugin-import-css";

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
            commonjs({
                include: 'node_modules/**',
                namedExports: {
                    'node_modules/rc-util/node_modules/react-is/index.js': ['isFragment', 'useMemo', 'isMemo'],
                    'node_modules/react-is/index.js': ['isFragment', 'useMemo', 'isMemo']
                }
            }),
            css()
        ],
        external: ['lodash']
    },
]
