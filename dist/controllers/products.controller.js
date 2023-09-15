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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateByDPI = exports.getProfileByDPI = exports.handleBadRequest = exports.handleServerError = void 0;
const commons_1 = require("../utils/commons");
const handleServerError = (res, error, errorMessage) => {
    res.status(500).json({ error: errorMessage });
};
exports.handleServerError = handleServerError;
const handleBadRequest = (res, message) => {
    res.status(400).json({ msg: message });
};
exports.handleBadRequest = handleBadRequest;
const getProfileByDPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { DPI } = req.params;
    try {
        const item = yield User.findOne({ DPI });
        if (!item) {
            res.status(404).json({ error: commons_1.NOT_EXIST });
            return;
        }
        res.json(item);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.FOUND_ERROR);
    }
});
exports.getProfileByDPI = getProfileByDPI;
const updateByDPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, NIT, name, lastName, bornDate, deliveryAddress, phoneNumber } = req.body;
    const { DPI } = req.params;
    if (!email || !password || !DPI || !NIT || !name || !lastName || !bornDate || !deliveryAddress || !phoneNumber) {
        return (0, exports.handleBadRequest)(res, commons_1.LOGIN_REQUIREMENTS);
    }
    try {
        const existingEmail = yield User.findOne({ email });
        const existingNIT = yield User.findOne({ NIT });
        if (existingEmail && existingEmail.DPI !== DPI) {
            return (0, exports.handleBadRequest)(res, commons_1.EXISTING_EMAIL);
        }
        if (existingNIT && existingNIT.DPI !== DPI) {
            return (0, exports.handleBadRequest)(res, commons_1.EXISTING_NIT);
        }
        const updateFields = {
            email,
            password,
            NIT,
            name,
            lastName,
            bornDate,
            deliveryAddress,
            phoneNumber
        };
        const updatedItem = yield User.findOneAndUpdate({ DPI }, { $set: updateFields }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ error: commons_1.NOT_EXIST });
        }
        return res.json(updatedItem);
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.UPDATE_ERROR);
    }
});
exports.updateByDPI = updateByDPI;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedItem = yield User.findByIdAndRemove(id);
        if (!deletedItem) {
            res.status(404).json({ error: commons_1.NOT_EXIST });
            return;
        }
        res.json({ message: commons_1.USER_DELETED });
    }
    catch (error) {
        (0, exports.handleServerError)(res, error, commons_1.DELETE_ERROR);
    }
});
exports.deleteProfile = deleteProfile;
