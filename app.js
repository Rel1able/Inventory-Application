const express = require("express");
const app = express();
const path = require("path");
const categoriesRouter = require("./routes/categoriesRouter");
require("dotenv").config();


const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", categoriesRouter);



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})

