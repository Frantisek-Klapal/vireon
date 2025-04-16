export default async function handler(req, res) {
  const token = process.env.GITHUB_PAT;
  const repo = "Frantisek-Klapal/vireon";

  const response = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({ event_type: "visitor_ping" }),
  });

  res.status(response.ok ? 200 : 500).end("Triggered");
}
