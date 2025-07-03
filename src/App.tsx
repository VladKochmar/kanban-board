import { type FC } from 'react';

import Board from './components/Board';
import { KanbanProvider } from './context/KanbanProvider';

const App: FC = () => {
  return (
    <KanbanProvider>
      <Board />
    </KanbanProvider>
  );
};

export default App;
