"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Hamburger from "hamburger-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={() => setActive(item)} className="relative ">
      <Hamburger
        toggled={active !== null ? true : false}
        size={17}
        toggle={setIsOpen}
        color="#363636"
      />
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white overflow-hidden rounded-[5px] md:rounded-md lg:rounded-lg 2xl:rounded-[10px] desktop:rounded-[15px]
                
                "
                style={{ boxShadow: "0px 9.2px 23px rgba(54, 54, 54, 0.1)" }}
              >
                <LogoutLink>
                  {" "}
                  <motion.div
                    layout // layout ensures smooth animation
                    className="w-max h-full 
                  px-[11px] lg:px-[15px] xl:px-[19px] 2xl:px-[21px] desktop:px-[25px] ultra:px-[38px] 
                  py-[6px] lg:py-[7px] xl:py-[9px] 2xl:py-[10px] desktop:py-[12px] ultra:py-[18px]
                  "
                  >
                    {children}
                  </motion.div>
                </LogoutLink>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full boder border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4  "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
