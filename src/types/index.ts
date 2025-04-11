export type DogBreeds = string[]

export interface SearchBarProps {
    breeds: DogBreeds;
}

export type BreedPageProps = Promise<{ breedname: string }>

export interface BreedListProps {
    breeds: DogBreeds;
    input: string;
}
export interface BreedListImageProps {
    breedname: string
}
export interface BreedImageProps {
    breed: string,
    image: string[]
}
export interface CarouselModalProps {
    image: string[],
    startIndex: number,
    onClose: () => void
}