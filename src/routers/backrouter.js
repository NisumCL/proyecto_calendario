/* eslint-disable */
const { actualMonthService, nextMonthService, betweenTwoDatesService } = require('../utils/service');
const { isValidDateFormat } = require('../utils/validator');
const express = require('express');
const router = new express.Router();
const sendBirthdaysReport = require('../emails/account')

router.get('/birthday_month_course', async (req, res) => {
    try {
        const birthdays = await actualMonthService();
        sendBirthdaysReport(birthdays, 'current mont')
        res.send(birthdays);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/birthday_next_month', async (req, res) => {
    try {
        const birthdays = await nextMonthService();
        sendBirthdaysReport(birthdays, 'next mont')
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
        sendBirthdaysReport(birthdays, 'next mont')
        res.send(birthdays);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router
