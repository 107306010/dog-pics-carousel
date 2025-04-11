"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import Image from "next/image";
import { API_ROUTES, TIME } from "@/config";
import { BreedListImageProps } from "@/types";
import { formatBreedName } from "@/lib/utils";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BreedListImage = ({ breedname }: BreedListImageProps) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const breedname_url = formatBreedName(breedname);
  const apiUrl = `${API_ROUTES.DOG_API_URL}/breed/${breedname_url}/images/random/1`;
  const { data, error } = useSWR(isVisible ? apiUrl : null, fetcher, {
    revalidateOnFocus: false, // whether to request new api when user go back to the page
    dedupingInterval: TIME.TEN_MINUTES, // the time that do not request new api
  });

  return (
    <div ref={imgRef}>
      {error ? (
        <p>Error loading image</p>
      ) : data ? (
        <Image
          src={data.message[0]}
          alt={breedname}
          width={50}
          height={50}
          className="mx-6 rounded-[50%] w-[50px] h-[50px]"
          loading="lazy"
        />
      ) : (
        <div className="mx-6 w-[50px] h-[50px]" />
      )}
    </div>
  );
};

export default BreedListImage;
