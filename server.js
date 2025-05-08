const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishListRoutes = require("./routes/wishListRoutes");
const reviewRoutes = require('./routes/reviewRoutes')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishList", wishListRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running in ${PORT}`);
});