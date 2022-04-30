import Express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import { connectToDb } from './server/utils/dbConnector'

dotenv.config()

const app = Express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
});

app.listen(port, async () => {
  const url = process.env.MONGO_URL
  if (!url) {
    throw new Error('No MongoDB config provided.')
  }
  await connectToDb(url)
  console.log(`Server is running at https://localhost:${port}`)
});
