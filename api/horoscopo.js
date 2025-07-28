export default async function handler(req, res) {
  const { signo = 'aries' } = req.query;

  try {
    const response = await fetch(`https://aztro.sameerkumar.website/?sign=${signo}&day=today`, {
      method: 'POST'
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Erro ao buscar horóscopo:", error);
    res.status(500).json({ erro: 'Erro ao buscar horóscopo' });
  }
}
