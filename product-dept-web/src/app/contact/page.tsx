"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("https://formsubmit.co/ajax/ryrorussell1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
  <div className="flex flex-col min-h-screen bg-[#FAF9F6] pt-[72px]">
    <section className="flex-grow w-full border-b border-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[calc(100vh-72px)]">

        {/* LEFT SIDE COPY BLOCK */}
        <div className="border-b lg:border-b-0 lg:border-r border-black p-8 md:p-16 flex flex-col justify-start bg-[#FAF9F6]">
          <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter text-black uppercase leading-none mb-12">
            INITIATE <br /> PROTOCOL.
          </h1>
          <p className="text-lg font-bold text-black uppercase tracking-widest max-w-sm mb-8">
            READY TO EXECUTE A PROJECT? WE ONLY PARTNER WITH AMBITIOUS OPERATORS.
          </p>
          <div className="w-full h-px bg-black mb-8" />
          <p className="font-mono text-sm tracking-widest text-black/60 uppercase">
              // HQ_NEW_YORK <br /> // INBOUND_DATA_LINK
          </p>
        </div>

        {/* RIGHT SIDE FORM GRID */}
        <div className="p-8 md:p-16 bg-black text-[#FAF9F6] flex flex-col justify-center">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full mx-auto">
              <input type="hidden" name="_subject" value="New Inquiry from Product Dept." />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-xs font-black tracking-widest uppercase text-[#FAF9F6]/50">[ PARAM_01: NAME ]</label>
                  <input type="text" id="name" name="name" className="border-2 border-[#FAF9F6] bg-black py-4 px-4 outline-none focus:bg-[#FAF9F6] focus:text-black transition-colors font-mono uppercase text-sm" placeholder="JANE DOE" required />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-[#FAF9F6]/50">[ PARAM_02: COMM_LINK ]</label>
                  <input type="email" id="email" name="email" className="border-2 border-[#FAF9F6] bg-black py-4 px-4 outline-none focus:bg-[#FAF9F6] focus:text-black transition-colors font-mono uppercase text-sm" placeholder="JANE@COMPANY.COM" required />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="company" className="text-xs font-black tracking-widest uppercase text-[#FAF9F6]/50">[ PARAM_03: ORGANIZATION ]</label>
                <input type="text" id="company" name="company" className="border-2 border-[#FAF9F6] bg-black py-4 px-4 outline-none focus:bg-[#FAF9F6] focus:text-black transition-colors font-mono uppercase text-sm" placeholder="ORGANIZATION NAME" />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="description" className="text-xs font-black tracking-widest uppercase text-[#FAF9F6]/50">[ PARAM_04: DIRECTIVE ]</label>
                <textarea id="description" name="description" rows={5} className="border-2 border-[#FAF9F6] bg-black py-4 px-4 outline-none focus:bg-[#FAF9F6] focus:text-black transition-colors resize-none font-mono uppercase text-sm" placeholder="STATE YOUR OBJECTIVE..." required></textarea>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FAF9F6] text-black hover:bg-black hover:text-[#FAF9F6] hover:border-[#FAF9F6] border-2 border-transparent transition-colors py-6 font-black text-2xl tracking-tighter uppercase"
                >
                  {isSubmitting ? "TRANSMITTING..." : "EXECUTE."}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto">
              <div className="uppercase border-2 border-[#FAF9F6] p-4 font-mono font-black mb-8 text-xs tracking-widest">
                [ STATUS: 200 OK ]
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">DATA RECEIVED.</h2>
              <p className="text-lg font-mono text-[#FAF9F6]/70 uppercase mb-12">
                THE DIRECTIVE HAS BEEN LOGGED. A DISPATCH WILL BE SENT TO YOUR COMM_LINK SHORTLY.
              </p>
              <Link
                href="/"
                className="bg-[#FAF9F6] text-black hover:bg-black hover:text-[#FAF9F6] border-2 border-transparent hover:border-[#FAF9F6] transition-colors py-6 px-12 font-black text-xl tracking-tighter uppercase inline-flex"
              >
                RETURN TO BASE &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);
}
