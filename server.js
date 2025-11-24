const express = require("express");
const appRoute = require("./routes/route.js");

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
// support form-encoded bodies (application/x-www-form-urlencoded) from HTML forms or tools
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", appRoute);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
