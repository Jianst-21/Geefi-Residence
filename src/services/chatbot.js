export async function sendChatToN8n(data) {
  const response = await fetch("/api/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name || "Guest",
      phone_number: data.phone_number || "",
      message: data.message,
      source: "website",
    }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Gagal chatbot: ${response.status} - ${text}`);
  }

  if (!text) {
    return {
      reply: "API berhasil dipanggil, tapi response masih kosong.",
    };
  }

  return JSON.parse(text);
}