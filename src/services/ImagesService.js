import { dbContext } from "../db/DbContext.js"

class ImagesService {
  async getRandomImage() {
    const imageCount = await dbContext.Images.countDocuments()
    const skipAmount = Math.floor(Math.random() * imageCount)
    const image = await dbContext.Images.findOne().skip(skipAmount).populate('author')
    return image
  }

  async createImage(imageData) {
    const image = await dbContext.Images.create(imageData)
    await image.populate('author')
    return image
  }
}

export const imagesService = new ImagesService()