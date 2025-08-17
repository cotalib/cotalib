import { config } from "@/lib/core"
import Image from "next/image"

export default function Traction() {
  return (
    <section id="traction" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container-fluid px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Mission, Vision, Values</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {/* Cotalib is dedicated to providing safe, affordable, and student-friendly housing while fostering community and exchange among young people. Our vision is to become the trusted student housing network in Morocco and across Africa, driven by technology, solidarity, and sustainability. */}
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
                  {config.traction.map((item, index) => (
                    <li key={index}>
                      <div className="grid gap-1">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
  )
}