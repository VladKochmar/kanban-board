import type { Board } from './Board';
import type { Column } from './Column';
import type { Item } from './Item';

export interface KanbanState {
  boards: Record<string, Board>;
  columns: Record<string, Column>;
  items: Record<string, Item>;
}
