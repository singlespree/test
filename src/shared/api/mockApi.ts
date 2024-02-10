interface Todo {
  id: number;
  title: string;
  status: 'new' | 'in_progress' | 'completed';
}

const getInitialTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [
    { id: 1, title: 'Learn React', status: 'new' },
    { id: 2, title: 'Build Todo App', status: 'new' },
  ];
};

let todosData: Todo[] = getInitialTodos();

const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const fetchTodos = async (): Promise<Todo[]> => {
  return todosData;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const newTodo: Todo = { id: Date.now(), title, status: 'new' };
  todosData.push(newTodo);
  saveTodos(todosData);
  return newTodo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  todosData = todosData.filter((todo) => todo.id !== id);
  saveTodos(todosData);
};

export const updateTodo = async ({ id, title, status }: { id: number; title: string; status: 'new' | 'in_progress' | 'completed' }): Promise<Todo> => {
  const index = todosData.findIndex((t) => t.id === id);
  if (index !== -1) {
    todosData[index] = { ...todosData[index], title, status };
    saveTodos(todosData);
  }
  return todosData[index];
};
