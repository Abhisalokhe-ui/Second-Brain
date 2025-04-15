"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Port = process.env.PORT;
const conn = (_a = process.env.MONGO_DB_URL) !== null && _a !== void 0 ? _a : (() => {
    throw new Error("MONGO_DB_URL is required but not defined!");
})();
const zod_1 = __importDefault(require("zod"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const jwt_user_secret = process.env.JWT_SECRET;
const userSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(100),
    password: zod_1.default.string().min(3).max(100)
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = userSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).send("Invalid data types");
        }
        const { username, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const existingUser = yield db_1.UserModel.findOne({
            username
        });
        if (existingUser) {
            res.status(411).json({
                message: "Username is already exist"
            });
            return;
        }
        yield db_1.UserModel.create({
            username,
            password: hashedPassword
        });
        res.json({
            username,
            password: hashedPassword
        });
    }
    catch (err) {
        console.log("Error in Signup Endpoint => ", err);
        res.status(500).json({
            Error: "Internal Server Error"
        });
        return;
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = userSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: "Invalid Data Types" });
            return;
        }
        const { username, password } = req.body;
        const user = yield db_1.UserModel.findOne({ username });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        console.log("Stored Hashed Password:", user.password);
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        if (user && isPasswordValid) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id.toString()
            }, jwt_user_secret);
            res.status(200).json({
                message: "Sign in successful",
                token
            });
        }
    }
    catch (err) {
        console.error("Error in Signin Endpoint =>", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/api/v1/content", (req, res) => {
});
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.post("/api/v1/brain/:shareLink", (req, res) => {
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("inside main");
        console.log(conn);
        yield mongoose_1.default.connect(conn);
        app.listen(3000);
        console.log("listeneing on port 3000");
        console.log("You can now use endpoints");
    });
}
main();
