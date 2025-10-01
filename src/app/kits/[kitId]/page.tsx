
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { CheckCircle, ShoppingCart } from "lucide-react";

const products = [
  {
    id: "robobox",
    image: PlaceHolderImages.find((img) => img.id === "product-1"),
    title: "Starter Bot Kit",
    description: "The perfect introduction to robotics. Build your first autonomous robot with our easy-to-follow guide.",
    price: "$99.99",
    features: ["Arduino-based controller", "Ultrasonic sensor for navigation", "All tools and parts included", "Online step-by-step tutorials"]
  },
  {
    id: "mechatronics",
    image: PlaceHolderImages.find((img) => img.id === "product-2"),
    title: "Advanced Sensor Pack",
    description: "Expand your robot's capabilities with a range of advanced sensors for navigation and interaction.",
    price: "$49.99",
    features: ["Infrared line followers", "Gyroscope and accelerometer", "Sound and light sensors", "Plug-and-play with Starter Bot"]
  },
  {
    id: "blix",
    image: PlaceHolderImages.find((img) => img.id === "product-3"),
    title: "AI Vision Module",
    description: "Give your creation the power of sight. Integrates seamlessly with our core platform for object recognition.",
    price: "$79.99",
    features: ["Onboard camera", "Pre-trained models for object detection", "Python API for custom projects", "Integrates with Raspberry Pi"]
  },
   {
    id: "drone",
    image: PlaceHolderImages.find((img) => img.id === "hero-1"), // Using a placeholder
    title: "DIY Drone Kit",
    description: "Build and fly your own drone with this comprehensive kit, including a high-res camera.",
    price: "$129.99",
    features: ["4K camera module", "GPS for stable flight", "Carbon fiber frame", "30-minute flight time"]
  },
];


export default function KitDetailPage({ params }: { params: { kitId: string } }) {
    const product = products.find(p => p.id === params.kitId);

    if (!product) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1 py-12 md:py-24">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
                             {product.image && (
                                <Image
                                    src={product.image.imageUrl}
                                    alt={product.image.description}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={product.image.imageHint}
                                />
                             )}
                             <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-lg">
                                 {product.price}
                             </div>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{product.title}</h1>
                            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>

                            <h2 className="text-2xl font-bold font-headline mb-4">Features</h2>
                            <ul className="space-y-3 mb-8">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CheckCircle className="text-primary w-6 h-6"/>
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button size="lg" className="w-full md:w-auto">
                                Add to Cart <ShoppingCart className="ml-2"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

// Generate static paths for all kits
export async function generateStaticParams() {
  return products.map((product) => ({
    kitId: product.id,
  }));
}
