import { useState } from 'react'
import { useEffect } from 'react';
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import Search from './components/Search';
import axios from 'axios';
import './App.css'


function App() {

  const [lista, setLista] = useState([]);

  useEffect(() => {
    // Lógica a ser executada após o componente ser carregado
    console.log('O componente foi carregado');

    axios.get('http://localhost/task')
    .then((response) => {
      console.log(response.data);
      setLista(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
    // Função de limpeza opcional
    return () => {
      console.log('O componente será desmontado');
    };
  }, []);


const [search, setSearch] = useState("");

const addTodo = (title, category) => {

  const dadosFormulario = {
    text: title,
    category: category,
    isCompleted: false
  }

  axios.post('http://localhost/task', dadosFormulario)
  .then((response) => {
    // Lógica para lidar com a resposta de sucesso do servidor
    console.log();
    const newTodos = [
      ...lista,
      response.data
    ]
    setLista(newTodos)
  })
  .catch((error) => {
    // Lógica para lidar com erros na requisição
    console.error(error);
  });


  
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
