const sequelize = require("../../sequelize");
const { models } = sequelize;
const fetchAllUser = async (req, res, next) => {
    try {
        const users = await models.user.findAll({
            include: {
                model: models.order,
                as: "order",
                include: {
                    model: models.product,
                    as: "products",
                },
                attributes: {
                    include: [
                        [
                            sequelize.literal(
                                "DATEDIFF(expected_delivery, NOW())"
                            ),
                            "expected_delivery_days",
                        ],
                    ],
                    exclude: ["user_id", "expected_delivery"],
                },
            },
        });

        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const data = req.body;

        const user = await models.user.create({
            firstName: data.firstName,
            lastName: data.lastName,
            contact: data.contact,
        });
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};
module.exports = { fetchAllUser, createUser };
