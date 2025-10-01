
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const products = [
  {
    id: "robobox",
    image: PlaceHolderImages.find((img) => img.id === "product-1"),
    title: "Starter Bot Kit",
    description: "The perfect introduction to robotics. Build your first autonomous robot with our easy-to-follow guide.",
    price: "$99.99"
  },
  {
    id: "mechatronics",
    image: PlaceHolderImages.find((img) => img.id === "product-2"),
    title: "Advanced Sensor Pack",
    description: "Expand your robot's capabilities with a range of advanced sensors for navigation and interaction.",
    price: "$49.99"
  },
  {
    id: "blix",
    image: PlaceHolderImages.find((img) => img.id === "product-3"),
    title: "AI Vision Module",
    description: "Give your creation the power of sight. Integrates seamlessly with our core platform for object recognition.",
    price: "$79.99"
  },
   {
    id: "drone",
    image: PlaceHolderImages.find((img) => img.id === "hero-1"), // Using a placeholder
    title: "DIY Drone Kit",
    description: "Build and fly your own drone with this comprehensive kit, including a high-res camera.",
    price: "$129.99"
  },
];

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-dvh">
        <Header />
        <main className="flex-1">
            <section id="shop" className="bg-background">
            <div className="container mx-auto py-12">
                <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Our Store
                </h2>
                <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                    Build, code, and innovate with our collection of robotics kits.
                </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                    <Card key={product.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    {product.image && (
                        <div className="relative h-56 w-full">
                        <Link href={`/kits/${product.id}`}>
                            <Image
                                src={product.image.imageUrl}
                                alt={product.image.description}
                                fill
                                className="object-cover"
                                data-ai-hint={product.image.imageHint}
                            />
                        </Link>
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="font-headline">{product.title}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-2xl font-bold text-primary">{product.price}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Button asChild variant="secondary" className="w-full">
                        <Link href={`/kits/${product.id}`}>
                            Details <ArrowRight className="ml-2" />
                        </Link>
                        </Button>
                        <Button className="w-full">
                            Add to Cart <ShoppingCart className="ml-2" />
                        </Button>
                    </CardFooter>
                    </Card>
                ))}
                </div>
            </div>
            </section>
        </main>
        <Footer />
    </div>
  );
}
