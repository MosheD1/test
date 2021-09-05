import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const obj = {
    data: []
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json('root of domain');
});

app.post('/savefile', (req, res) => {
    const { name, email, password } = req.body;

    // const fd = fs.open('./savefile', 'a', (err, fd) => {

    // })
    obj.data.push(req.body);
    fs.writeFile('./savefile', JSON.stringify(obj),(err) => {
        if(err)
        {
            res.status(500).json('an error occured');
            throw err;
            
        }

        console.log('file updated');
        res.json('data saved');
    });

});

app.get('/readfile', (req, res) => {
    fs.readFile('./savefile', (err, data) => {
        if(err)
        {
            res.status(500).json('an error occured');
            throw err;
        }

        const parsedObj = JSON.parse(data);
        res.json(data)
    });
});

app.listen(3000, () => {
    console.log('server is running');
});