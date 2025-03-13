import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { QuoteSchema } from '../models/Quote.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Quotes = mongoose.model('Quote', QuoteSchema)
}

export const dbContext = new DbContext()
