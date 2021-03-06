// @flow
import { List } from 'immutable';
import { handleActions } from 'redux-actions';

import actions from '../actions';


export default handleActions({
  [actions.setNews]: (state, { payload }) => state.concat(payload),
  [actions.navigate]: () => new List(),
}, new List());


// export default (
//   state: List<*> = listFactory(new List()),
//   action: { type: string },
// ) => {
//   if (!action) {
//     return state;
//   }
//   switch (action.type) {
//     case 'FETCH':
//       return listFactory(state);
//     case 'SET_TOPIC':
//       return listFactory(new List());
//     default:
//       return state;
//   }
// };
