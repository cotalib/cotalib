import { Award } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";


export default function Awards() {
  return (
    <section id="awards" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Awards & Recognition</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are proud to be recognized for our innovation and impact in the housing sector.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl items-start gap-8 py-12 sm:grid-cols-1 md:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <CardTitle>Pitch Your Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">2nd place ENACTUS. (2025)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <CardTitle>QVMI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Recognized at the Global Housing Summit for our contribution to sustainable communities. (2023)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <CardTitle>Community Choice Award</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Voted by our users as the most helpful roommate matching service. (2023)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <CardTitle>Innovation in PropTech</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Honored for our innovative use of technology in property solutions. (2024)</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
  )
}
