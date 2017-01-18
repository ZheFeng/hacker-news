// @flow

// import { createStore } from 'redux';

function now(): string {
  const d: Date = new Date();
  return d.toTimeString();
}

function counter(state: string = now(), action: { type: string }): string {
  switch (action.type) {
    case 'INCREMENT':
      return now();
    case 'DECREMENT':
      return now();
    default:
      return now();
  }
}

export default counter;

// const store = createStore(counter);
//
//
// store.subscribe(() =>
//   console.log(store.getState()),
// );
//
// // The only way to mutate the internal state is to dispatch an action.
// // The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'INCREMENT' });
// // 1
// store.dispatch({ type: 'INCREMENT' });
// // 2
// store.dispatch({ type: 'DECREMENT' });
// 1
