// @flow
import { List, Map } from 'immutable';

function itemFactory(id): Map<string, *> {
  return new Map({
    id,
    title: 'test title',
    time: 1484625248277,
    text: 'test text',
    url: 'http://test.com',
  });
}

function listFactory(list: List<*>): List<*> {
  const size = list.size;
  const newList = new List([itemFactory(size), itemFactory(size + 1)]);
  return list.concat(newList);
}


export default (
  state: List<*> = listFactory(new List()),
  action: { type: string },
) => {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case 'FETCH':
      return listFactory(state);
    case 'SET_TOPIC':
      return listFactory(new List());
    default:
      return state;
  }
};
