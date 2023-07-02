const userService = require("../services/userService");

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.findUserByCredentials(email, password);

        if (!user) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        const authToken = userService.generateAuthToken(user);
        res.status(200).json({ success: true, data: { authToken } });
    } catch (error) {
        next(error);
    }
};

const registeUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userService.createUser(email, password);
        res.status(201).json({ success: true });
    } catch (error) {
        next(error);
    }
};

const fetchUserWithComments = async (req, res, next) => {
    try {
        const { page, itemPerPage } = req.query;
        const user = await userService.fetchUserWithComments(
            req.user._id,
            page,
            itemPerPage
        );
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

const fetchuserwithPosts = async (req, res, next) => {
    try {
        const data = await userService.fetchuserwithPostCount();
        res.status(200).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUser,
    registeUser,
    fetchUserWithComments,
    fetchuserwithPosts,
};
