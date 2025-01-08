"use client";
import ROUTES from "@/constant/route.constants";
import { Action } from "@/permissions/action.enum";
import { hasPermission } from "@/permissions/component.permission";
import { Resource } from "@/permissions/resource.enum";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import { isArtist } from "@/utils/check.role";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutUser = () => {
    redirect(ROUTES.LOGOUT);
  };

  // Navigation items array
  const navItems = [
    {
      name: "User",
      href: ROUTES.HOME,
      resource: Resource.USER,
      action: Action.READ,
    },
    {
      name: "Artist",
      href: ROUTES.ARTIST,
      resource: Resource.ARTIST,
      action: Action.READ,
    },
  ];

  if (!isMounted) {
    return <Loader />;
  }
  return (
    <div className="mb-20 w-screen ">
      <nav className="fixed top-0 z-[9999] w-full bg-white bg-opacity-90 px-4 py-4 shadow backdrop-blur-lg lg:px-8 ">
        <div className="container mx-auto flex items-center justify-between text-slate-800 ">
          <Link href="/" className="text-2xl font-bold uppercase text-red-600">
            Artist Management System
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative h-10 w-10 flex items-center justify-center text-slate-800 hover:text-red-500"
            onClick={toggleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 z-50 h-screen w-64 transform bg-slate-100 shadow-lg transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between border-b px-4 py-4">
              <Link
                href="/"
                className="text-xl font-bold uppercase text-red-600"
              >
                Artist Management System
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-slate-600 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col gap-4 p-4">
              {navItems.map((item) => {
                return (
                  hasPermission(item.resource, item.action) && (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-lg text-slate-600 hover:text-red-500"
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                );
              })}

              {isArtist() && (
                <li>
                  <Link
                    href={ROUTES.SONG}
                    className="block text-lg text-slate-600 hover:text-red-500"
                  >
                    Song
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={logoutUser}
                  className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                return (
                  hasPermission(item.resource, item.action) && (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block text-lg text-slate-600 hover:text-red-500"
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                );
              })}
              {isArtist() && (
                <li>
                  <Link
                    href={ROUTES.SONG}
                    className="block text-lg text-slate-600 hover:text-red-500"
                  >
                    Song
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={logoutUser}
                  className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
