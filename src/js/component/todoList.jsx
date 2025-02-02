import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [addTask, setAddTask] = useState('');
  const [todoList, setTodoList] = useState([]);

  async function crearUsuario() {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/cd182', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),
      });
      let data = await response.json();
      console.log(data);
      obtenerTareas(); 
    } catch (error) {
      console.log(error);
    }
  }

  async function obtenerTareas() {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/cd182');
      let data = await response.json();
      console.log(data);
      if (response.ok) {
        setTodoList(data);
      } else if (response.status === 404) {
        crearUsuario();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(event) {
    setAddTask(event.target.value);
  }

  function agregar(event) {
    if (event.key === 'Enter' && addTask !== '') {
      const newTask = {
        label: addTask,
        done: false,
      };
      console.log(newTask);
      setAddTask('');
      update([...todoList, newTask]);
    }
  }

  async function update(todoList) {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/cd182', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoList),
      });
      if (response.ok) {
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function suprimir(index) {
    const newList = todoList.filter((item, i) => index !== i);
    setTodoList(newList);
    update(newList);
  }

  async function deleteAll() {
    try {
      let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/cd182', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    crearUsuario();
    obtenerTareas();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Todos</h1>
      <ul className="list-group w-25 mx-auto shadow p-3 mb-5">
        <li className="list-group-item">
          <input
            className="form-control"
            value={addTask}
            onChange={handleInput}
            onKeyDown={agregar}
            type="text"
            placeholder="Escribe la tarea"
            aria-label="default input example"
          />
        </li>
        {todoList.map((task, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {task.label}
            <span className="badge rounded-pill" onClick={() => suprimir(index)}>
              X
            </span>
          </li>
        ))}
        <li className="list-group-item">
          {todoList.length === 0 ? 'No hay tareas pendientes, agregar tarea' : todoList.length + ' items left'}
        </li>
      </ul>
      {todoList.length === 0 ? (
        <button className="btn btn-danger mx-auto disabled" id="deleteAll">
          Eliminar todo
        </button>
      ) : (
        <button className="btn btn-danger mx-auto" id="deleteAll" onClick={deleteAll}>
          Eliminar todo
        </button>
      )}
    </div>
  );
};

export default TodoList;
