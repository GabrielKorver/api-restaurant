import express from 'express'
import { routes } from './routes'
import { errorHanldling } from './middlewares/error-handling'
const PORT = 3000

const app = express()
app.use(express.json())

app.use(routes)

app.get('/', (request, response) => {
  response.send(`Server is running on port ${PORT}`)
})

app.use(errorHanldling)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
