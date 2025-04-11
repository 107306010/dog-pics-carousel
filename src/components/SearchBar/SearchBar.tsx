"use client";

import React, { useState } from "react";
import { SearchBarProps } from "@/types";
import BreedList from "../BreedList";
import Image from "next/image";
import { get_image } from "@/lib/image";

const SearchBar = ({ breeds }: SearchBarProps) => {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const clearInput = () => {
    setInput("");
  };
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  return (
    <div className="w-1/2 h-[80vh]">
      <div className="w-full max-h-full bg-[#3f4454] rounded-xl overflow-auto">
        <div className="w-1/2 h-[40px] p-2 flex bg-[#3f4454] rounded-xl absolute">
          <Image
            className="w-[30px] m-auto"
            src={get_image("svg", "search")}
            alt="search icon"
          />
          <form className="flex-1 flex items-center">
            <input
              className="w-full text-white"
              placeholder={
                focus ? "Input breed name to search" : "Click to search"
              }
              value={input}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={handleInputChange}
            />
          </form>
          {input !== "" ? (
            <Image
              className="w-[30px] m-auto"
              src={get_image("svg", "close")}
              alt="close icon"
              onClick={clearInput}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="h-[40px]"></div>
        <BreedList breeds={breeds} input={input} />
      </div>
    </div>
  );
};

export default SearchBar;
