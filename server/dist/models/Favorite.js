"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// 스키마 작성
const mongoose_1 = require("mongoose");
const favoriteSchema = mongoose.Schema({
    // Schema.Types.ObjectId를 가지고 'User'모델의 모든 데이터(토큰 정보, 이름정보 등)를 가져올 수 있다.
    // type을 Schema.Types.ObjectId로 하면 ref를 지정해줘야 한다.
    userFrom: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    movieId: {
        type: String,
    },
    movieTitle: {
        type: String,
    },
    moviePost: {
        type: String,
    },
    movieRunTime: {
        type: String,
    },
}, 
// timestamps : 생성시간을 자동처리해줌
{ timestamps: true });
// 모델로 스키마를 감싼다.
// const User = mongoose.model("모델명", 스키마);
const Favorite = mongoose.model("Favorite", favoriteSchema);
// 모델 export
module.exports = { Favorite };
// export default User;
