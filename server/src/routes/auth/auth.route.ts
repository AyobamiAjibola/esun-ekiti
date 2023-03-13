import express from "express";
import authController from "../../modules/auth/auth.controller";

const router = express.Router();

//= ============================== LOGIN =================================//
router.post("/login_admin", authController.login_admin);

//= ================================ REFRESH TOKEN ================================//
router.get("/new_token", authController.new_access_token);

//= ================================ LOGOUT ================================//
router.get("/logout", authController.logout_user);

export default router;
