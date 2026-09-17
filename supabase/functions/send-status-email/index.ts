import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

// Axioria status email function — sends acceptance/rejection emails and updates DB
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Axioria Initiative <noreply@axioria.org>";

type StatusBody = {
  application_id: string;
  new_status: "accepted" | "rejected";
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
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: isAdmin } = await supabase.rpc("is_axioria_admin");
    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Forbidden" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = (await req.json()) as StatusBody;

    const { data: app, error: appErr } = await supabase
      .from("applications")
      .select("*")
      .eq("id", body.application_id)
      .single();

    if (appErr || !app) {
      return new Response(
        JSON.stringify({ error: "Application not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (app.status_email_sent === body.new_status) {
      return new Response(
        JSON.stringify({ ok: true, message: "Email already sent" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let subject: string;
    let html: string;

    if (body.new_status === "accepted") {
      subject = "Welcome to Axioria Initiative";
      html = `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1c1917;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="font-family:Georgia,serif;font-size:28px;color:#065f46;margin:0;">Axioria Initiative</h1>
            <p style="color:#78716c;font-size:14px;margin-top:4px;">No Student Walks Alone.</p>
          </div>
          <h2 style="font-family:Georgia,serif;font-size:22px;">Welcome to Axioria Initiative</h2>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">Dear ${app.full_name},</p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            We are delighted to inform you that your application to Axioria Initiative
            has been accepted. Welcome to the community!
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            You have been accepted into the <strong>${app.preferred_committee}</strong>
            committee. We are excited to have you join us in learning, leading, and
            growing together.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            Further details about your committee and upcoming meetings will be shared
            with you soon. If you have any questions, please contact us at
            heranataklti@gmail.com.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            Once again, welcome to Axioria. The future begins here.
          </p>
          <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
          <p style="font-size:14px;color:#78716c;">Axioria Initiative · The Future Begins Here.</p>
        </div>
      `;
    } else {
      subject = "Axioria Application Update";
      html = `
        <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1c1917;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="font-family:Georgia,serif;font-size:28px;color:#065f46;margin:0;">Axioria Initiative</h1>
            <p style="color:#78716c;font-size:14px;margin-top:4px;">No Student Walks Alone.</p>
          </div>
          <h2 style="font-family:Georgia,serif;font-size:22px;">Axioria Application Update</h2>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">Dear ${app.full_name},</p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            Thank you for your interest in Axioria Initiative and for taking the
            time to apply. We appreciate your willingness to contribute to the
            community.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            At this time, we were unable to move forward with your application.
            This does not reflect your potential or value as a person. We encourage
            you to continue learning, growing, and seeking opportunities to
            contribute to your community.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            If you have any questions, feel free to contact us at
            heranataklti@gmail.com.
          </p>
          <p style="font-size:16px;line-height:1.6;color:#44403c;">
            We wish you all the best on your journey.
          </p>
          <hr style="border:none;border-top:1px solid #e7e5e4;margin:32px 0;" />
          <p style="font-size:14px;color:#78716c;">Axioria Initiative · The Future Begins Here.</p>
        </div>
      `;
    }

    const result = await sendEmail(app.email, subject, html);
    if (!result.ok) {
      return new Response(
        JSON.stringify({ error: result.error }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await supabase
      .from("applications")
      .update({
        status: body.new_status,
        status_email_sent: body.new_status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.application_id);

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
