import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello Nodejs!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server renning in http://localhost:${PORT}`);
});
