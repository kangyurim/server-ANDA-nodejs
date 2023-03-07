const jwtMiddleware = require('../../../config/jwtMiddleware');
const adminKeyCheck = require('../../../config/adminKeyCheck');
const controller = require('./searchController');
const express = require('express');
const router = express.Router();

module.exports = function (app){

    //1. 병원 명 검색
    app.get('/app/search/hospital', adminKeyCheck.checkAdmin, controller.searchHospital);
}