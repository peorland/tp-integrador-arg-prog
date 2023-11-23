import { useState } from 'react';

export default function TaskList({ item, onChecked, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);

  function FormEdit() {
    const [newValue, setNewValue] = useState(item.title);

    function handleSubmit(e) {
      e.preventDefault();
    }

    function handleChange(e) {
      const value = e.target.value;
      setNewValue(value);
    }

    function handleClickUpdateTodo() {
      onUpdate(item.id, newValue);
      setIsEdit(false);
    }

    return (
      <form className="taskUpdateForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="taskInput"
          onChange={handleChange}
          value={newValue}
        />
        <button className="button" onClick={handleClickUpdateTodo}>
          Modificar
        </button>
      </form>
    );
  }

  function TaskItem() {
    function showItem(item) {
      if (item.completed) {
        return <del>{item.title}</del>;
      } else {
        return <>{item.title}</>;
      }
    }
    return (
      <div className="taskInfo">
        <span className="taskTitle">{showItem(item)}</span>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onChecked(item.id)}
        />
        <button className="button" onClick={() => setIsEdit(true)}>
          Editar
        </button>
        <button className="buttonDelete" onClick={() => onDelete(item.id)}>
          Eliminar
        </button>
      </div>
    );
  }

  return <div className="task">{isEdit ? <FormEdit /> : <TaskItem />}</div>;
}
