"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BreedImageProps } from "@/types";
import styles from "./breedimage.module.css";
import CarouselModal from "../CarouselModal";
import { API_ROUTES } from "@/config";

const BreedImage = ({ breed, image }: BreedImageProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    setLoadedImages(image.slice(0, 10));
    let index = 10;
    const interval = setInterval(() => {
      if (index >= image.length) {
        clearInterval(interval);
      } else {
        setLoadedImages((prev) => [...prev, ...image.slice(index, index + 10)]);
        index += 10;
      }
    }, 300);

    return () => clearInterval(interval);
  }, [image]);

  return (
    <>
      <div className={styles.root}>
        {loadedImages.map((img_url, index) => (
          <div
            key={index}
            className={styles.image_wrap}
            onClick={() => handleImageClick(index)}
          >
            <Image
              className="w-[95] h-[95] rounded-[10%]"
              alt={breed}
              src={`${API_ROUTES.BREED_IMAGE_PROXY}?url=${encodeURIComponent(
                img_url
              )}`}
              width={95}
              height={95}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {modalOpen && selectedIndex !== null && (
        <CarouselModal
          image={loadedImages}
          startIndex={selectedIndex}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default BreedImage;
