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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 6.05A9 9 0 0 1 20 12h-2a7 7 0 0 0-5.95-5.95v-2.05zm-4.01 0A5 5 0 0 1 15 11h-2a3 3 0 0 0-3-3V6.05z" />
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
