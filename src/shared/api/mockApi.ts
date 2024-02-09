interface Todo {
  id: number;
  title: string;
}

const getInitialTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [
    { id: 1, title: 'Learn React' },
    { id: 2, title: 'Build Todo App' },
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
  const newTodo: Todo = { id: Date.now(), title };
  todosData.push(newTodo);
  saveTodos(todosData);
  return newTodo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  todosData = todosData.filter((todo) => todo.id !== id);
  saveTodos(todosData);
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const index = todosData.findIndex((t) => t.id === todo.id);
  if (index !== -1) {
    todosData[index] = { ...todo };
    saveTodos(todosData);
  }
  return todo;
};
