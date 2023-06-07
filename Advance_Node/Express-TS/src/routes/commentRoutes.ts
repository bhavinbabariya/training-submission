import { Router } from "express";
import validateQueryParams from "../middleware/validateQueryParams";
import { fetchComment } from "../controllers/commentController";

const router = Router();

router.use(validateQueryParams);

router.get("/fetch", fetchComment);

export default router;
