/* eslint-disable */
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('../utils/service');
const { isValidDateFormat } = require('../utils/validator');
const express = require('express')
const router = new express.Router()

// ruta front
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

//------------------------------------------------------------------------

router.get('/birthday_month_course', async (req, res) => {
    try {
        const birthdays = await actualMonthService();
        res.send(birthdays);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/birthday_next_month', async (req, res) => {
    try {
        const birthdays = await nextMonthService();
        res.send(birthdays);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/birthday_between_dates', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !isValidDateFormat(startDate)) {
        res.send({ error: 'Problems with startDate' });
        }
        if (!endDate || !isValidDateFormat(endDate)) {
        res.send({ error: 'Problems with endDate' });
        }
        const birthdays = await betweenTwoDatesService(startDate, endDate);
        res.send(birthdays);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
    });
});

module.exports = router