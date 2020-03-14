import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';
import * as calc from '../../src/calculator';

let lastState: calc.State ;

Given('Callie decides to use the Super Calculator', function () {
  // Write code here that turns the phrase above into concrete actions
  lastState = calc.reset();
});

When('she adds {int} and {int}', function (int, int2) {
  // When('she adds {int} and {float}', async function (int, float) {
  // When('she adds {float} and {int}', async function (float, int) {
  // When('she adds {float} and {float}', async function (float, float2) {
  // Write code here that turns the phrase above into concrete actions
  lastState = calc.add(lastState, int);
  lastState = calc.add(lastState, int2);
});

Then('she should see that the result is {int}', function (int) {
  expect(lastState.result).to.equal(int);
});
