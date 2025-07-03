import { v4 as uuidv4 } from 'uuid';

import type { Column } from '../types/Column';
import type { KanbanAction } from '../types/KanbanAction';
import type { KanbanState } from '../types/KanbanState';

export const kanbanReducer = (state: KanbanState, action: KanbanAction) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const itemId: string = uuidv4();
      const colId = action.payload.columnId;

      return {
        ...state,
        columns: {
          ...state.columns,
          [colId]: {
            ...state.columns[colId],
            itemIds: [itemId, ...state.columns[colId].itemIds],
          },
        },
        items: {
          ...state.items,
          [itemId]: { id: itemId, title: action.payload.item.title, description: action.payload.item.description || '' },
        },
      };
    }
    case 'EDIT_ITEM': {
      const itemId = action.payload.id;

      return {
        ...state,
        items: {
          ...state.items,
          [itemId]: {
            ...state.items[itemId],
            ...action.payload,
          },
        },
      };
    }
    case 'REMOVE_ITEM': {
      const itemId = action.payload.itemId;
      const colId = action.payload.columnId;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [itemId]: _, ...restItems } = state.items;

      return {
        ...state,
        columns: {
          ...state.columns,
          [colId]: {
            ...state.columns[colId],
            itemIds: state.columns[colId].itemIds.filter(id => id !== itemId),
          },
        },
        items: restItems,
      };
    }
    case 'MOVE_ITEM': {
      const { itemId, fromColumnId, toColumnId, overItemId } = action.payload;

      if (fromColumnId === toColumnId && !overItemId) return state;

      const fromItems = [...state.columns[fromColumnId].itemIds];
      const toItems = [...state.columns[toColumnId].itemIds];

      const fromIndex = fromItems.indexOf(itemId);
      if (fromIndex > -1) fromItems.splice(fromIndex, 1);

      const insertAt = overItemId ? toItems.indexOf(overItemId) : toItems.length;
      toItems.splice(insertAt, 0, itemId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [fromColumnId]: { ...state.columns[fromColumnId], itemIds: fromItems },
          [toColumnId]: { ...state.columns[toColumnId], itemIds: toItems },
        },
      };
    }
    case 'ADD_COLUMN': {
      const colId = uuidv4();
      const boardId = action.payload.boardId;
      const newCol: Column = { id: colId, title: action.payload.title, itemIds: [] };

      return {
        ...state,
        boards: {
          ...state.boards,
          [boardId]: {
            ...state.boards[boardId],
            columnIds: [...state.boards[boardId].columnIds, colId],
          },
        },
        columns: {
          ...state.columns,
          [colId]: newCol,
        },
      };
    }
    case 'EDIT_COLUMN': {
      const colId = action.payload.id;

      return {
        ...state,
        columns: {
          ...state.columns,
          [colId]: {
            ...state.columns[colId],
            ...action.payload,
          },
        },
      };
    }
    case 'REMOVE_COLUMN': {
      const colId = action.payload.columnId;
      const boardId = action.payload.boardId;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [colId]: _, ...restCols } = state.columns;

      return {
        ...state,
        boards: {
          [boardId]: {
            ...state.boards[boardId],
            columnIds: state.boards[boardId].columnIds.filter(id => id !== colId),
          },
        },
        columns: restCols,
      };
    }
    default:
      return state;
  }
};
