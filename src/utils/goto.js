import history from './core/history';

export const goto = url => {
  history.push(url);
};
