const express = require('express')
const userRouter = require('./routes/user.routes')
const nurtSetRouter = require('./routes/nutrset.routes')
const mealPlanRouter = require('./routes/mealplan.routes')

// const foodLogRouter = require('./routes/foodlog.routes')
// const progressRouter = require('./routes/progress.routes')

const PORT = process.env.PORT || 8888

const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', nurtSetRouter)
app.use('/api', mealPlanRouter)

// app.use('/api', foodLogRouter)
// app.use('/api', progressRouter)

app.listen(PORT, () => console.log('server started on port ${port}', [PORT]))