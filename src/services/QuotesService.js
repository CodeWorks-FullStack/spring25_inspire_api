import { dbContext } from "../db/DbContext.js"

class QuotesService {

  async getRandomQuote() {
    const quoteCount = await dbContext.Quotes.countDocuments()
    const randomSkipAmount = Math.floor(Math.random() * quoteCount)
    const quote = await dbContext.Quotes.findOne().skip(randomSkipAmount).populate('author', 'name picture')
    return quote
  }

  async createQuote(quoteData) {
    const quote = await dbContext.Quotes.create(quoteData)
    await quote.populate('author', 'name picture')
    return quote
  }

}

export const quotesService = new QuotesService()