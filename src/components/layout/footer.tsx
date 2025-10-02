
import { Bot, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M21.44,11.35,12.86,2.77A2.34,2.34,0,0,0,9.52,2.77L1,9.52a2.34,2.34,0,0,0,0,3.31l8.58,8.58a2.34,2.34,0,0,0,3.31,0l8.58-8.58a2.34,2.34,0,0,0,0-3.31Z"></path>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
);
  
  const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10C2.5 6 4.5 4 7 4h10c2.5 0 4.5 2 4.5 3.5v0a24.12 24.12 0 0 1 0 10c0 1.5-2 3.5-4.5 3.5H7c-2.5 0-4.5-2-4.5-3.5v0Z" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <p className="text-sm font-semibold">
              The RoboBox
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} The RoboBox Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://www.instagram.com/therobobox/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="https://api.whatsapp.com/send?phone=918591374712" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="https://youtube.com/@therobobox8777" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <YoutubeIcon className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
