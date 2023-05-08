const app = require("./index");
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv').config();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});