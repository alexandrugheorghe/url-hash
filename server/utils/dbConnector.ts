import * as mongoose from 'mongoose'

export async function connectToDb(url: string) {
  await mongoose.connect(url)
}

export default mongoose
