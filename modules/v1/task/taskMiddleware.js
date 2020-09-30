const taskMiddleware = {};

taskMiddleware.checkAdminRoleForTaskCRUD = async (req, res, next) => {
    // should add try catch or globally exception handler to handle unexpected DB error but skipping for now
    if (req.__locals && req.__locals.role === "admin") {
        next();
    } else {
        return res.status(400).json({
            err: "Admin role can CRUD Op",
        });
    }
};
module.exports = taskMiddleware;