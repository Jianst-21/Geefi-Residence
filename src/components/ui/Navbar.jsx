"use client";

import { nav_items } from "@/constants/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Building2,
  Flower,
  Calculator,
  MapPin,
  Map,
  Info,
} from "lucide-react";

const getIcon = (href, isActive) => {
  const props = {
    size: 20,
    className: isActive ? "text-[#875C0C]" : "text-stone-400",
    strokeWidth: isActive ? 2 : 1.5,
  };

  switch (href) {
    case "/":
      return <Home {...props} />;
    case "/tentang":
      return <Info {...props} />;
    case "/unit":
      return <Building2 {...props} />;
    case "/fasilitas":
      return <Flower {...props} />;
    case "/simulasi-kpr":
      return <Calculator {...props} />;
    // case "/lokasi":
    //   return <MapPin {...props} />;
    default:
      return <Info {...props} />;
  }
};

const Navbar = () => {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <>
      <nav className="py-[18px] font- px-6 md:px-[32px] w-full flex justify-between items-center sticky top-0 bg-[#FBFBFB] z-40 border-b border-stone-100/50 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Geefi Residence Logo"
            width={32}
            height={32}
            className="w-8 h-8 md:w-9 md:h-9 object-contain"
          />
          <h5 className="font-bold text-[18px] md:text-[20px] text-[#9c7524]">
            Geefi Residence
          </h5>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8">
          {nav_items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`transition-all duration-200 text-[14px] ${isActive
                      ? "text-[#9c7524] font-bold border-b-2 border-[#9c7524] pb-1"
                      : "text-stone-500 hover:text-[#9c7524] font-medium"
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Contact Button */}
        <Link
          href={"#"}
          className="hidden lg:block py-2.5 px-6 text-[14px] font-semibold rounded-full bg-[#9c7524] text-white hover:bg-[#85631e] transition-colors duration-200 shadow-sm"
        >
          Hubungi Kami
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden text-[#9c7524] p-1"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} strokeWidth={2} />
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 lg:hidden ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-[#FCFBF8] z-50 transform transition-transform duration-300 ease-in-out lg:hidden rounded-l-[40px] shadow-2xl flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-start p-8 pb-10">
          <div className="flex flex-col">
            <h2 className="text-[26px] font-bold text-[#875C0C] leading-[1.1] tracking-tight">
              Geefi
              <br />
              Residence
            </h2>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200 transition-colors mt-1"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <ul className="flex flex-col gap-6">
            {nav_items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-5 group"
                  >
                    <div className="w-6 flex justify-center">
                      {getIcon(item.href, isActive)}
                    </div>
                    <span
                      className={`text-[16px] transition-colors ${isActive
                          ? "text-[#875C0C] font-semibold"
                          : "text-[#333333] font-normal group-hover:text-[#875C0C]"
                        }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}

            {/* Extra Hubungi Kami Link for Mobile */}
            <li>
              <Link
                href="#"
                onClick={() => setIsDrawerOpen(false)}
                className="flex items-center gap-5 group mt-2 pt-6 border-t border-stone-200/60"
              >
                <div className="w-6 flex justify-center">
                  <Map
                    size={20}
                    className="text-stone-400 group-hover:text-[#875C0C]"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[16px] text-[#333333] font-normal group-hover:text-[#875C0C] transition-colors">
                  Hubungi Kami
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;