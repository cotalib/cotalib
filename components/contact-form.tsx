"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Loader2 } from "lucide-react"
import { config } from "@/lib/core"

export default function ContactForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("Sending...")

    try {
      setIsSending(true)
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus("Email sent successfully!")
        setEmail("")
      } else {
        setStatus("Failed to send email.")
      }
    } catch (err) {
      setStatus("Error sending email.")
      console.error(err)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container-fluid grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Join Our Beta or Partner With Us
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Be among the first to experience the future of roommate matching. Sign up for our beta or explore partnership opportunities.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-lg flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Sign up'
              )}
            </Button>
          </form>
          <p>{status}</p>
          {/* <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
            .
          </p> */}
          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Interested in partnering? Reach out to us directly.</p>
            <Button variant="link" asChild>
              <Link href={`mailto:${config.emails.contact}`}>{config.emails.contact}</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href={`mailto:${config.emails.partners}`}>{config.emails.partners}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
