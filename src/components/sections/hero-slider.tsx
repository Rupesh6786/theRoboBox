"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const heroSlides = [
  {
    image: PlaceHolderImages.find((img) => img.id === "hero-1"),
    title: "Build the Future of Robotics",
    subtitle: "Innovative kits for aspiring engineers and creators.",
    cta: "Explore Kits",
    ctaLink: "#products",
  },
  {
    image: PlaceHolderImages.find((img) => img.id === "hero-2"),
    title: "Robotics in Every Classroom",
    subtitle: "Empowering schools with cutting-edge educational tools.",
    cta: "For Schools",
    ctaLink: "#register",
  },
  {
    image: PlaceHolderImages.find((img) => img.id === "hero-3"),
    title: "Join the Robotics Revolution",
    subtitle: "Discover our mission to inspire the next generation.",
    cta: "About Us",
    ctaLink: "#about",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [emblaApi]);
  
  return (
    <section className="w-full pt-0">
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        ref={emblaRef}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[60vh] md:h-[80vh] w-full">
                {slide.image && (
                  <Image
                    src={slide.image.imageUrl}
                    alt={slide.image.description}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    data-ai-hint={slide.image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg text-center">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md text-center">
                    {slide.subtitle}
                  </p>
                  <Button asChild size="lg" className="font-bold text-lg">
                    <Link href={slide.ctaLink}>{slide.cta}</Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </div>
      </Carousel>
    </section>
  );
}
