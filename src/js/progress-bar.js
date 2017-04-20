import $ from 'jquery';


export default class {
  constructor($el, numSteps) {
    this.$el = $el;
    this.numSteps = numSteps;
  }

  goTo(stepNumber) {
    this.$el.find('.progress-bar').css({
      width: `${(stepNumber / this.numSteps) * 100}%`,
    });
  }
}
