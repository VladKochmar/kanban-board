import type { FC } from 'react';
import { useKanban } from '../hooks/useKanban';

import Column from './Column';
import ColumnAddCard from './ColumnAddCard';
import { DndContext } from '@dnd-kit/core';

const Board: FC = () => {
  const { state, addColumn, moveItem } = useKanban();

  const board = state.boards['board-1'];
  const columns = board.columnIds.map(colId => state.columns[colId]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-bold text-4xl text-center not-last:mb-6">Kanban Board</h1>
      <DndContext onDragEnd={moveItem}>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map(col => (
            <Column key={col.id} column={col} boardId={board.id} items={col.itemIds.map(itemId => state.items[itemId])} />
          ))}
          <ColumnAddCard boardId={board.id} onAdd={addColumn} />
        </div>
      </DndContext>
    </div>
  );
};

export default Board;
