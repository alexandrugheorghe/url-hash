import Express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = Express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`)
});
