import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import './TaskForm.css';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [warningMsg, setWarningMsg] = useState(false);

  useEffect(() => {
    alert('Ingrese una tarea por favor');
  }, [warningMsg]);

  function handleChange(event) {
    const value = event.target.value;
    setTitle(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) {
      setWarningMsg(!warningMsg);
      //alert('La tarea está vacia...'); <--- muestra la prescindencia del useEffect
    } else {
      const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        completed: false,
      };
      const temp = [...todos];
      temp.push(newTodo);
      setTodos(temp);
      setTitle('');
    }
  }

  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos(temp);
  }

  function handleDelete(id) {
    const temp = todos.filter((item) => item.id !== id);
    setTodos(temp);
  }

  function handleCheckbox(id) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.completed = !item.completed;
    setTodos(temp);
  }

  return (
    <div className="taskContainer">
      <h1>Lista de Tareas</h1>
      <form className="taskCreateForm" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          placeholder="Ingresar nueva tarea"
          className="taskInput"
          value={title}
        />
        <input
          onClick={handleSubmit}
          type="submit"
          value={'Agregar'}
          className={'buttonCreate'}
        />
      </form>
      <div className="tasksContainer">
        {todos.map((item) => (
          <TaskList
            key={item.id}
            item={item}
            onChecked={handleCheckbox}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
