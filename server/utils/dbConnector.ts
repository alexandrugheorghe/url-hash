import mongoose from 'mongoose'

export async function connectToDb(url: string) {
  await mongoose.connect(`mongodb://${url}`)
}

export default mongoose
