import CSSTransition from '../src';

const $popover = document.getElementById('popover');
const transition = new CSSTransition($popover);

const $btn = document.getElementById('button');
$btn.addEventListener('mouseenter', () => transition.enter());
$btn.addEventListener('mouseleave', () => transition.exit());
