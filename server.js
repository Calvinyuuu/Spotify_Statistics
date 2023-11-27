import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use('/UnWrapped', express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});