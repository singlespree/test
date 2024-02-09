let todosData = [
  { id: 1, title: 'Learn React' },
  { id: 2, title: 'Build Todo App' },
];

export const fetchTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return todosData;
};

export const addTodo = async (title: string) => {
  const newTodo = { id: Date.now(), title };
  todosData.push(newTodo);
  await new Promise((resolve) => setTimeout(resolve, 500));
  return newTodo;
};

export const deleteTodo = async (id: number) => {
  todosData = todosData.filter((todo) => todo.id !== id);
  await new Promise((resolve) => setTimeout(resolve, 500));
};

export const updateTodo = async (id: number, title: string) => {
  const index = todosData.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todosData[index] = { ...todosData[index], title };
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
  return todosData[index];
};
