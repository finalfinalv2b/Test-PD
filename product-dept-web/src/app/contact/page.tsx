"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const WORDS = [
  "WORKING",
  "IDEATING",
  "CREATING",
  "THINKING",
  "DREAMING",
  "BUILDING",
  "SOURCING",
  "DRAWING",
  "INVENTING",
  "SHIPPING",
  "MAKING",
  "TODAY"
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wordIndex, setWordIndex] = useState(WORDS.length - 1); // Start with MAKING for SSR
  const [nyTime, setNyTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        });
        setNyTime(formatted);
      } catch (e) {
        console.warn("New York time formatting failed:", e);
        try {
          setNyTime(new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
          }));
        } catch (err) {
          setNyTime(new Date().toLocaleTimeString());
        }
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset to index 0 on mount and start flickering
    setWordIndex(0);
    
    let current = 0;
    let timeoutId: NodeJS.Timeout;

    const runFlicker = () => {
      if (current >= WORDS.length - 1) {
        setWordIndex(WORDS.length - 1);
        return;
      }
      
      current++;
      setWordIndex(current);
      
      timeoutId = setTimeout(runFlicker, 500);
    };

    timeoutId = setTimeout(runFlicker, 500);

    return () => clearTimeout(timeoutId);
  }, []);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("https://formsubmit.co/ajax/info@productdept.com", {
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
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500 pt-[72px]">
      <section className="flex-grow w-full border-b border-foreground transition-colors duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[calc(100vh-72px)]">

          {/* LEFT SIDE COPY BLOCK */}
          <div className="border-b lg:border-b-0 lg:border-r border-foreground transition-colors duration-500 p-8 md:p-16 flex flex-col justify-start bg-background">
            <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter text-foreground uppercase leading-none mb-12 transition-colors duration-500">
              START <br /> {WORDS[wordIndex]}.
            </h1>
            <div className="w-full h-px bg-foreground transition-colors duration-500 mb-8 mt-auto" />
            <p className="font-mono text-sm tracking-widest text-foreground/60 transition-colors duration-500 uppercase">
              {`HQ: NEW YORK  NYT: ${nyTime || "--:--:-- --"}`}
            </p>
          </div>

          {/* RIGHT SIDE FORM GRID */}
          <div className="p-8 md:p-16 bg-foreground text-background transition-colors duration-500 flex flex-col justify-center">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full mx-auto">
                <input type="hidden" name="_subject" value="New Inquiry from Product Dept." />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-xs font-black tracking-widest uppercase text-background/50 transition-colors duration-500">NAME</label>
                    <input type="text" id="name" name="name" className="border-2 border-background bg-foreground text-background py-4 px-4 outline-none focus:bg-background focus:text-foreground transition-colors font-mono text-sm" placeholder="Jane Doe" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-background/50 transition-colors duration-500">EMAIL</label>
                    <input type="email" id="email" name="email" className="border-2 border-background bg-foreground text-background py-4 px-4 outline-none focus:bg-background focus:text-foreground transition-colors font-mono text-sm" placeholder="jane@company.com" required />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="company" className="text-xs font-black tracking-widest uppercase text-background/50 transition-colors duration-500">ORGANIZATION</label>
                  <input type="text" id="company" name="company" className="border-2 border-background bg-foreground text-background py-4 px-4 outline-none focus:bg-background focus:text-foreground transition-colors font-mono text-sm" placeholder="Organization name" />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="description" className="text-xs font-black tracking-widest uppercase text-background/50 transition-colors duration-500">MESSAGE</label>
                  <textarea id="description" name="description" rows={5} className="border-2 border-background bg-foreground text-background py-4 px-4 outline-none focus:bg-background focus:text-foreground transition-colors resize-none font-mono text-sm" placeholder="How can we help?" required></textarea>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-background text-foreground hover:bg-foreground hover:text-background hover:border-background border-2 border-transparent transition-colors py-6 font-black text-2xl tracking-tighter uppercase"
                  >
                    {isSubmitting ? "TRANSMITTING..." : "BEGIN."}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl font-mono text-background/90 leading-relaxed">
                  Someone from the Product Dept. will get back to you shortly. Thank you.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
