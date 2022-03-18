/* eslint-disable */
const sgMail = require('@sendgrid/mail')
const sendgridAPIkey = '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'
const { mailFormatData } = require('./helper')

sgMail.setApiKey(sendgridAPIkey)

const sendBirthdaysReport = async(rawdata, interval) =>{
    const kualkiervaina = await rawdata
    console.log(mailFormatData(kualkiervaina, interval))
    const tomaTUString = mailFormatData(kualkiervaina, interval)
    sgMail.send({
        to: 'fljubetic@nisum.com',
        from: 'fljubetic@nisum.com',
        subject: 'NISUM BIRTHDAYS APP REPORT',
        text: 'Hi, here are your last birthdays research report',
        html: tomaTUString
    })
}

module.exports = sendBirthdaysReport