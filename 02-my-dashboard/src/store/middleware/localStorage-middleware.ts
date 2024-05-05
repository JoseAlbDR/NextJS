import { Action, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { RootState } from '..';

export const localStorageMiddleware = (state: MiddlewareAPI) => {
  return (next: Dispatch) => (action: Action) => {
    next(action);
    if (action.type === 'favorites/toggleFavorite') {
      const { favorites } = state.getState() as RootState;

      localStorage.setItem('favorites', JSON.stringify(favorites));
      return;
    }
  };
};
