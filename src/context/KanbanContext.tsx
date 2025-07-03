import { createContext, type Dispatch } from 'react';
import type { KanbanState } from '../types/KanbanState';
import type { KanbanAction } from '../types/KanbanAction';

export const KanbanStateContext = createContext<KanbanState | null>(null);
export const KanbanDispatchContext = createContext<Dispatch<KanbanAction> | null>(null);
