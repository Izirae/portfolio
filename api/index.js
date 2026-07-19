import express from 'express'
import cors from 'cors'
import { portfolioData } from '../server/data.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/portfolio',          (_req, res) => res.json(portfolioData))
app.get('/api/projects',           (_req, res) => res.json(portfolioData.projects))
app.get('/api/projects/:category', (req, res)  => {
  const { category } = req.params
  const list = category === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === category)
  res.json(list)
})
app.get('/api/skills', (_req, res) => res.json(portfolioData.skills))

export default app
