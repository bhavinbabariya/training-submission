import { Router } from "express";
import verifyUser from "../middleware/verifyUser";
import validateAuthRequest from "../middleware/validateAuthRequest";
import validateQueryParams from "../middleware/validateQueryParams";
import {
    loginUser,
    registeUser,
    fetchUserWithComments,
    fetchuserwithPosts,
} from "../controllers/userController";

const router = Router();

router.post("/login", validateAuthRequest, loginUser);
router.post("/register", validateAuthRequest, registeUser);
router.get(
    "/fetchuserwithcomments",
    verifyUser,
    validateQueryParams,
    fetchUserWithComments
);
router.get("/fetchuserwithPosts", validateQueryParams, fetchuserwithPosts);

export default router;
