import express from "express";
import userController from "../../modules/user/user.controller";
import { auth } from "../../middleware/auth";
import { roleCheck } from "../../middleware/roleCheck";

const router = express.Router();

//= ============================== REGISTRATION =================================//
router.post("/register_admin", userController.register_admin);

router.get("/current_user/:id", auth, userController.single_user);

router.put("/update_user/:id", userController.updateUser);

router.delete("/delete_user/:id", auth, roleCheck(["admin"]), userController.delete_user);

router.get("/fetch_users", auth, roleCheck(["admin"]), userController.fetch_users);

export default router;
