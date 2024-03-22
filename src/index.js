import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import amenitiesRouter  from "./routes/amenities.js";
import bookingsRouter  from "./routes/bookings.js";
import propertiesRouter  from "./routes/properties.js";
import reviewsRouter  from "./routes/reviews.js";
import hostsRouter  from "./routes/hosts.js";
import usersRouter  from "./routes/users.js";
import login from "./services/auth/login.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from './utils/log.js';



const app = express();


// Global middleware
app.use(express.json());
app.use(log);


app.use('/hosts', hostsRouter);
app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/properties', propertiesRouter);
app.use('/amenities', amenitiesRouter);
app.use('/reviews', reviewsRouter);
app.use('/login', loginRouter);



app.get("/", (req, res) => {
  res.send("Hello world!");
});


app.use(errorHandler);

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
