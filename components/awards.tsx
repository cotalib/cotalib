import { Award, SquareArrowOutUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { config } from "@/lib/core";
import Link from "next/link";

export default function Awards() {
  return (
    <section id="awards" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container-fluid px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Awards & Recognition</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are proud to be recognized for our innovation and impact in the housing sector.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:gap-12">
              {config.awards.map((award, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Link className="flex items-center justify-center space-x-3" href={award.link} target="_blank">
                      <Award className="h-8 w-8 text-yellow-500" />
                      <CardTitle className="flex">{award.title}&nbsp;<SquareArrowOutUpRight className="size-4 ml-2" /></CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{award.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  )
}
