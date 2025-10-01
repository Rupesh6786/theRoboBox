
import { Bot, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const workshops = [
  {
    id: "robotics-insight",
    title: "Insight to Robotics",
    description: "A beginner-friendly workshop covering the fundamentals of robotics, from basic electronics to simple programming.",
    instructor: "Dr. Eva Rostova",
    date: "October 12, 2024",
    duration: "3 Hours",
    image: PlaceHolderImages.find((img) => img.id === 'info-2')
  },
  {
    id: "all-in-one",
    title: "All in one Masterclass",
    description: "A comprehensive masterclass for enthusiasts looking to dive deep into mechatronics, AI, and autonomous systems.",
    instructor: "Prof. Kenji Tanaka",
    date: "October 19-20, 2024",
    duration: "2 Days",
    image: PlaceHolderImages.find((img) => img.id === 'hero-2')
  },
  {
    id: "scratch-to-pro",
    title: "Master class (Scratch to Pro)",
    description: "Take your skills from zero to hero. This intensive course covers everything from Scratch block-based coding to advanced Python for robotics.",
    instructor: "Maria Garcia",
    date: "November 2-3, 2024",
    duration: "2 Days",
    image: PlaceHolderImages.find((img) => img.id === 'info-1')
  },
];


export default function WorkshopDetailPage({ params }: { params: { workshopId: string } }) {
    const workshop = workshops.find(w => w.id === params.workshopId);

    if (!workshop) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-dvh bg-background">
            <Header />
            <main className="flex-1">
                 <section className="relative py-24 md:py-32 lg:py-40 bg-secondary/30">
                    {workshop.image && (
                        <Image 
                            src={workshop.image.imageUrl}
                            alt={workshop.title}
                            fill
                            className="object-cover z-0 opacity-20"
                        />
                    )}
                    <div className="container mx-auto text-center relative z-10">
                        <Bot className="mx-auto h-16 w-16 text-primary animate-pulse" />
                        <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                        {workshop.title}
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground md:text-xl">
                        {workshop.description}
                        </p>
                    </div>
                </section>
                <section className="py-12 md:py-24">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg -mt-32 relative z-20">
                            <div className="flex items-center gap-4">
                                <Calendar className="h-8 w-8 text-primary"/>
                                <div>
                                    <h3 className="font-bold">Date</h3>
                                    <p className="text-muted-foreground">{workshop.date}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-4">
                                <Clock className="h-8 w-8 text-primary"/>
                                <div>
                                    <h3 className="font-bold">Duration</h3>
                                    <p className="text-muted-foreground">{workshop.duration}</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-4">
                                <User className="h-8 w-8 text-primary"/>
                                <div>
                                    <h3 className="font-bold">Instructor</h3>
                                    <p className="text-muted-foreground">{workshop.instructor}</p>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto mt-12 text-center">
                            <Button size="lg">Register for Workshop</Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

// Generate static paths for all workshops
export async function generateStaticParams() {
  return workshops.map((workshop) => ({
    workshopId: workshop.id,
  }));
}
