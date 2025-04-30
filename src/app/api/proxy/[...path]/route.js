import { NextResponse } from "next/server";

export async function GET(request) {
  return handleRequest(request);
}

export async function POST(request) {
  return handleRequest(request);
}

async function handleRequest(request) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    // console.error('Backend URL not configured');
    return NextResponse.json(
      { error: "Backend URL not configured" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const targetUrl = `${backendUrl}${url.pathname.replace("/api/proxy", "")}${
    url.search
  }`; // Include query parameters

  // console.log('target', targetUrl);

  try {
    const requestBody =
      request.method !== "GET" ? await request.json() : undefined;
    // console.log('Request body:', requestBody);

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        // Add any other necessary headers
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });

    // console.log('Response status:', response.status);
    const responseBody = await response.text();
    // console.log('Response body:', responseBody);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend request failed", details: responseBody },
        { status: response.status }
      );
    }

    return NextResponse.json(JSON.parse(responseBody), {
      status: response.status,
    });
  } catch (error) {
    // console.error('Proxy error:', error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
