import { NextResponse } from "next/server";
import { API_ROUTES, API_CONFIG, TIME } from "@/config";
import { DogBreeds } from "@/types";
import { capitalize, formatBreedName } from "@/lib/utils";


export async function getBreeds(): Promise<DogBreeds> {
  
    const apiUrl = `${API_ROUTES.DOG_API_URL}/breeds/list/all`;
    const res = await fetch(apiUrl, {
    headers: { "User-Agent": "Next.js API Proxy" },
    next: { revalidate: API_CONFIG.REVALIDATE_TIME },
    });
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
}

export async function getBreedsImages(breedname: string, count: number): Promise<string[]> {
  const breedname_url = formatBreedName(breedname)
  const apiUrl = `${API_ROUTES.DOG_API_URL}/breed/${breedname_url}/images/random/${count}`;
  const res = await fetch(apiUrl, {next: { revalidate: API_CONFIG.REVALIDATE_TIME }})
  const data = await res.json();

  return data.message as string[]
}