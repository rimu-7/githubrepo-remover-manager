import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { repos, accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Missing access token" }, { status: 401 });
    }

    const results = [];

    for (const fullName of repos) {
      const response = await fetch(`https://api.github.com/repos/${fullName}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github+json",
        },
      });
      results.push({ repo: fullName, status: response.status });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete repos" }, { status: 500 });
  }
}
