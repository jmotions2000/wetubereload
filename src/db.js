import mongoose from "mongoose";

console.log(process.env.DB_URL);
mongoose.connect(process.env.DB_URL);

// mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connected to DB");
const handleError = (error) => console.log("❌DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
