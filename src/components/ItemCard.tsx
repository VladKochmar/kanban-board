import { useState, type FC } from 'react';
import type { Item } from '../types/Item';

import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useKanban } from '../hooks/useKanban';

import ItemForm from './ItemForm';
import { useDraggable } from '@dnd-kit/core';

interface ItemCardProps {
  item: Item;
  columnId: string;
}

const ItemCard: FC<ItemCardProps> = ({ item, columnId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { editItem, removeItem } = useKanban();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: item.id });

  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  const descriptionContent = item.description ? <p>{item.description}</p> : null;

  const handleEditItem = (item: Item) => {
    editItem(item);
    setIsEdit(false);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="bg-card dark:bg-card-dark rounded-2xl shadow-sm p-3.5">
      <div {...listeners} className="flex justify-end not-last:mb-2">
        <GripVertical className="cursor-grab size-3.5" />
      </div>
      <div className="flex gap-x-2 items-center justify-between not-last:mb-3">
        <h3 className="font-medium text-[18px]">{item.title}</h3>
        <div className="inline-flex gap-x-3">
          <button onClick={() => setIsEdit(!isEdit)} className="cursor-pointer hover:text-primary transition-colors duration-300">
            <Pencil />
          </button>
          <button onClick={() => removeItem(item.id, columnId)} className="cursor-pointer hover:text-red-500 transition-colors duration-300">
            <Trash2 />
          </button>
        </div>
      </div>
      {isEdit ? <ItemForm item={item} onEditItem={handleEditItem} /> : descriptionContent}
    </div>
  );
};

export default ItemCard;
