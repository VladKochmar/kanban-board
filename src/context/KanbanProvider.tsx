import { type FC, type ReactNode, useReducer } from 'react';
import { KanbanStateContext, KanbanDispatchContext } from './KanbanContext';
import { kanbanReducer } from '../reducers/kanbanReducer';
import { state as initialState } from '../data/boards';

interface KanbanProviderProps {
  children: ReactNode;
}

export const KanbanProvider: FC<KanbanProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(kanbanReducer, initialState);
  return (
    <KanbanStateContext.Provider value={state}>
      <KanbanDispatchContext.Provider value={dispatch}>{children}</KanbanDispatchContext.Provider>
    </KanbanStateContext.Provider>
  );
};
