import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TodosService {
  async createTodo(todoData) {
    const todo = await dbContext.Todos.create(todoData)
    return todo
  }

  async getMyTodos(userId) {
    //                                       { creatorId: '65f87bc1e02f1ee243874743' }
    const todos = await dbContext.Todos.find({ creatorId: userId })
    return todos
  }

  async getTodoById(todoId) {
    const todo = await dbContext.Todos.findById(todoId)

    if (todo == null) {
      throw new BadRequest(`Invalid todo id: ${todoId}`)
    }

    // NOTE could probably just check user here!

    return todo
  }

  async updateTodo(todoId, todoData, userInfo) {
    const todoToUpdate = await this.getTodoById(todoId)

    if (todoToUpdate.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT ALTER ANOTHER USER'S TODO, ${userInfo.nickname.toUpperCase()}`)
    }

    // Long way
    // if (todoData.description != undefined) {
    //   todoToUpdate.description = todoData.description
    // }

    // if (todoData.completed != undefined) {
    //   todoToUpdate.completed = todoData.completed
    // }

    // Quick way
    // nullish coalescing operator
    todoToUpdate.completed = todoData.completed ?? todoToUpdate.completed
    todoToUpdate.description = todoData.description ?? todoToUpdate.description

    await todoToUpdate.save() // update myself in the database!

    return todoToUpdate
  }

  async deleteTodo(todoId, userInfo) {
    const todoToDelete = await this.getTodoById(todoId)

    if (todoToDelete.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT DELETE ANOTHER USER'S TODO, ${userInfo.nickname.toUpperCase()}. THE FBI IS ON ROUTE TO YOUR LOCATION`)
    }

    await todoToDelete.deleteOne()

    return `${todoToDelete.description} was deleted!`
  }
}

export const todosService = new TodosService()