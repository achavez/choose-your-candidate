import $ from 'jquery';

import { previous, next } from './slide-nav';
import ProgressBar from './progress-bar';


$(() => {
  const progress = new ProgressBar($('.progress'), $('.steps li').length);

  $('.btn-previous').on('click', (evt) => {
    evt.preventDefault();
    const pos = previous();
    progress.goTo(pos);
  });

  $('.btn-next').on('click', (evt) => {
    evt.preventDefault();
    const pos = next();
    progress.goTo(pos);
  });
});
