import $ from 'jquery';

import { ANIMATION_LENGTH } from './settings';


const $body = $('html, body');
const $steps = $('.steps li');
const numSteps = $steps.length;

let step = 0;


const goTo = (stepNumber) => {
  const toDepth = $steps
    .eq(step)
    .position()
    .top;

  $body.animate({
    scrollTop: toDepth
  }, ANIMATION_LENGTH);
}

const previous = () => {
  if ((step - 1) < 0) {
    return step;
  }

  step -= 1;
  goTo(step);

  return step;
}

const next = () => {
  if ((step + 1) >= numSteps) {
    return step;
  }

  step += 1;
  goTo(step);

  return step;
}

module.exports = {
  next,
  previous,
}
