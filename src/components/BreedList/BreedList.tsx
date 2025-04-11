"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { BreedListProps } from "@/types";
import styles from "./breedlist.module.css";
import BreedListImage from "./BreedListImage";

const BreedList = ({ breeds, input }: BreedListProps) => {
  const filteredBreeds = useMemo(() => {
    return breeds.filter((breedname) =>
      breedname.toLocaleLowerCase().includes(input.toLocaleLowerCase())
    );
  }, [input, breeds]);

  const FilteredBreedList = () => {
    return filteredBreeds.map((breedname) => {
      return (
        <div key={breedname} className={styles.breedlist}>
          <BreedListImage breedname={breedname} />
          <Link
            key={breedname}
            className={styles.link}
            href={`/breed/${breedname}`}
          >
            {breedname}
          </Link>
        </div>
      );
    });
  };

  const AllBreedList = () => {
    return breeds.map((breedname) => (
      <div key={breedname} className={styles.breedlist}>
        <BreedListImage breedname={breedname} />
        <Link
          key={breedname}
          className={styles.link}
          href={`/breed/${breedname}`}
        >
          {breedname}
        </Link>
      </div>
    ));
  };

  return (
    <div className="w-full h-full">
      {input === "" ? <AllBreedList /> : <FilteredBreedList />}
    </div>
  );
};

export default BreedList;
