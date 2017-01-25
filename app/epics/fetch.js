
import actions from '../actions';
import { fetchNews$ } from '../api';

const numberPerPage = 5;

function pageCount(store, page) {
  if (page && page.topic === store.getState().get('topic')) {
    return { topic: page.topic, count: page.count + 1 };
  }
  return { topic: store.getState().get('topic'), count: 0 };
}


export default function fetchEpic(action$, store) {
  return action$.ofType('FETCH')
  .scan(pageCount.bind(null, store), null)
  .mergeMap(
    page => fetchNews$(
      store.getState().get('topic'),
      page.count * numberPerPage, numberPerPage,
    ).map(actions.setNews),
  );
}
