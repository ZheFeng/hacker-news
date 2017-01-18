// @flow
import { List, fromJS } from 'immutable';

function loadData(url: string) {
  return fetch(url); // eslint-disable-line
}
function fetchItem(id: string) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  return loadData(newsApi)
  .then(response => response.json())
  .then(data => fromJS(data));
}
export function fetchData(
  start: number,
  numberPerPage: number,
  ids: List<string>,
) {
  const news = ids.slice(start, start + numberPerPage);
  return Promise.all(news.map(fetchItem))
  .then(data => fromJS(data));
}
export function fetchIds(topic: string) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/${topic}.json`;
  return loadData(newsApi)
  .then(response => response.json())
  .then(data => fromJS(data));
}
