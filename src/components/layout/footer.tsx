
import { Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M19.63 4.37A8.91 8.91 0 0 0 12 3a9 9 0 0 0-9 9c0 2 .63 3.95 1.76 5.5L3 21l2.55-1.76A9 9 0 0 0 12 21a9 9 0 0 0 9-9c0-2.43-1-4.7-2.63-6.37zM12 19.5a7.5 7.5 0 0 1-3.75-1l-.27-.16-2.81 1.87L6.04 17l-.18-.28A7.5 7.5 0 0 1 4.5 12a7.5 7.5 0 0 1 12.7-5.3 7.5 7.5 0 0 1-5.2 12.8z"/>
        <path d="M16.75 13.96c-.25-.13-.43-.2-.5-.28-.07-.08-.07-.18-.02-.3s.18-.2.35-.22c.17-.02.4.05.68-.12.28-.07 1.1-.38 2.1-1.33-.98-.95-1.64-2.12-1.7-2.24-.05-.12-.03-.2 0-.28.03-.08.13-.18.2-.23.08-.05.15-.03.23-.02.08.02.18.1.25.23.07.13.12.2.17.25s.1.13.15.2c.05.07.03.12 0 .2s-.1.17-.17.22c-.08.05-.15.08-.2.1-.05.03-.1.03-.15-.02-.05-.05-.38-.2-1.03-.8s-1.12-1.1-1.15-1.15c-.03-.05-.08-.05-.13-.03-.05.02-.1.05-.12.08s-.1.13-.15.22c-.05.1-.1.2-.12.28-.03.08-.05.18 0 .28s.13.2.23.3c.1.1.2.22.35.38.15.15.28.3.4.4.13.1.23.17.33.22.1.05.18.08.23.03.05-.05.2-1 .25-1.18s.1-.15.12-.15.1-.03.15-.03z" fillRule="evenodd"/>
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
            <Image src="/img/logofavicon.ico" alt="The RoboBox Favicon" width={32} height={32} />
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
