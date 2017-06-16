// @flow
/* global __DEV__ */
import nodemailer from 'nodemailer'
import sesTransport from 'nodemailer-ses-transport'
import serverConfig from 'server/config-server'
import logger from 'error-logging'

type MailOptions = {
  from: string,
  to: string,
  subject: string,
  text?: string,
  html?: string
}

class MailService {
  transporter: Object

  constructor () {
    // TODO: Logging - create SES object using AWS API?
    this.transporter = nodemailer.createTransport(sesTransport({
      accessKeyId: serverConfig.sesKeyId,
      secretAccessKey: serverConfig.sesKeySecret,
      region: 'us-east-1',
      rateLimit: 5
    }))
  }

  send (options: MailOptions) {
    if (__DEV__) {
      options.to = 'success@simulator.amazonses.com'
      if (options.text) {
        options.text = '** DEVELOPMENT EMAIL - NO ACTION REQUIRED **\n\n' + options.text
      }
      if (options.html) {
        options.html = '<strong>** DEVELOPMENT EMAIL - NO ACTION REQUIRED **</strong><br><br>' + options.html
      }
      options.subject = `[DEV] ${options.subject}`
    }

    this.transporter.sendMail(options, (err, info) => {
      if (err) {
        logger.captureException(err)
        return
      }
      console.log('Email sent: ', options.subject, info.envelope)
    })
  }
}

export default new MailService()
