import newPokerModal from './new-poker-modal';
import estimatePoint from './estimate-point';
import toggleIsHidden from './toggle-is-hidden';
import resetPoker from './reset-poker';

const actions = new Map();

actions.set('new-poker-modal', newPokerModal);
actions.set('estimate-point', estimatePoint);
actions.set('toggle-is-hidden', toggleIsHidden);
actions.set('reset-poker', resetPoker);

export default actions;
