import { Auth0Provider } from "@bcwdev/auth0provider";
import { imagesService } from "../services/ImagesService.js";
import BaseController from "../utils/BaseController.js";

export class ImagesController extends BaseController {
  constructor() {
    super('api/images')
    this.router
      .get('', this.getRandomImage)
      // NOTE gotta be logged in for anything after (below) the middleware
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createImage)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getRandomImage(request, response, next) {
    try {
      const image = await imagesService.getRandomImage()
      response.send(image)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createImage(request, response, next) {
    try {
      const imageData = request.body
      const userInfo = request.userInfo
      // NOTE whoever makes the request owns the image
      imageData.authorId = userInfo.id
      const image = await imagesService.createImage(imageData)
      response.send(image)
    } catch (error) {
      next(error)
    }
  }
}