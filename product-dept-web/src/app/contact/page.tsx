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
  <div className="flex flex-col min-h-screen bg-[#FFFFFF] pt-[72px]">
    <section className="flex-grow w-full border-b border-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[calc(100vh-72px)]">

        {/* LEFT SIDE COPY BLOCK */}
        <div className="border-b lg:border-b-0 lg:border-r border-black p-8 md:p-16 flex flex-col justify-start bg-[#FFFFFF]">
          <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter text-black uppercase leading-none mb-12">
            START <br /> MAKING.
          </h1>
          <p className="text-lg font-bold text-black uppercase tracking-widest max-w-sm mb-8">
            NOT EXACTLY SURE WHAT YOU&apos;RE LOOKING TO MAKE? THAT&apos;S OKAY. WE HELP WITH THAT TOO.
          </p>
          <div className="w-full h-px bg-black mb-8" />
          <p className="font-mono text-sm tracking-widest text-black/60 uppercase">
              {"//"} HQ_NEW_YORK
          </p>
        </div>

        {/* RIGHT SIDE FORM GRID */}
        <div className="p-8 md:p-16 bg-black text-[#FFFFFF] flex flex-col justify-center">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full mx-auto">
              <input type="hidden" name="_subject" value="New Inquiry from Product Dept." />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <label htmlFor="name" className="text-xs font-black tracking-widest uppercase text-[#FFFFFF]/50">NAME</label>
                  <input type="text" id="name" name="name" className="border-2 border-[#FFFFFF] bg-black py-4 px-4 outline-none focus:bg-[#FFFFFF] focus:text-black transition-colors font-mono uppercase text-sm" placeholder="JANE DOE" required />
                </div>
                <div className="flex flex-col gap-3">
                  <label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-[#FFFFFF]/50">EMAIL</label>
                  <input type="email" id="email" name="email" className="border-2 border-[#FFFFFF] bg-black py-4 px-4 outline-none focus:bg-[#FFFFFF] focus:text-black transition-colors font-mono uppercase text-sm" placeholder="JANE@COMPANY.COM" required />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="company" className="text-xs font-black tracking-widest uppercase text-[#FFFFFF]/50">ORGANIZATION</label>
                <input type="text" id="company" name="company" className="border-2 border-[#FFFFFF] bg-black py-4 px-4 outline-none focus:bg-[#FFFFFF] focus:text-black transition-colors font-mono uppercase text-sm" placeholder="ORGANIZATION NAME" />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="description" className="text-xs font-black tracking-widest uppercase text-[#FFFFFF]/50">DESCRIBE YOUR PROJECT, CURIOSITIES, AND GOALS</label>
                <textarea id="description" name="description" rows={5} className="border-2 border-[#FFFFFF] bg-black py-4 px-4 outline-none focus:bg-[#FFFFFF] focus:text-black transition-colors resize-none font-mono uppercase text-sm" placeholder="TELL US EVERYTHING..." required></textarea>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFFFFF] text-black hover:bg-black hover:text-[#FFFFFF] hover:border-[#FFFFFF] border-2 border-transparent transition-colors py-6 font-black text-2xl tracking-tighter uppercase"
                >
                  {isSubmitting ? "TRANSMITTING..." : "BEGIN."}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto">
              <div className="uppercase border-2 border-[#FFFFFF] p-4 font-mono font-black mb-8 text-xs tracking-widest">
                [ STATUS: 200 OK ]
              </div>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">DATA RECEIVED.</h2>
              <p className="text-lg font-mono text-[#FFFFFF]/70 uppercase mb-12">
                THE DIRECTIVE HAS BEEN LOGGED. A DISPATCH WILL BE SENT TO YOUR COMM_LINK SHORTLY.
              </p>
              <Link
                href="/"
                className="bg-[#FFFFFF] text-black hover:bg-black hover:text-[#FFFFFF] border-2 border-transparent hover:border-[#FFFFFF] transition-colors py-6 px-12 font-black text-xl tracking-tighter uppercase inline-flex"
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
