import React from "react";

const TodoTable = () => {
  return(
    <table>
      <thead>
        <tr>
          <th>tarefa</th>
          <th>status atual</th>
          <th>editar</th>
          <th>excluir</th>
        </tr>
      </thead>
      <tbody>
          <td>Tarefas do Redux</td>
          <td>Status do redux</td>
          <td>
            <button>
              editar informacoes da tarefa ou status no redux
            </button>
          </td>
          <td>
            <button>
              excluir tarefa no redux
            </button>
          </td>
      </tbody>
    </table>
  )
}

export default TodoTable;