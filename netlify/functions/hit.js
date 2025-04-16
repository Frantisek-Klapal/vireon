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

  if (response.ok) {
    res.status(200).send("Triggered visitor_ping");
  } else {
    const error = await response.text();
    res.status(response.status).send(`GitHub dispatch failed: ${error}`);
  }
}
