import { NextRequest, NextResponse } from "next/server";
import { API_ROUTES, API_CONFIG, ERROR_MESSAGES } from "@/config";
import { formatBreedName } from "@/lib/utils";

export async function GET(req: NextRequest, { params }: { params: Promise<{ breedname: string }> }) {
  const { breedname } = await params;
  const { searchParams } = new URL(req.url);

  const count = searchParams.get("count") ?? "1";
  const breedname_url = formatBreedName(breedname)

  const apiUrl = `${API_ROUTES.DOG_API_URL}/breed/${breedname_url}/images/random/${count}`;

  const res = await fetch(apiUrl, {
    headers: { "User-Agent": "Next.js API Proxy" },
    next: { revalidate: API_CONFIG.REVALIDATE_TIME },
  });

  if (!res.ok) {
    return NextResponse.json({ error: ERROR_MESSAGES.IMG_FETCH_FAILED }, { status: res.status });
  }

  const data = await res.json();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${API_CONFIG.REVALIDATE_TIME}, stale-while-revalidate=${API_CONFIG.STALE_WHILE_REVALIDATE_TIME}`,
    },
  });
}
