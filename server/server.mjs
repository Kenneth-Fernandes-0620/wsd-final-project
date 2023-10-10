import * as fs from 'fs';
import express from 'express';
import cors from 'cors';

const app = express()
const port = 5000

const logFilePath = 'log.txt';
const corsOptions = {
    origin: `*`,
    // origin: `http://localhost:${port}`,
    optionsSuccessStatus: 200
}

app.options('/api/*', cors())

app.use('/', express.static('../client/build'))
app.use(express.json())
app.use(express.urlencoded())


app.post('/api', (req, res) => {
    console.log(req.body)
    console.log("Connection Ok")
    res.status(200).send({ res: 'ok' });
})

app.get("/api/log", (req, res) => {
    console.log(req);
    res.sendStatus(200);
})

app.listen(port, () =>
    console.log(`${corsOptions.origin}`)
)

function logDataToFile(data, filePath) {
    const dataString = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;

    fs.appendFile(filePath, dataString + '\n', (err) => {
        if (err)
            console.error('Error writing to the file:', err);
        else
            console.log('Data has been logged to the file successfully.');
    });
}
