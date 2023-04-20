const defineAssociation = (sequelize) => {
    const { models } = sequelize;

    models.user.hasMany(models.order, {
        as: "order",
        foreignKey: "user_id",
    });
    models.order.belongsTo(models.user, { foreignKey: "user_id" });

    models.product.belongsToMany(models.order, {
        through: models.order_detail,
        foreignKey: "product_id",
    });

    models.order.belongsToMany(models.product, {
        through: models.order_detail,
        foreignKey: "order_id",
    });

    models.product.hasMany(models.order_detail, { foreignKey: "product_id" });
    models.order_detail.belongsTo(models.product, { foreignKey: "product_id" });
};

module.exports = { defineAssociation };
