"use server";

import { Resend } from "resend";

export type ContactState = {
  ok: boolean;
  error: string | null;
};

const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? "jhelos@gmail.com";
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM ?? "Arcade Vault <onboarding@resend.dev>";

export async function sendContactMessage(
  name: string,
  email: string,
  message: string,
): Promise<ContactState> {
  if (!name.trim() || !email.trim() || !message.trim()) {
    return { ok: false, error: "Todos los campos son obligatorios." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY no configurada en el servidor." };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: CONTACT_EMAIL_FROM,
    to: CONTACT_EMAIL_TO,
    replyTo: email,
    subject: `[Arcade Vault] Nuevo mensaje de ${name}`,
    text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
  });

  if (error) {
    return { ok: false, error: "No se pudo enviar el mensaje. Intenta de nuevo." };
  }

  return { ok: true, error: null };
}
