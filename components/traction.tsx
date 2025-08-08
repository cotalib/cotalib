import Image from "next/image"

export default function Traction() {
  return (
    <section id="traction" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Proven Success, Trusted by Users</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is rapidly growing, connecting thousands of individuals and creating happy homes.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/hero-cotalib.jpg"
                width="550"
                height="310"
                alt="Traction Chart"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">10,000+ Matches Made</h3>
                      <p className="text-muted-foreground">
                        Successfully connected over ten thousand individuals with compatible roommates.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">95% User Satisfaction</h3>
                      <p className="text-muted-foreground">
                        High satisfaction rates reported by users who found their ideal living partners.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Featured in Tech Blogs</h3>
                      <p className="text-muted-foreground">
                        Recognized by leading tech publications for our innovative approach to housing.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
  )
}