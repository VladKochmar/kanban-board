import { useState, type FC, type SyntheticEvent } from 'react';
import type { Item } from '../types/Item';

interface ItemFormProps {
  item?: Item;
  columnId?: string;
  onAddItem?: (columnId: string, item: Omit<Item, 'id'>) => void;
  onEditItem?: (item: Item) => void;
}

const ItemForm: FC<ItemFormProps> = ({ item, columnId, onAddItem, onEditItem }) => {
  const [title, setTitle] = useState(() => (item ? item.title : ''));
  const [description, setDescription] = useState(() => (item?.description ? item.description : ''));

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (columnId && onAddItem) {
      onAddItem(columnId, { title, description });
    }

    if (item && onEditItem) {
      onEditItem({ id: item.id, title, description });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter a title"
        className="bg-col-def dark:bg-col-def-dark rounded-2xl shadow-sm px-3 py-2"
      />
      <textarea
        value={description}
        rows={4}
        onChange={e => setDescription(e.target.value)}
        placeholder="Enter a description"
        className="bg-col-def dark:bg-col-def-dark rounded-2xl shadow-sm px-3 py-2"></textarea>
      <button className="cursor-pointer text-col-def dark:text-col-def-dark uppercase bg-primary dark:bg-primary-dark hover:bg-primary/90 hover:dark:bg-primary-dark/90 transition-colors duration-300 rounded-2xl shadow-sm px-3 py-2">
        Submit
      </button>
    </form>
  );
};

export default ItemForm;
