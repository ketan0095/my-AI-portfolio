export async function GET(req: Request) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API}`, {
    headers: {
      Authorization: `Bearer ${process.env.GIT_TOKEN}`,
    },
  });
  if (!res.ok) {
    return new Response('Failed to fetch stars', { status: res.status });
  }

  const data = await res.json();
  return Response.json({ stars: data.stargazers_count });
}