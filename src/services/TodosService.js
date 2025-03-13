import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TodosService {

  async updateTodo(todoId, todoData) {
    const todoToUpdate = await this.getTodoById(todoId)

    // Long way
    // if (todoData.description != undefined) {
    //   todoToUpdate.description = todoData.description
    // }

    // if (todoData.completed != undefined) {
    //   todoToUpdate.completed = todoData.completed
    //   todoToUpdate.completed = todoData.completed
    // }

    // Quick way
    // nullish coalescing operator
    todoToUpdate.completed = todoData.completed ?? todoToUpdate.completed
    todoToUpdate.description = todoData.description ?? todoToUpdate.description

    await todoToUpdate.save() // update myself in the database!

    return todoToUpdate
  }

  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }

  async getMyTodos(userId) {
    const todos = await dbContext.Todos.find({ creatorId: userId })
    return todos
  }

  async getTodoById(todoId) {
    const todo = await dbContext.Todos.findById(todoId)

    if (todo == null) {
      throw new BadRequest(`Invalid todo id: ${todoId}`)
    }

    return todo
  }

  async deleteTodo(todoId) {
    const todoToDelete = await this.getTodoById(todoId)

    await todoToDelete.deleteOne()

    return `${todoToDelete.description} was deleted!`
  }
}

export const todosService = new TodosService()