'use client';

import React from 'react'
import { PricingTable } from '@clerk/nextjs'

function Pricing() {
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

      <div className="relative mt-24 flex flex-col items-center justify-center px-6 md:px-40 gap-3">
        <h2 className="font-game text-4xl text-center">Pricing</h2>
        <h2 className="font-game text-2xl text-zinc-300 text-center">
          Join for Unlimited Access to All Features
        </h2>

        <div className="w-full max-w-5xl">
          <PricingTable />
        </div>
      </div>

    </div>
  )
}

export default Pricing