/* eslint-disable */
// const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('../utils/service');
// const { isValidDateFormat } = require('../utils/validator');
const express = require('express');
const router = new express.Router();

router.get('', (req, res) => {
    res.render('index', {
        title: 'Birthday app',
    });
});

router.get('/current-month', (req, res) => {
    res.render('current-month', {
        title: 'Current Month',
    });
});

router.get('/next-month', (req, res) => {
    res.render('next-month', {
        title: 'Next Month',
    });
});

router.get('/between-dates', (req, res) => {
    res.render('between-dates', {
        title: 'Between Dates',
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
    });
});

module.exports = router
