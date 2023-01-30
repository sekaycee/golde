const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3003
const cookieParser = require('cookie-parser')
const { logger } = require('./middleware/logger')
const corsOptions = require('./config/corsOptions')
const errorHandler = require('./middleware/errorHandler')

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all('*', (res, req) => {
	res.status(404)
	if (req.accepts('html'))
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	else if (req.accepts('json'))
		res.json({ message: '404 Not Found' })
	else
		res.type('txt').send('404 Not Found')
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
