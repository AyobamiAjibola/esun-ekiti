"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleCheck = void 0;
const roleCheck = (roles) => {
    return (req, res, next) => {
        console.log(req.data);
        if (req.data.role.includes(...roles)) {
            next();
        }
        else {
            res.status(403).json({ error: true, message: "You are not authorized" });
        }
    };
};
exports.roleCheck = roleCheck;
//# sourceMappingURL=roleCheck.js.map