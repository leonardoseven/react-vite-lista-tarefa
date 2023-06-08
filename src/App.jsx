import { useState } from 'react'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search';
import './App.css'


function App() {
  const [lista, setLista] = useState([
    {
      id : 1,
      text: "Matemática",
      category: "Estudos",
      isCompleted: false
    },
    {
      id : 2,
      text: "Caminhar",
      category: "Saúde",
      isCompleted: false
    },
    {
      id : 3,
      text: "Cozinhar",
      category: "Culinária",
      isCompleted: false
    }
  ]);

const [search, setSearch] = useState("");

const addTodo = (title, category) => {
  const newTodos = [
      ...lista,
      {
        id : Math.floor(Math.random() * 10000),
        text: title,
        category: category,
        isCompleted: false
      }
  ]

  setLista(newTodos)
}

const removeTodo = (id) =>{
  const newTodos = [...lista];
  const filtred = newTodos.filter((todo) =>
     todo.id !== id ? todo : null
    );
  setLista(filtred)
}

const completeTodo = (id) =>{
  const newTodos = [...lista];
  newTodos.map((todo) => 
    todo.id === id ? todo.isCompleted = !todo.isCompleted : todo
  )
  setLista(newTodos)
}


  return (
      <div className="app">
        <h1>Lista de Tarefas</h1>
        <Search search={search} setSearch={setSearch} />
          <div className="todo-list">
            {lista.filter((todo) => todo.text.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            .map((todo) => (
              <Todo 
                key={todo.id} 
                todo={todo} 
                removeTodo={removeTodo}
                completeTodo={completeTodo} />             
            ))}
          </div>
          <TodoForm save={addTodo}/>
      </div>
  )
}

export default App
