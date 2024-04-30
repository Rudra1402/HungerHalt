require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8000
const url = process.env.ATLAS_URI

const userRoutes = require('./routes/user')
const partnerRoutes = require('./routes/partner')
const postRoutes = require('./routes/post')
const itemRoutes = require('./routes/item')
const orderRoutes = require('./routes/order')
const notificationRoutes = require('./routes/notification')
const predictRoutes = require('./routes/predict')

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false }))

mongoose.connect(url)
    .then(() => {
        console.log('MongoDB connected!')
    }).catch((err) => {
        console.log('MongoDB error: ' + err)
    })

app.get('/', (_, res) => {
    res.json({
        name: 'Server',
        project: 'Hunger Halt'
    })
})

app.use('/api/user', userRoutes)
app.use('/api/partner', partnerRoutes)
app.use('/api/post', postRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/predict', predictRoutes)

app.listen(PORT, console.log('Server running on PORT: ' + PORT))