"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CarouselModalProps } from "@/types";
import { API_ROUTES } from "@/config";
import styles from "./carousemodal.module.css";

const CarouselModal = ({ image, startIndex, onClose }: CarouselModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handleSlide = (newIndex: number) => {
    setIsAnimating(false);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const prevImage = () => {
    if (currentIndex > 0) handleSlide(currentIndex - 1);
  };

  const nextImage = () => {
    if (currentIndex < image.length - 1) handleSlide(currentIndex + 1);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.carousel}>
        <Image
          alt="close btn"
          src="/close.svg"
          width={20}
          height={20}
          className={styles.close}
          onClick={onClose}
        />
        <Image
          alt="left btn"
          src="/chevron-left.svg"
          className={styles.left_btn}
          width={20}
          height={20}
          onClick={prevImage}
        />
        <div className={styles.image_wrap}>
          <div
            className={`${styles.image_container} ${
              isAnimating ? styles.animate : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {image.map((img_url, index) => (
              <Image
                key={index}
                alt="breed"
                src={`${API_ROUTES.BREED_IMAGE_PROXY}?url=${encodeURIComponent(
                  img_url
                )}`}
                width={300}
                height={300}
                className={styles.image}
              />
            ))}
          </div>
        </div>

        <Image
          alt="right btn"
          src="/chevron-right.svg"
          className={styles.right_btn}
          width={20}
          height={20}
          onClick={nextImage}
        />
      </div>
    </div>
  );
};

export default CarouselModal;
