import { Router } from "express";
import { fetchPost, searchPost } from "../controllers/postController";
import validateQueryParams from "../middleware/validateQueryParams";

const router = Router();

router.get("/fetch", validateQueryParams, fetchPost);
router.get("/search", validateQueryParams, searchPost);

export default router;
