import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

console.log("url",process.env.FRONTEND_URL)
console.log(`${process.env.DB_NAME}`);

app.use(cors({origin : process.env.FRONTEND_URL, credentials: true}))

// const allowedOrigins = ['http://localhost:3000'];

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); // Allow non-origin requests like from curl or Postman
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true // Allow credentials (cookies, auth
// }))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//admin routes
import adminRouter from "./routes/admin.routes.js"
app.use("/api/admin", adminRouter)

//user routes
import userRouter from "./routes/user.routes.js"
app.use("/api/user", userRouter)

//hotel routes
import hotelRouter from "./routes/hotel.routes.js"
app.use("/api/hotel", hotelRouter)

//food routes
import foodRouter from "./routes/food.routes.js"
app.use("/api/food", foodRouter)

//blog routes
import blogRouter from "./routes/blog.routes.js"
app.use("/api/blog", blogRouter)

//review routes
import reviewRouter from "./routes/review.routes.js"
app.use("/api/review", reviewRouter)

export {app}