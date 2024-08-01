import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const apiKey = 'ZOEV9sdh0LiBRXwOKcht5jZi41TT6Vn6IjFrTC37';
const rankingsUrl = `https://api.sportradar.com/tennis/trial/v3/en/rankings.json?api_key=${apiKey}`;

app.get('/rankings', async (req, res) => {
    try {
        const response = await fetch(rankingsUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
