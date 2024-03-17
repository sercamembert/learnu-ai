"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Squash as Hamburger } from "hamburger-react";
import { Menu, MenuItem } from "../ui/navbar-menu";

const variants = {
  open: { x: 0 },
  closed: { x: 800 },
};
const SetUpNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`w-full padding h-[80px] ${
        isOpen ? "bg-white" : "bg-white"
      } fixed top-0 flex items-center justify-between xl:h-[100px] z-50 ${
        isScrolled && "md:bg-white"
      } `}
    >
      <Link href="/" aria-description="Home">
        <Image
          src="/icons/logo.png"
          alt="Agromalz"
          aria-description="Home"
          width={293.32}
          height={41.62}
          className="w-[120px] md:w-[88px] lg:w-[117px] xl:w-[146px] 2xl:w-[164px] desktop:w-[197px] ultra:w-[293px]"
        />
      </Link>

      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Logout">
          <div className="flex flex-col space-y-4 ">
            <Link
              href=""
              title="Usługi"
              className="font-medium text-[7.82px] lg:text-[10px] xl:text-[12.81px] 2xl:text-[14.67px] desktop:text-[17.52px] "
            >
              Logout
            </Link>
          </div>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default SetUpNavbar;
