export function formatBreedName(breedname: string): string | null {
  if (!breedname) return null;

  const breedname_arr = breedname.toLowerCase().split(" ");
  return breedname_arr.length === 1
    ? `${breedname_arr[0]}`
    : `${breedname_arr[1]}/${breedname_arr[0]}`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}