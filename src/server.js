const express = require('express');
const path = require('path');
const PORT = 3000;
const DISTRIBUTIVE_DIR = 'dist';

const distributiveDirPath = path.join(__dirname, '../', DISTRIBUTIVE_DIR);
console.log(__dirname);

const app = express();

app.use(express.static(distributiveDirPath));

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`));
