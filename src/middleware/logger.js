// This file is a middleware that logs the requests made to the server.
import morgan from "morgan"
// The function of the loggerMiddleware function is to log the requests made to the server.
export const loggerMiddleware = morgan("dev")