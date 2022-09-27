const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    if (process.env.MODE === 'dev')
        console.log('Database connected: ' + process.env.DATABASE_PATH)
})

mongoose.connection.on('error', (err) => {
    if (process.env.MODE === 'dev')
        console.log('Database error: ' + err)
})