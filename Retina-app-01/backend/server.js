const express = require("express");
const cors = require("cors");
const usersRoutes = require("./users"); // Import user routes

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", usersRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
