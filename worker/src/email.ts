import { Resend } from 'resend';

const resend = new Resend(process.env.SMTP_PASSWORD);

export function sendEmail(to:string, body:string){
  (async function () {
  const { data, error } = await resend.emails.send({
    from: 'Yuv <devops@yuvrajtest.xyz>',
    to: [to],
    subject: 'Zapier',
    html: body,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();
}