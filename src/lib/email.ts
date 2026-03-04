import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Rozkvetlá restaurace <noreply@rozkvetlarestaurace.cz>";
const RESTAURANT_EMAIL = "verunkatarhaj@seznam.cz";

export async function sendReservationConfirmation(data: {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
}) {
  // Email klientovi
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Potvrzení rezervace – Rozkvetlá restaurace",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a7c59;">🌸 Děkujeme za vaši rezervaci!</h2>
        <p>Dobrý den, <strong>${data.name}</strong>,</p>
        <p>vaše rezervace byla úspěšně přijata. Zde jsou detaily:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Datum:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.date}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Čas:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.time}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Počet hostů:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.guests}</td></tr>
          ${data.note ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Poznámka:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.note}</td></tr>` : ""}
        </table>
        <p>Brzy vás budeme kontaktovat s potvrzením.</p>
        <p>S pozdravem,<br><strong>Rozkvetlá restaurace</strong><br>Topolová 2916/14, Praha 10<br>Tel: 731 163 777</p>
      </div>
    `,
  });

  // Email restauraci
  await resend.emails.send({
    from: FROM_EMAIL,
    to: RESTAURANT_EMAIL,
    subject: `Nová rezervace: ${data.name} – ${data.date} ${data.time}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>📋 Nová rezervace</h2>
        <ul>
          <li><strong>Jméno:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Datum:</strong> ${data.date}</li>
          <li><strong>Čas:</strong> ${data.time}</li>
          <li><strong>Počet hostů:</strong> ${data.guests}</li>
          ${data.note ? `<li><strong>Poznámka:</strong> ${data.note}</li>` : ""}
        </ul>
      </div>
    `,
  });
}

export async function sendOrderConfirmation(data: {
  name: string;
  phone: string;
  email?: string;
  pickupTime: string;
  items: { name: string; quantity: number; price: number }[];
  totalPrice: number;
}) {
  const itemsHtml = data.items
    .map(
      (item) =>
        `<tr><td style="padding: 4px 8px;">${item.name} x${item.quantity}</td><td style="padding: 4px 8px; text-align: right;">${item.price * item.quantity} Kč</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #4a7c59;">🌸 Objednávka přijata!</h2>
      <p>Dobrý den, <strong>${data.name}</strong>,</p>
      <p>vaše objednávka byla přijata. Čas vyzvednutí: <strong>${data.pickupTime}</strong></p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        ${itemsHtml}
        <tr style="border-top: 2px solid #4a7c59;"><td style="padding: 8px; font-weight: bold;">Celkem</td><td style="padding: 8px; text-align: right; font-weight: bold;">${data.totalPrice} Kč</td></tr>
      </table>
      <p>S pozdravem,<br><strong>Rozkvetlá restaurace</strong><br>Tel: 731 163 777</p>
    </div>
  `;

  if (data.email) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Potvrzení objednávky – Rozkvetlá restaurace",
      html,
    });
  }

  // Email restauraci
  await resend.emails.send({
    from: FROM_EMAIL,
    to: RESTAURANT_EMAIL,
    subject: `Nová objednávka: ${data.name} – vyzvednutí ${data.pickupTime}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>🛒 Nová objednávka s sebou</h2>
        <ul>
          <li><strong>Jméno:</strong> ${data.name}</li>
          <li><strong>Telefon:</strong> ${data.phone}</li>
          <li><strong>Vyzvednutí:</strong> ${data.pickupTime}</li>
        </ul>
        ${html}
      </div>
    `,
  });
}

export async function sendEventInquiry(data: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  date: string;
  guests: number;
  message?: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: RESTAURANT_EMAIL,
    subject: `Poptávka akce: ${data.eventType} – ${data.name}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>🎉 Nová poptávka na akci</h2>
        <ul>
          <li><strong>Jméno:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Telefon:</strong> ${data.phone}</li>
          <li><strong>Typ akce:</strong> ${data.eventType}</li>
          <li><strong>Datum:</strong> ${data.date}</li>
          <li><strong>Počet hostů:</strong> ${data.guests}</li>
          ${data.message ? `<li><strong>Zpráva:</strong> ${data.message}</li>` : ""}
        </ul>
      </div>
    `,
  });

  // Potvrzení klientovi
  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Poptávka přijata – Rozkvetlá restaurace",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a7c59;">🌸 Děkujeme za váš zájem!</h2>
        <p>Dobrý den, <strong>${data.name}</strong>,</p>
        <p>vaše poptávka na <strong>${data.eventType}</strong> dne <strong>${data.date}</strong> pro <strong>${data.guests} hostů</strong> byla přijata.</p>
        <p>Ozveme se vám do 24 hodin s nabídkou na míru.</p>
        <p>S pozdravem,<br><strong>Rozkvetlá restaurace</strong><br>Tel: 731 163 777</p>
      </div>
    `,
  });
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: RESTAURANT_EMAIL,
    subject: `Zpráva z webu: ${data.subject || "Bez předmětu"} – ${data.name}`,
    html: `
      <div style="font-family: sans-serif;">
        <h2>✉️ Nová zpráva z kontaktního formuláře</h2>
        <ul>
          <li><strong>Jméno:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Předmět:</strong> ${data.subject || "—"}</li>
        </ul>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 16px;">
          <p>${data.message}</p>
        </div>
      </div>
    `,
  });
}
