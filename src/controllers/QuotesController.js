import { quotesService } from "../services/QuotesService.js";
import BaseController from "../utils/BaseController.js";

export class QuotesController extends BaseController {
  constructor() {
    super('api/quotes')
    this.router
      .get('', this.getRandomQuote)
      // NOTE middleware!
      // everything below (after) the .use must pass through the middleware function
      .use((request, response, next) => {
        if (request.body.likesCheese == true) {
          next()
        }
        next(new Error("You must like cheese in order to create a quote"))
      })
      .post('', this.createQuote)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getRandomQuote(request, response, next) {
    try {
      const quote = await quotesService.getRandomQuote()
      response.send(quote)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createQuote(request, response, next) {
    response.send('Creating quote!')
  }
}