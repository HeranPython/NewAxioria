const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Axioria Initiative <noreply@axioria.org>";
const CONTACT_FORWARD_EMAIL = "heranataklti@gmail.com";

type ConfirmBody = {
  type: "application_received" | "contact_message";
  to: string;
  applicant_name?: string;
  preferred_committee?: string;
  contact_name?: string;
  contact_email?: string;
  contact_message?: string;
};

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return { ok: false, error: "Email service not configured" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to: [to], subject, html }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error:", text);
    return { ok: false, error: "Email send failed" };
  }
  return { ok: true };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  try {
    const body = (await req.json()) as ConfirmBody;

    if (body.type === "application_received") {
      const name = body.applicant_name || "Student";
      const committee = body.preferred_committee || "your preferred committee";
      const html = `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1c1917;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="font-family:Georgia,serif;font-size:28px;color:#065f46;margin:0;">Axioria Initiative</h1>
            <p style="color:#78716c;font-size:14px;margin-top:4px;">No Student Walks Alone.</p>
          </div>
          <h2 style="font-family:Georgia,serif;font-size:22px;color:#1c1917;">Application Received</h2>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">Dear ${name},</p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            Thank you for applying to Axioria Initiative. Your application has been
            successfully received and will be reviewed by the Axioria team.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            You applied for the <strong>${committee}</strong> committee. We will
            reach out to you soon with updates on your application status.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            If you have any questions, feel free to contact us at
            heranataklti@gmail.com.
          </p>
          <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
          <p style="font-size:14px;color:#78716c;">Axioria Initiative · The Future Begins Here.</p>
        </div>
      `;
      const result = await sendEmail(
        body.to,
        "Axioria Application Received",
        html
      );
      if (!result.ok) {
        return new Response(
          JSON.stringify({ error: result.error }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ ok: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.type === "contact_message") {
      const html = `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1c1917;">
          <h2 style="font-family:Georgia,serif;font-size:22px;">New Contact Message</h2>
          <p style="font-size:16px;line-height:1.6;"><strong>From:</strong> ${body.contact_name}</p>
          <p style="font-size:16px;line-height:1.6;"><strong>Email:</strong> ${body.contact_email}</p>
          <p style="font-size:16px;line-height:1.6;"><strong>Message:</strong></p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;white-space:pre-wrap;">${body.contact_message}</p>
        </div>
      `;
      const result = await sendEmail(
        CONTACT_FORWARD_EMAIL,
        "New Axioria Contact Message",
        html
      );
      if (!result.ok) {
        return new Response(
          JSON.stringify({ error: result.error }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ ok: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown type" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
