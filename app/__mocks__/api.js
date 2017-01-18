const items = [
  {
    title: 'Mark',
    time: 1484625248277,
    text: 'text',
  },
  {
    title: 'Paul',
    time: 1484625248277,
    text: 'text',
  },
];
const ids = [1, 2, 3, 4];

export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(items), 100);
  });
}
export function fetchIds() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ids), 100);
  });
}
