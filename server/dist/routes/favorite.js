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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { Favorite } = require("../models/Favorite");
router.post("/favoriteNumber", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // userFrom도 client에서 보냈지만 사용하지 않음(유튜버 실수)
    const { movieId } = req.body;
    //   console.log(movieId);
    try {
        const info = yield Favorite.find({ movieId: movieId }).exec();
        // info.length  => [1,4,6] // 1번 4번 6번 사용자가 favorite 표시한 영화라는 뜻의 배열
        // => 그러므로 length하면 몇명이 좋아하는지 알 수 있음
        res.status(200).json({ success: true, favoriteNumber: info.length });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}));
router.post("/favorited", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 내가 이 영화를 favorite 리스트에 넣었는지 정보를 db에서 가져오기
    // userFrom 정보 가져와야한다.
    const { movieId, userFrom } = req.body;
    try {
        const info = yield Favorite.find({
            movieId: movieId,
            userFrom: userFrom,
        }).exec();
        let result = false;
        if (info.length !== 0)
            result = true;
        return res.status(200).json({ success: true, favorited: result });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}));
router.post("/removeFromFavorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //! db에서 데이터 삭제하는 방법
    // 조건을 보내줘야 조건에 맞는 데이터를 찾아 db에서 삭제한다
    // 키워드 findOneAndDelete
    try {
        const { movieId, userFrom } = req.body;
        const deleteFavorite = yield Favorite.findOneAndDelete({
            movieId: movieId,
            userFrom: userFrom,
        });
        return res.status(200).json({ success: true, deleteFavorite });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
    }
}));
router.post("/addToFavorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //! db에 새로운 데이터를 생성하는 방법
    // 인스턴스 생성 : 모델 정의에 근거해서 만들어진 하나의 Favorite 개체
    // save()함으로써 db에 저장됨
    const favorite = new Favorite(req.body);
    yield favorite
        .save() //
        .then(() => res.status(200).json({ success: true }))
        .catch((error) => {
        console.log(error);
        res.status(400).json({ success: false, error });
    });
}));
router.post("/getFavoredMovie", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userFrom } = req.body;
    try {
        const myFavorites = yield Favorite.find({ userFrom: userFrom }).exec();
        return res.status(200).json({ success: true, myFavorites });
    }
    catch (error) {
        console.log(error, "에러");
        return res.status(400).json({ success: false, error });
    }
}));
router.post("/removeFromFavorite", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, userFrom } = req.body;
    try {
        const result = yield Favorite.findOneAndDelete({
            movieId: movieId,
            userFrom: userFrom,
        }).exec();
        return res.status(200).json({ success: true, result });
    }
    catch (error) {
        console.log(error, "에러");
        return res.status(400).json({ success: false, error });
    }
}));
// export default router;
module.exports = router;
