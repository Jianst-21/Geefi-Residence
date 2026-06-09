export async function POST(request) {
  try {
    const body = await request.json();

    const n8nUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nUrl) {
      return Response.json(
        {
          reply: "N8N_WEBHOOK_URL belum disetting di .env",
        },
        { status: 500 }
      );
    }

    const response = await fetch(n8nUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name || "Guest",
        phone_number: body.phone_number || "",
        message: body.message,
        source: body.source || "website",
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return Response.json(
        {
          reply: `n8n error: ${response.status} - ${text}`,
        },
        { status: response.status }
      );
    }

    if (!text) {
      return Response.json({
        reply: "Webhook n8n terpanggil, tapi belum mengirim response JSON.",
      });
    }

    const data = JSON.parse(text);

    return Response.json({
      reply: data.reply || data.output || "Chatbot berhasil merespon.",
    });
  } catch (error) {
    console.error("API Chatbot Error:", error);

    return Response.json(
      {
        reply: "Terjadi error saat menghubungi chatbot.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}