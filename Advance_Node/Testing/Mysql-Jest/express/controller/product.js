const { models } = require("../../sequelize");

const fetchAllProducts = async (req, res, next) => {
    try {
        const products = await models.product.findAll();
        res.status(200).json({ success: true, products });
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    try {
        const data = req.body;

        const product = await models.product.create({
            pName: data.pName,
            price: data.price,
        });
        res.status(200).json({ success: true, product });
    } catch (error) {
        next(error);
    }
};
module.exports = { fetchAllProducts, addProduct };
