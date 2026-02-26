import type { APIRoute } from "astro";

const SUBJECT_MAX = 120;
const BODY_MAX = 2000;
export const prerender = false;

function jsonResponse(status: number, payload: Record<string, string>) {
	return new Response(JSON.stringify(payload), {
		status,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export const POST: APIRoute = async ({ request }) => {
	try {
		let subject: unknown;
		let body: unknown;
		const rawBody = await request.text();

		if (!rawBody) {
			return jsonResponse(400, { message: "Invalid request body." });
		}

		try {
			const payload = JSON.parse(rawBody) as { subject?: unknown; body?: unknown };
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

		const resendApiKey = import.meta.env.RESEND_API_KEY;
		if (!resendApiKey) {
			return jsonResponse(500, { message: "Email service is not configured." });
		}

		const toEmail = import.meta.env.CONTACT_TO_EMAIL || "rohailzuberi5@gmail.com";
		const fromEmail =
			import.meta.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

		const resendResponse = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${resendApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [toEmail],
				reply_to: toEmail,
				subject: `[portfolio] ${normalizedSubject}`,
				text: normalizedBody,
			}),
		});

		if (!resendResponse.ok) {
			const providerError = await resendResponse
				.json()
				.then((payload) => {
					if (payload && typeof payload === "object" && "message" in payload) {
						const message = (payload as { message?: unknown }).message;
						return typeof message === "string" ? message : null;
					}
					return null;
				})
				.catch(() => null);

			return jsonResponse(502, {
				message: providerError || "Email provider rejected the message.",
			});
		}

		return jsonResponse(200, { message: "Message sent." });
	} catch (error) {
		console.error("Failed to send contact message", error);
		const errorMessage =
			import.meta.env.DEV && error instanceof Error
				? `Unable to send message right now. ${error.message}`
				: "Unable to send message right now.";
		return jsonResponse(500, { message: errorMessage });
	}
};
