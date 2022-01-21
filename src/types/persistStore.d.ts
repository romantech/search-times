/* eslint-disable no-restricted-exports */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Redux + Persist 타입스크립트 오류 수정
// https://github.com/rt2zz/redux-persist/issues/1140

declare module 'redux-persist/es/persistStore' {
  import { Action, AnyAction, Store } from 'redux';
  import { Persistor, PersistorOptions } from 'redux-persist/es/types';

  /**
   * @desc Creates a persistor for a given store.
   * @param store store to be persisted (or match an existent storage)
   * @param persistorOptions enhancers of the persistor
   * @param callback bootstrap callback of sort.
   */
  // tslint:disable-next-line: strict-export-declare-modifiers
  export default function persistStore<S = any, A extends Action = AnyAction>(
    store: Store<S, A>,
    persistorOptions?: PersistorOptions | null,
    callback?: () => any,
  ): Persistor;
}

declare module 'redux-persist/lib/persistStore' {
  export * from 'redux-persist/es/persistStore';
  export { default } from 'redux-persist/es/persistStore';
}
