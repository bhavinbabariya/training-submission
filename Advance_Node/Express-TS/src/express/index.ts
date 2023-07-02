import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
const app: Express = express();

import { userRoutes, postRoutes, commentRoutes } from "../routes/indexRoutes";

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.use(
    (
        err: Error & { status?: number },
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        });
    }
);

export default app;
