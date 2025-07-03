import { useState, type FC, type SyntheticEvent } from 'react';
import { ClipboardPlus } from 'lucide-react';

interface ColumnAddCardProps {
  boardId: string;
  onAdd: (boardId: string, title: string) => void;
}

const ColumnAddCard: FC<ColumnAddCardProps> = ({ boardId, onAdd }) => {
  const [title, setTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onAdd(boardId, title);
    setTitle('');
    setIsVisible(false);
  };

  return (
    <div className="flex flex-col gap-y-3 items-center justify-center bg-col-def/20 dark:bg-col-def-dark/20 hover:bg-col-def hover:dark:bg-col-def-dark backdrop-blur-xs rounded-2xl border border-col-def/30 dark:border-col-def-dark/30 shadow p-4 transition-colors duration-300">
      {isVisible ? (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-3">
          <h3 className="text-xl font-bold">Create a new column</h3>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter a column title"
            className="bg-col-def dark:bg-col-def-dark rounded-2xl shadow-sm px-3 py-2"
          />
          <button className="cursor-pointer text-col-def dark:text-col-def-dark uppercase bg-primary dark:bg-primary-dark hover:bg-primary/90 hover:dark:bg-primary-dark/90 transition-colors duration-300 rounded-2xl shadow-sm px-3 py-2">
            Add
          </button>
        </form>
      ) : (
        <ClipboardPlus className="w-10 h-10" />
      )}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="w-full cursor-pointer uppercase bg-card dark:bg-card-dark hover:bg-card/90 hover:dark:bg-card-dark/90 transition-colors duration-300 rounded-2xl shadow-sm px-3 py-2">
        {isVisible ? 'Cancel' : 'Add button'}
      </button>
    </div>
  );
};

export default ColumnAddCard;
