"use client";
import React, { useEffect, useRef } from "react";

const MobileScroll = ({ children }: any) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="padding overflow-x-auto md:overflow-x-hidden flex gap-[45px] md:gap-0 w-full"
    >
      {children}
    </div>
  );
};

export default MobileScroll;
