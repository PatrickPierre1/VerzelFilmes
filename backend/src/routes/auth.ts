import { Router } from "express";
import { check } from "express-validator";
import auth from "../middleware/authMiddleware";
import authController from "../controllers/authController";

const router = Router();

// @route   GET api/auth
// @desc    Obter usuário autenticado
// @access  Private
router.get("/", auth, authController.getMe);

// @route   POST api/auth/register
// @desc    Registrar um usuário
// @access  Public
router.post(
    "/register",
    [
        check("name", "Nome é obrigatório").not().isEmpty(),
        check("email", "Por favor, inclua um email válido").isEmail(),
        check(
            "password",
            "Por favor, insira uma senha com 6 ou mais caracteres"
        ).isLength({ min: 6 }),
    ],
    authController.register
);

// @route   POST api/auth/login
// @desc    Autenticar usuário e obter token
// @access  Public
router.post(
    "/login",
    [
        check("email", "Por favor, inclua um email válido").isEmail(),
        check("password", "Senha é obrigatória").exists(),
    ],
    authController.login
);

export default router;
