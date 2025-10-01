import { Menu, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#register", label: "For Schools" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center">
            <Image 
              src="/img/logo.png" 
              alt="Company Logo" 
              width={120} 
              height={50}
            />
          </Link>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="relative w-full max-w-md">
            <Input type="search" placeholder="Search..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
           <nav className="hidden gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
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
              <div className="relative mt-6 w-full max-w-md">
                <Input type="search" placeholder="Search..." className="pl-10" />
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
              <nav className="flex flex-col gap-6 pt-8 text-lg">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-medium text-foreground/60 transition-colors hover:text-foreground/80"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
