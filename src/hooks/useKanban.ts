import { useContext } from 'react';

import type { Item } from '../types/Item';
import type { Column } from '../types/Column';
import { KanbanDispatchContext, KanbanStateContext } from '../context/KanbanContext';
import type { DragEndEvent } from '@dnd-kit/core';

export const useKanban = () => {
  const state = useContext(KanbanStateContext);
  const dispatch = useContext(KanbanDispatchContext);

  if (!state || !dispatch) throw new Error('No context');

  const findColumnByItemId = (itemId: string): string | null => {
    for (const [colId, col] of Object.entries(state.columns)) {
      if (col.itemIds.includes(itemId)) return colId;
    }
    return null;
  };

  const moveItem = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const itemId = active.id as string;

    const fromColumnId = findColumnByItemId(itemId);
    if (!fromColumnId) return;

    let toColumnId = findColumnByItemId(over.id as string);
    let overItemId: string | null = over.id as string;

    if (!toColumnId && state.columns[overItemId]) {
      toColumnId = overItemId;
      overItemId = null;
    }

    if (!toColumnId) return;

    dispatch({ type: 'MOVE_ITEM', payload: { itemId, fromColumnId, toColumnId, overItemId } });
  };

  const addItem = (columnId: string, item: Omit<Item, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, columnId } });
  };

  const editItem = (item: Item) => {
    dispatch({ type: 'EDIT_ITEM', payload: item });
  };

  const removeItem = (itemId: string, columnId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId, columnId } });
  };

  const addColumn = (boardId: string, title: string) => {
    dispatch({ type: 'ADD_COLUMN', payload: { boardId, title } });
  };

  const editColumn = (column: Column) => {
    dispatch({ type: 'EDIT_COLUMN', payload: column });
  };

  const removeColumn = (boardId: string, columnId: string) => {
    dispatch({ type: 'REMOVE_COLUMN', payload: { boardId, columnId } });
  };

  return { state, addItem, editItem, removeItem, addColumn, editColumn, removeColumn, moveItem };
};
