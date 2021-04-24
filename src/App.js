import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import TodoList from "./components/Todolist";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterTodos] = useState([]);

  useEffect(()=>{
    getLocalTodos();
  },[]);
  useEffect(()=>{
    function filterHandler(){
      switch(status){
        case 'completed': 
        setFilterTodos(todos.filter(todo => todo.completed === true))
        break;
        case 'uncompleted': 
        setFilterTodos(todos.filter(todo => todo.completed === false))
        break;
        default: setFilterTodos(todos);
        break;
      }
    }
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  function saveLocalTodos ()  {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  

  function getLocalTodos (){
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal =JSON.parse( localStorage.getItem("todos"));
      setTodos(todoLocal)
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        // status={status}
        setStatus={setStatus}
        
      />
      <TodoList todos={todos} setTodos={setTodos} filterTodos={filterTodos}/>
    </div>
  );
}

export default App;
