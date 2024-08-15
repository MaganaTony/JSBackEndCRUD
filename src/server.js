const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./routes/todoUserRouter');
const postRoutes = require('./routes/todoPostRouter');
const comentRoutes = require('./routes/comentRouter');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/coments", comentRoutes);

app.get("/", (request, response) => {
    response.json({
        success: true,
        message: "API bcknd"
    });
});

module.exports = app;