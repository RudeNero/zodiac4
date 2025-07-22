export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { sign } = req.body;

  if (!sign) {
    return res.status(400).json({ error: 'Signo não informado' });
  }

  const prompt = `Crie um horóscopo do dia para o signo de ${sign}, em português, com tom místico e envolvente.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Você é um astrólogo que escreve horóscopos diários místicos e inspiradores." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Erro ao gerar horóscopo.";
    res.status(200).json({ content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao chamar a API da OpenAI' });
  }
}
