import { dbContext } from "../db/DbContext.js"

class TodosService {

  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }

  async getMyTodos(userId) {
    const todos = await dbContext.Todos.find({ creatorId: userId })
    return todos
  }
}

export const todosService = new TodosService()