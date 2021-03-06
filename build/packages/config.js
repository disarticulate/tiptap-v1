import path from 'path'
import vue from 'rollup-plugin-vue'
import cjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel'
import flow from 'rollup-plugin-flow-no-whitespace'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import cssOnly from 'rollup-plugin-css-only'

const resolve = _path => path.resolve(__dirname, '../../', _path)

function genConfig(opts) {
  const { version } = require(opts.package)
  const banner = `
    /*!
    * ${opts.name} v${version}
    * (c) ${new Date().getFullYear()} überdosis GbR (limited liability)
    * @license MIT
    */
  `
  const config = {
    input: {
      input: opts.input,
      plugins: [
        cssOnly({ output: false }),
        flow(),
        nodeResolve({
          browser: true
        }),
        cjs(),
        vue({
          css: true,
          compileTemplate: true,
        }),
        replace({
          __VERSION__: version,
        }),
        babel({
          exclude: 'node_modules/**',
        }),
      ],
      external(id) { return !/^[\.\/]/.test(id) },
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: opts.outputName,
    },
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env),
    }))
  }

  return config
}

export default [
  {
    package: 'tiptap-v1',
    outputName: 'tiptap-v1',
    outputFileName: 'tiptap-v1',
  },
  {
    package: 'tiptap-commands-v1',
    outputName: 'tiptapCommands-v1',
    outputFileName: 'commands-v1',
  },
  {
    package: 'tiptap-utils-v1',
    outputName: 'tiptapUtils-v1',
    outputFileName: 'utils-v1',
  },
  {
    package: 'tiptap-extensions-v1',
    outputName: 'tiptapExtensions-v1',
    outputFileName: 'extensions-v1',
  },
].map(item => [
  {
    name: item.package,
    outputName: item.outputName,
    package: resolve(`packages/${item.package}/package.json`),
    input: resolve(`packages/${item.package}/src/index.js`),
    file: resolve(`packages/${item.package}/dist/${item.outputFileName}.js`),
    format: 'umd',
    env: 'development',
  },
  {
    name: item.package,
    outputName: item.outputName,
    package: resolve(`packages/${item.package}/package.json`),
    input: resolve(`packages/${item.package}/src/index.js`),
    file: resolve(`packages/${item.package}/dist/${item.outputFileName}.min.js`),
    format: 'umd',
    env: 'production',
  },
  {
    name: item.package,
    outputName: item.outputName,
    package: resolve(`packages/${item.package}/package.json`),
    input: resolve(`packages/${item.package}/src/index.js`),
    file: resolve(`packages/${item.package}/dist/${item.outputFileName}.common.js`),
    format: 'cjs',
  },
  {
    name: item.package,
    outputName: item.outputName,
    package: resolve(`packages/${item.package}/package.json`),
    input: resolve(`packages/${item.package}/src/index.js`),
    file: resolve(`packages/${item.package}/dist/${item.outputFileName}.esm.js`),
    format: 'es',
  }])
  .reduce((allConfigs, configs) => ([
    ...allConfigs,
    ...configs,
  ]), [])
  .map(genConfig)
