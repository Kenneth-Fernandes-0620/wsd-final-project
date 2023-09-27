import express from 'express';
import cors from 'cors';

const app = express()
const port = 5000

const corsOptions = {
    origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200
}

app.options('/api/*', cors())

app.use('/', express.static('../client/build'))

app.get("/api/testConnection", (req, res) => {
    console.log("Calling the bird Api");
    res.send("bar");
})

app.listen(port, () =>
    console.log(`${corsOptions.origin}`)
)