export async function runSQL(query) {
  const response = await fetch("http://localhost:5000/api/sql/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Query failed");
  }

  return response.json();
}
