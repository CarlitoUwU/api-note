const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

let Notas = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  },
  {
    id: 4,
    content: 'HTTP is a protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(Notas)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const nota = Notas.find((nota) => nota.id === id)

  if (nota) {
    res.json(nota)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  Notas = Notas.filter((nota) => nota.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = Notas.map((nota) => nota.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  Notas = [...Notas, newNote]
  res.status(201).json(newNote)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  // console.clear();
  console.log(`Server running on port ${PORT}`)
  console.log(`Enlace a la aplicación: http://localhost:${PORT}`)
  console.log('-----------------------------------------------')
})
