import { quotesService } from "../services/QuotesService.js";
import BaseController from "../utils/BaseController.js";

export class QuotesController extends BaseController {
  constructor() {
    super('api/quotes')
    this.router
      .get('', this.getRandomQuote)
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
}