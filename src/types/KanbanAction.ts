import type { Column } from './Column';
import type { Item } from './Item';

export type KanbanAction =
  | { type: 'ADD_ITEM'; payload: { item: Omit<Item, 'id'>; columnId: string } }
  | { type: 'EDIT_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string; columnId: string } }
  | { type: 'MOVE_ITEM'; payload: { itemId: string; fromColumnId: string; toColumnId: string; overItemId: string | null } }
  | { type: 'ADD_COLUMN'; payload: { boardId: string; title: string } }
  | { type: 'EDIT_COLUMN'; payload: Column }
  | { type: 'REMOVE_COLUMN'; payload: { boardId: string; columnId: string } };
