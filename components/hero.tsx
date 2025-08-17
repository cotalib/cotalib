import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (        
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container-fluid px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2 lg:pr-12">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The Student Housing Network You Can Trust
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                    Your housing search shouldn&apos;t be a struggle. We make it easy, secure, and student-friendly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button asChild>
                    <Link href="#contact">Join Beta Testers</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#awards">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/hero-cotalib.jpg"
                width="550"
                height="550"
                alt="Happy roommates"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

  )
}
