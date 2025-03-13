import { Auth0Provider } from "@bcwdev/auth0provider";
import { quotesService } from "../services/QuotesService.js";
import BaseController from "../utils/BaseController.js";

export class QuotesController extends BaseController {
  constructor() {
    super('api/quotes')
    this.router
      .get('', this.getRandomQuote)
      // NOTE middleware!
      // everything below (after) the .use must pass through the middleware function
      // .use((request, response, next) => {
      //   if (request.body.likesCheese == true) {
      //     next()
      //   }
      //   next(new Error("You must like cheese in order to create a quote"))
      // })
      // NOTE in order to make it past this middleware, your request must have a valid bearer token
      .use(Auth0Provider.getAuthorizedUserInfo)
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
    try {
      const quoteData = request.body
      // NOTE if there are red squiggles under userInfo, open the index.d.ts file and keep it open
      const userInfo = request.userInfo
      // NOTE never ever trust the client
      quoteData.authorId = userInfo.id
      const quote = await quotesService.createQuote(quoteData)
      response.send(quote)
    } catch (error) {
      next(error)
    }
  }
}