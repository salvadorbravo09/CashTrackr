import { transport } from "../config/nodemailer";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export const sendConfirmationEmail = async (user: EmailType) => {
  const email = await transport.sendMail({
    from: `"CashTrackr <admin@cashtrackr.com>`,
    to: user.email,
    subject: "Confirma tu cuenta en CashTrackr",
    text: "Confirma tu cuenta en CashTrackr",
    html: `<p>Hola ${user.name},</p>
           <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:</p>
           <a href="#">Confirmar Cuenta</a>
           <p>E ingresa el codigo: ${user.token}</p>
           <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>`,
  });
  console.log("Mensaje enviado ", email.messageId);
};
