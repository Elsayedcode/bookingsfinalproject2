import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";

import amenitiesRouter  from "./routes/amenities.js";
import bookingsRouter  from "./routes/bookings.js";
import propertiesRouter  from "./routes/properties.js";
import reviewsRouter  from "./routes/reviews.js";
import hostsRouter  from "./routes/hosts.js";
import usersRouter  from "./routes/users.js";

import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";



const app = express();
// Sentry
Sentry.init({
  dsn: "https://d46236cba806a44be7bbace87ef65a9e@o4506406537658368.ingest.sentry.io/4506646787194880",

  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

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




// Login
app.use("/login", loginRouter);

// Trace errors
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error handling
app.use(errorHandler);

app.listen(3000, function() {
  console.log('Listening on http://localhost:3000');
});
