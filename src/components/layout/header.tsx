
"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const navLinks = [
  {
    label: "Kits",
    href: "#",
    subLinks: [
      { label: "RoboBox Kit", href: "/kits/robobox" },
      { label: "Mechatronics Kits", href: "/kits/mechatronics" },
      { label: "Blix Kits", href: "/kits/blix" },
      { label: "Drone Kit", href: "/kits/drone" },
    ],
  },
  {
    label: "Workshop",
    href: "#",
    subLinks: [
      { label: "Insight to Robotics", href: "/workshops/robotics-insight" },
      { label: "All in one Masterclass", href: "/workshops/all-in-one" },
      { label: "Master class (Scratch to Pro)", href: "/workshops/scratch-to-pro" },
    ],
  },
  {
    label: "Community",
    href: "#",
    subLinks: [
        { label: "Games", href: "/community/games" },
        { label: "Scholarship", href: "/community/scholarship" },
        { label: "Make your Bot", href: "/community/make-your-bot" },
    ]
  },
  { href: "/shop", label: "Shop" },
  { href: "/career", label: "Career" },
  { href: "#about", label: "About" },
];


const NavLink = ({ link, isMobile }: { link: (typeof navLinks)[number]; isMobile?: boolean}) => {
    const [open, setOpen] = useState(false);

    if (link.subLinks) {
        if (isMobile) {
            return (
              <div key={link.label} className="flex flex-col gap-2">
                <h3 className="font-semibold text-foreground/80">{link.label}</h3>
                {link.subLinks.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className="pl-4 font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )
        }
        return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <div
                  className="py-2"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                    <Button variant="ghost" className="font-medium text-foreground/60 transition-colors hover:text-foreground/80 hover:bg-transparent p-0 h-auto">
                      {link.label}
                    </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                {link.subLinks.map((subLink) => (
                  <DropdownMenuItem key={subLink.href} asChild>
                    <Link href={subLink.href}>{subLink.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Link
          key={link.href}
          href={link.href}
          className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
        >
          {link.label}
        </Link>
      );

}

const renderNavLinks = (isMobile = false) => {
  return navLinks.map((link) => <NavLink link={link} isMobile={isMobile} key={link.label ?? link.href} />);
};


export default function Header() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="/img/logo.png"
              alt="Company Logo"
              width={160}
              height={66}
              className="h-16 w-auto"
            />
          </Link>
        </div>


        <div className="flex-1 items-center justify-center hidden md:flex">
          <nav className="flex items-center gap-6 text-sm">
             {renderNavLinks()}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="outline"
              className="md:hidden"
              size="icon"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-10 md:w-[200px] lg:w-[320px]" />
            </div>
          </div>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 px-4 pt-8 text-lg">
                {renderNavLinks(true)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {mobileSearchOpen && (
        <div className="container md:hidden pb-4">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-10" />
            </div>
        </div>
      )}
    </header>
  );
}
