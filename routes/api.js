import express from "express";
import rateLimit from "express-rate-limit";
import shortenController from "../controllers/shorten.js";
import Link from "../models/link.js";

const Router = express.Router();

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: {
        error: "Too many shortened URLs created from your IP, please try again after an hour!"
    },
    standardHeaders: true,
    legacyHeaders: false
});

Router.get("/version", (req, res) => {
    res.json({
        version: req.app.locals.version
    });
});

Router.get("/stats", (req, res) => {
    res.json({
        linkCount: req.app.locals.linkCount,
        totalClicks: req.app.locals.totalClicks
    });
});

Router.get("/url", async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            error: "Missing ID query parameter!"
        });
    }

    if (typeof id !== "string") {
        return res.status(400).json({
            error: "ID query parameter should be a string!"
        });
    }

    const obj = await Link.findOne({ id });

    if (!obj) {
        return res.status(404).json({
            error: "Shortened URL not found!"
        });
    }

    res.json({
        url: obj.url
    });
});

Router.post("/url", limiter, shortenController);

Router.use((req, res) => {
    res.status(404).json({
        error: "404 Not Found!"
    });
});

export default Router;