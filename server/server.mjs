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


app.post('/api/log', (req, res) => {
    logDataToFile(`${new Date().toDateString()}req.body.event`)
    res.status(200).send({ res: 'ok' });
})

app.listen(port, () =>
    console.log(`Allowed hosts: ${corsOptions.origin}`)
)

function logDataToFile(data) {
    fs.appendFile('log.txt', data + '\n', (err) => {
        if (err)
            console.error('Error writing to the file:', err);
        else
            console.log('Data has been logged to the file successfully.');
    });
}
