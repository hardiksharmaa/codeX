'use client';

import React, { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

function ContactUs() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      toast.success('Message sent successfully! 🚀 I’ll get back to you soon.')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      <div className="fixed inset-0 -z-20">
        <img
          src="/pricing-bg.gif"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="fixed inset-0 bg-black/70 -z-10" />

      <div className="relative flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 bg-black/60 backdrop-blur-xl border border-zinc-700 rounded-2xl p-8 shadow-2xl">

          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-game text-4xl">Let’s Connect 👋</h2>
            <p className="font-game text-zinc-300 text-xl">
              Got a question, idea, or feedback?  
              Drop a message and let’s build something awesome together.
            </p>

            <div className="flex gap-4 mt-4">
              <Link href="https://www.instagram.com/whyhardikk/" target="_blank">
                <Image src="/instagram.png" alt="instagram" width={36} height={36} />
              </Link>
              <Link href="https://www.facebook.com/whyhardikk/" target="_blank">
                <Image src="/facebook.png" alt="facebook" width={36} height={36} />
              </Link>
              <Link href="https://www.linkedin.com/in/hardiksh121/" target="_blank">
                <Image src="/linkedin.png" alt="linkedin" width={36} height={36} />
              </Link>
              <Link href="https://github.com/hardiksharmaa" target="_blank">
                <Image src="/github.png" alt="github" width={36} height={36} />
              </Link>
            </div>

            <p className="font-game text-zinc-400 mt-4 text-xl">
              📧 hs489819@gmail.com
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 font-game"
          >
            <input
              required
              placeholder="Your Name"
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
            />

            <input
              required
              type="email"
              placeholder="Your Email"
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-500"
            />

            <textarea
              required
              rows={4}
              placeholder="Your Message"
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-yellow-500 resize-none"
            />

            <Button
              type="submit"
              variant="pixel"
              size="lg"
              disabled={loading}
              className="mt-2 text-xl"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default ContactUs