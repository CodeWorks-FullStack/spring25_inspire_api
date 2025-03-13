import { imagesService } from "../services/ImagesService.js";
import BaseController from "../utils/BaseController.js";

export class ImagesController extends BaseController {
  constructor() {
    super('api/images')
    this.router
      .get('', this.getRandomImage)
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
}