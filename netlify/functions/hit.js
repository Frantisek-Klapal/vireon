console.log("GITHUB_PAT:", token ? "Exists" : "Missing");
console.log("Dispatch response status:", response.status);

export default async function handler(req, res) {
  const token = process.env.GITHUB_PAT;
  const repo = "Frantisek-Klapal/vireon";

  if (!token) {
    console.error("GITHUB_PAT is missing");
    return res.status(500).send("Missing GitHub token");
  }

  const response = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
    body: JSON.stringify({ event_type: "visitor_ping" }),
  });

  const resultText = await response.text();

  if (response.ok) {
    console.log("Dispatch sent to GitHub");
    res.status(200).send("Triggered visitor_ping");
  } else {
    console.error("Dispatch failed:", resultText);
    res.status(response.status).send(`GitHub dispatch failed: ${resultText}`);
  }
}
