// @flow
import { fromJS } from 'immutable';
import { Observable } from 'rxjs';

const database = {};

function setTopicIds(topic, ids) {
  database[topic] = fromJS(ids);
  return database[topic];
}

function loadData(url: string) {
  return fetch(url); // eslint-disable-line
}
function fetchItem(id: string) {
  const newsApi = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  return loadData(newsApi)
  .then(response => response.json())
  .then(data => fromJS(data));
}

function fetchIds(topic: string) {
  if (database[topic]) {
    return new Promise(resolve => resolve(database[topic]));
  }
  const newsApi = `https://hacker-news.firebaseio.com/v0/${topic}.json`;
  return loadData(newsApi)
  .then(response => response.json())
  .then(setTopicIds.bind(null, topic));
}


function fetchData(
  topic: string,
  start: number,
  numberPerPage: number,
) {
  return fetchIds(topic).then(ids => ids.slice(start, start + numberPerPage))
  .then(news => Promise.all(news.map(fetchItem)).then(fromJS));
}
// export function fetchData(
//   start: number,
//   numberPerPage: number,
//   ids: List<string>,
// ) {
//   const news = ids.slice(start, start + numberPerPage);
//   return Promise.all(news.map(fetchItem))
//   .then(data => fromJS(data));
// }
function fetchNews(topic, start, numberPerPage, observer) {
  fetchData(topic, start, numberPerPage).then((data) => {
    observer.next(data);
    observer.complete();
  });
}

export function fetchNews$(
  topic: string,
  start: number,
  numberPerPage: number,
) {
  return Observable.create(fetchNews.bind(null, topic, start, numberPerPage));
}
export function fetchItem$(
  topic: string,
  start: number,
  numberPerPage: number,
) {
  return Observable.create(fetchNews.bind(null, topic, start, numberPerPage));
}
