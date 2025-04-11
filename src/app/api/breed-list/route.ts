import { NextResponse } from "next/server";
import { API_ROUTES, API_CONFIG, ERROR_MESSAGES } from "@/config";
import { DogBreeds } from "@/types";
import { capitalize } from "@/lib/utils";

async function getBreeds(): Promise<DogBreeds|NextResponse> {
  
    try {
        const apiUrl = `${API_ROUTES.DOG_API_URL}/breeds/list/all`;
        
        const res = await fetch(apiUrl, {
        headers: { "User-Agent": "Next.js API Proxy" },
        next: { revalidate: API_CONFIG.REVALIDATE_TIME },
        });

        if (!res.ok) {
            return NextResponse.json({ error: ERROR_MESSAGES.BREED_FETCH_FAILED }, { status: res.status });
        }

        const data = await res.json();
        const breeds: Record<string, string[]> = data.message;
        const formattedBreeds: string[] = [];

        Object.entries(breeds).forEach(([breed, subBreeds]) => {
        if (subBreeds.length !== 0) {
            subBreeds.forEach((subBreed) => {
            formattedBreeds.push(`${capitalize(subBreed)} ${capitalize(breed)}`);
            });
        } else {
            formattedBreeds.push(capitalize(breed));
        }
        });

        return formattedBreeds;

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const breeds = await getBreeds();
    return NextResponse.json({ breeds }, {
      headers: {
        "Cache-Control": `public, s-maxage=${API_CONFIG.REVALIDATE_TIME}, stale-while-revalidate=${API_CONFIG.STALE_WHILE_REVALIDATE_TIME}`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}