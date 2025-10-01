"use client";

import { useState, useRef, useEffect, type MouseEvent } from "react";
import { generateDiscountCode, type DiscountCodeOutput } from "@/ai/flows/dynamic-discount-codes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function DiscountGenerator() {
  const [discount, setDiscount] = useState<DiscountCodeOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    async function getDiscount() {
      try {
        setLoading(true);
        const result = await generateDiscountCode({});
        setDiscount(result);
      } catch (error) {
        console.error("Failed to generate discount code:", error);
      } finally {
        setLoading(false);
      }
    }
    getDiscount();
  }, []);
  
  const getCanvasContext = () => canvasRef.current?.getContext("2d");

  useEffect(() => {
    const context = getCanvasContext();
    if (context && !loading) {
      context.fillStyle = "#e6e6fa"; // Lavender accent color
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      context.fillStyle = "#4169E1"; // Royal blue primary color
      context.font = "bold 24px 'Space Grotesk'";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("SCRATCH TO REVEAL", context.canvas.width / 2, context.canvas.height / 2);
    }
  }, [loading]);

  const scratch = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const context = getCanvasContext();
    if (context) {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 24, 0, 2 * Math.PI);
      context.fill();
    }
  };

  const checkReveal = () => {
    const context = getCanvasContext();
    if (!context) return;
    const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    const transparentPixels = Array.from(imageData.data).filter((_, i) => (i + 1) % 4 === 0 && _ === 0).length;
    const totalPixels = context.canvas.width * context.canvas.height;
    if (transparentPixels / totalPixels > 0.5) {
      setIsRevealed(true);
    }
  };

  const startDrawing = () => { isDrawing.current = true; };
  const stopDrawing = () => { isDrawing.current = false; checkReveal(); };
  
  const revealAll = () => {
    setIsRevealed(true);
  }

  return (
    <section id="discount" className="bg-background">
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            A Gift for You
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Everyone deserves a little something extra. Scratch below to reveal your exclusive discount.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto overflow-hidden shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 font-headline">
              <Gift className="text-primary" /> Your Exclusive Discount
            </CardTitle>
            <CardDescription className="text-center">
              A special offer, generated just for you by our AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full rounded-lg">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-card rounded-lg border-2 border-dashed border-primary/50">
                {loading ? (
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                ) : (
                  <>
                    <p className="text-lg text-muted-foreground">You've won a</p>
                    <p className="text-6xl font-bold text-primary font-headline my-2">
                      {discount?.discountPercentage}% OFF
                    </p>
                    <p className="text-lg text-muted-foreground">coupon! Use code:</p>
                    <p className="mt-2 rounded-md bg-primary/10 px-4 py-2 font-mono text-2xl font-bold text-primary">
                      {discount?.discountCode}
                    </p>
                  </>
                )}
              </div>
              {!isRevealed && (
                <canvas
                  ref={canvasRef}
                  width="1280"
                  height="720"
                  className="absolute inset-0 w-full h-full cursor-pointer rounded-lg"
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onMouseMove={scratch}
                />
              )}
            </div>
             <div className="text-center mt-4">
                <Button variant="link" onClick={revealAll} disabled={isRevealed || loading}>
                    {isRevealed ? "Offer Revealed!" : "Click to reveal instantly"}
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
