export { renderers } from '../../renderers.mjs';

const SUBJECT_MAX = 120;
const BODY_MAX = 2e3;
const prerender = false;
function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
const POST = async ({ request }) => {
  try {
    let subject;
    let body;
    const rawBody = await request.text();
    if (!rawBody) {
      return jsonResponse(400, { message: "Invalid request body." });
    }
    try {
      const payload = JSON.parse(rawBody);
      subject = payload.subject;
      body = payload.body;
    } catch {
      const params = new URLSearchParams(rawBody);
      subject = params.get("subject");
      body = params.get("body");
    }
    if (typeof subject !== "string" || typeof body !== "string") {
      return jsonResponse(400, { message: "Invalid request body." });
    }
    const normalizedSubject = subject.trim();
    const normalizedBody = body.trim();
    if (!normalizedSubject || !normalizedBody) {
      return jsonResponse(400, { message: "Subject and message are required." });
    }
    if (normalizedSubject.length > SUBJECT_MAX || normalizedBody.length > BODY_MAX) {
      return jsonResponse(400, { message: "Message exceeds allowed length." });
    }
    const resendApiKey = "re_P6ZmPui4_LWjPF9HAWPtzwrzHQ8NsHQUj";
    if (!resendApiKey) ;
    const toEmail = "rohailzuberi5@gmail.com";
    const fromEmail = "Portfolio Contact <onboarding@resend.dev>";
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: toEmail,
        subject: `[portfolio] ${normalizedSubject}`,
        text: normalizedBody
      })
    });
    if (!resendResponse.ok) {
      const providerError = await resendResponse.json().then((payload) => {
        if (payload && typeof payload === "object" && "message" in payload) {
          const message = payload.message;
          return typeof message === "string" ? message : null;
        }
        return null;
      }).catch(() => null);
      return jsonResponse(502, {
        message: providerError || "Email provider rejected the message."
      });
    }
    return jsonResponse(200, { message: "Message sent." });
  } catch (error) {
    console.error("Failed to send contact message", error);
    const errorMessage = "Unable to send message right now.";
    return jsonResponse(500, { message: errorMessage });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
