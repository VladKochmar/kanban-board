import { useState, type FC, type SyntheticEvent } from 'react';
import type { Item } from '../types/Item';
import type { Column as ColumnType } from '../types/Column';

import { CirclePlus, CircleX, Pencil, Trash2 } from 'lucide-react';

import { useKanban } from '../hooks/useKanban';
import { useDroppable } from '@dnd-kit/core';

import ItemCard from './ItemCard';
import ItemForm from './ItemForm';

interface ColumnProps {
  items: Item[];
  boardId: string;
  column: ColumnType;
}

const Column: FC<ColumnProps> = ({ column, boardId, items }) => {
  const { addItem, editColumn, removeColumn } = useKanban();

  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const { setNodeRef } = useDroppable({ id: column.id });

  const handleEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newColumn: ColumnType = { ...column, title };
    editColumn(newColumn);
    setIsEditing(false);
  };

  const handleAddItem = (columnId: string, item: Omit<Item, 'id'>) => {
    addItem(columnId, item);
    setIsVisible(false);
  };

  return (
    <div className="h-full flex flex-col bg-col-def dark:bg-col-def-dark rounded-2xl shadow p-4">
      <div className="flex items-center justify-between gap-x-4 not-last:mb-4">
        {!isEditing ? (
          <h2 className="font-bold text-2xl">{column.title}</h2>
        ) : (
          <form onSubmit={handleEdit} className="inline-flex gap-x-2 border-b border-text">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="font-bold text-2xl max-w-[220px] outline-0" />
            <button className="cursor-pointer">Save</button>
          </form>
        )}
        <div className="inline-flex gap-x-4">
          <button onClick={() => setIsEditing(!isEditing)} className="cursor-pointer hover:text-primary transition-colors duration-300">
            <Pencil />
          </button>
          <button onClick={() => removeColumn(boardId, column.id)} className="cursor-pointer hover:text-red-500 transition-colors duration-300">
            <Trash2 />
          </button>
        </div>
      </div>
      <div ref={setNodeRef} className="flex-1 flex flex-col gap-y-4">
        {items.map(item => (
          <ItemCard key={item.id} item={item} columnId={column.id} />
        ))}
        {isVisible && (
          <div className="bg-card dark:bg-card-dark rounded-2xl shadow-sm p-3.5">
            <ItemForm columnId={column.id} onAddItem={handleAddItem} />
          </div>
        )}

        <button
          onClick={() => setIsVisible(!isVisible)}
          className="cursor-pointer w-full flex items-center justify-center gap-x-3 font-medium uppercase rounded-2xl shadow-sm bg-card dark:bg-card-dark hover:bg-card/70 hover:dark:bg-card-dark/70 transition-colors duration-300 py-3.5">
          {!isVisible ? (
            <>
              Add item <CirclePlus />
            </>
          ) : (
            <>
              Cancel <CircleX />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Column;
