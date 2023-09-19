import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class EtherialMailProvider implements IMailProvider {
    private client: Transporter

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'ransom.kihn29@ethereal.email',
                    pass: '3NrneW7KyCy2EN2Y1q'
                }
            })

            console.log(account)

            this.client = transporter
        })
    }

    public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber' ,
                address: from?.email || 'equipe@gobarber.com.br'
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            text: 'Test',
            html: await this.mailTemplateProvider.parse(templateData)
        })

        console.log('Message', message)

        console.log('Message sent: %s', message.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

