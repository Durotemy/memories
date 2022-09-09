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
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deletePost = exports.updatePost = exports.createPosts = exports.getPosts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postMessage_1 = __importDefault(require("../model/postMessage"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postMessage = yield postMessage_1.default.find();
        res.status(200).json(postMessage);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getPosts = getPosts;
const createPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.body;
    const newPostMessage = new postMessage_1.default(Object.assign(Object.assign({}, post), { creator: req.userId, createdAt: new Date().toISOString() }));
    try {
        const newPost = yield new postMessage_1.default(newPostMessage).save();
        res.status(201).json(newPost);
    }
    catch (error) {
        console.log("hey", error);
        res.status(409).json({ message: error.message });
    }
});
exports.createPosts = createPosts;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);
    try {
        const updatedPost = yield postMessage_1.default.findByIdAndUpdate(_id, Object.assign(Object.assign({}, post), { _id }), { new: true });
        console.log("updatedPost", updatedPost);
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: _id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post with id: ${_id}`);
    try {
        const deletedPost = yield postMessage_1.default.findByIdAndDelete(_id);
        console.log("deletedPost", deletedPost);
        res.status(200).json(deletedPost);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.userId)
        return res.json({ message: "Unauthenticated" });
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    let post = yield postMessage_1.default.findById(id);
    const index = post === null || post === void 0 ? void 0 : post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post === null || post === void 0 ? void 0 : post.likes.push(req.userId);
    }
    else {
        post.likes = post === null || post === void 0 ? void 0 : post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = yield postMessage_1.default.findByIdAndUpdate(id, post, {
        new: true,
    });
    res.status(200).json(updatedPost);
});
exports.likePost = likePost;
exports.default = { createPosts: exports.createPosts, getPosts: exports.getPosts, updatePost: exports.updatePost, deletePost: exports.deletePost, likePost: exports.likePost };