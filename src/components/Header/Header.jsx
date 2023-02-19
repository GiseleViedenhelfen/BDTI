import React,{ useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
const Header = () => {
  const [showAddTodo, setShowAddTodo] = useState(false);

  const handleAddTodoClick = () => {
    setShowAddTodo(!showAddTodo);
  };
  return (
    <header>
      <section>
        <h1>Lista de Tarefas</h1>
        <button onClick={handleAddTodoClick}>Nova Tarefa</button>
        { showAddTodo && <AddTodo /> }
      </section>
      <section>
        <h3>listar todas as tarefas</h3>
        <h3>listar tarefas concluídas</h3>
        <h3>listar tarefas a fazer</h3>
      </section>
      
    </header>
  )
}

export default Header;