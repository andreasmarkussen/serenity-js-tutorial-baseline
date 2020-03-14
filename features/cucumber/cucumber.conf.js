/// <reference types="cucumber" />
/** This file is only used to generate snippets
 * 
 *  instructions:
 * 
 *   node_modules/.bin/cucumber-js
 * 
 */
/** @type IRuntime */
// const cukeConfig = {
//   default: '--format-options \'{"snippetInterface": "async-await"}\'',
//   require: './features/cucumber/**/*.steps.ts'
//   r
// };


var common = [
  '--require-module ts-node/register',
  '--require **/*.steps.ts',
  `--format ${
  process.env.CI || !process.stdout.isTTY ? 'progress' : 'progress-bar'
  }`,
  '--format rerun:@rerun.txt',
  '--format usage:usage.txt',
  '--format json:test-results.cucumber',
].join(' ')

module.exports = {
  default: common,
}