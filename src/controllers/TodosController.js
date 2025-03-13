import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { todosService } from "../services/TodosService.js";

export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTodo)
      .get('', this.getMyTodos)
      .get('/:todoId', this.getTodoById)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createTodo(request, response, next) {
    try {
      const todoData = request.body
      const userInfo = request.userInfo
      todoData.creatorId = userInfo.id
      const todo = await todosService.createTodo(todoData)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getMyTodos(request, response, next) {
    try {
      const userInfo = request.userInfo
      const todos = await todosService.getMyTodos(userInfo.id)
      response.send(todos)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getTodoById(request, response, next) {
    try {
      const todoId = request.params.todoId
      const todo = await todosService.getTodoById(todoId)
      response.send(todo)
    } catch (error) {
      next(error)
    }
  }
}