import type { KanbanState } from '../types/KanbanState';

export const state: KanbanState = {
  boards: {
    'board-1': { id: 'board-1', title: 'Project Board', columnIds: ['column-1', 'column-2', 'column-3'] },
  },
  columns: {
    'column-1': { id: 'column-1', title: 'To Do', itemIds: ['item-1', 'item-2'] },
    'column-2': { id: 'column-2', title: 'In Progress', itemIds: ['item-3', 'item-4'] },
    'column-3': { id: 'column-3', title: 'Done', itemIds: ['item-5'] },
  },
  items: {
    'item-1': { id: 'item-1', title: 'Learn Redux' },
    'item-2': { id: 'item-2', title: 'Learn UI libraries', description: 'Learn and practice Material UI and Chakra UI' },
    'item-3': { id: 'item-3', title: 'Learn React', description: 'Learn basis, React Router, State manager and UI libraries' },
    'item-4': { id: 'item-4', title: 'Learn React Router v7', description: 'Learn basis of React Router v7' },
    'item-5': { id: 'item-5', title: 'Develop To Do project' },
  },
};
