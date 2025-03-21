const express = require("express");
const app = express();
const path = require("path");
const categoriesRouter = require("./routes/categoriesRouter");
const foodRouter = require("./routes/foodRouter");
require("dotenv").config();


const PORT = process.env.PORT || 8000;
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", categoriesRouter);
app.use("/food", foodRouter);



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

