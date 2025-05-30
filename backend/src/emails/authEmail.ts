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
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #2563eb; margin: 0;">¡Bienvenido a CashTrackr!</h2>
        </div>
        <p style="font-size: 16px; line-height: 1.5;">Hola ${user.name},</p>
        <p style="font-size: 16px; line-height: 1.5;">Tu cuenta ya está lista. Para comenzar a usar CashTrackr, necesitamos confirmar tu dirección de correo electrónico.</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-size: 16px; color: #4b5563;">Tu código de confirmación:</p>
          <p style="margin: 10px 0; font-size: 24px; letter-spacing: 2px; color: #2563eb; font-weight: bold;">${user.token}</p>
        </div>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${process.env.FRONTEND_URL}/confirmar/${user.token}" 
             style="background-color: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Confirmar Cuenta
          </a>
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        
        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">
          Este es un correo automático, por favor no respondas a este mensaje.
        </p>
      </div>
    `,
  });
  console.log("Mensaje enviado ", email.messageId);
};

export const sendPasswordResetToken = async (user: EmailType) => {
  const email = await transport.sendMail({
    from: `"CashTrackr <admin@cashtrackr.com>`,
    to: user.email,
    subject: "Reestablece tu contraseña en CashTrackr",
    text: "Reestablece tu contraseña en CashTrackr",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #2563eb; margin: 0;">Reestablecimiento de Contraseña</h2>
        </div>
        <p style="font-size: 16px; line-height: 1.5;">Hola ${user.name},</p>
        <p style="font-size: 16px; line-height: 1.5;">Has solicitado reestablecer tu contraseña. Para crear una nueva contraseña, sigue estos pasos:</p>
        
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-size: 16px; color: #4b5563;">Tu código de verificación:</p>
          <p style="margin: 10px 0; font-size: 24px; letter-spacing: 2px; color: #2563eb; font-weight: bold;">${user.token}</p>
        </div>

        <div style="text-align: center; margin: 25px 0;">
          <a href="${process.env.FRONTEND_URL}/reestablecer-password/${user.token}" 
             style="background-color: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
            Reestablecer Contraseña
          </a>
        </div>

        <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
        
        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px; text-align: center;">
          Este es un correo automático, por favor no respondas a este mensaje.
        </p>
      </div>
    `,
  });
  console.log("Mensaje enviado ", email.messageId);
};
