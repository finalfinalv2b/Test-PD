"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      // Use FormSubmit AJAX endpoint to bypass their ad/logo pages entirely
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
      // Fallback
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background pt-20">
      <section className="py-24 px-6 max-w-2xl mx-auto w-full">
        {!isSuccess ? (
          <>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-charcoal mb-6">Contact.</h1>
            <p className="text-xl text-mid-gray leading-relaxed mb-16">
              Ready to turn a compelling idea into an exceptional product? Start the conversation here.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <input type="hidden" name="_subject" value="New Inquiry from Product Dept. Website" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold tracking-wide text-charcoal uppercase">Name</label>
                  <input type="text" id="name" name="name" className="border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-charcoal transition-colors" placeholder="Jane Doe" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold tracking-wide text-charcoal uppercase">Email</label>
                  <input type="email" id="email" name="email" className="border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-charcoal transition-colors" placeholder="jane@company.com" required />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-semibold tracking-wide text-charcoal uppercase">Company</label>
                <input type="text" id="company" name="company" className="border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-charcoal transition-colors" placeholder="Company Name" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-semibold tracking-wide text-charcoal uppercase">Project Description</label>
                <textarea id="description" name="description" rows={4} className="border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-charcoal transition-colors resize-none" placeholder="Tell us about what you're building..." required></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="timeline" className="text-sm font-semibold tracking-wide text-charcoal uppercase">Target Timeline</label>
                  <select id="timeline" name="timeline" className="border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-charcoal transition-colors appearance-none cursor-pointer" required>
                    <option value="" disabled selected>Select a timeframe...</option>
                    <option value="ASAP">ASAP (Q1)</option>
                    <option value="3-6 Months">3-6 Months</option>
                    <option value="6-12 Months">6-12 Months</option>
                    <option value="1+ Year">1+ Year (Exploratory)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-sm font-semibold tracking-wide text-charcoal uppercase">Budget Range <span className="text-mid-gray/50 normal-case tracking-normal ml-1">(Optional)</span></label>
                  <select id="budget" name="budget" className="border-b border-charcoal/20 bg-transparent py-2 outline-none focus:border-charcoal transition-colors appearance-none cursor-pointer">
                    <option value="" disabled selected>Select a range...</option>
                    <option value="<$50k">&lt; $50k</option>
                    <option value="$50k - $250k">$50k - $250k</option>
                    <option value="$250k - $1M">$250k - $1M</option>
                    <option value="$1M+">$1M+</option>
                  </select>
                </div>
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center bg-charcoal text-white hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-12 py-5 rounded-full font-medium text-base tracking-wide w-full md:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-16 h-16 bg-charcoal/5 rounded-full flex items-center justify-center mb-8">
              <span className="text-charcoal text-2xl">✓</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-charcoal mb-6">Inquiry Received.</h2>
            <p className="text-xl text-mid-gray leading-relaxed mb-12 max-w-md">
              Thank you for reaching out. A partner from Product Dept. will be in touch shortly to review your brief.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center justify-center bg-charcoal text-white hover:bg-black transition-colors px-10 py-4 rounded-full font-medium text-base tracking-wide gap-3"
            >
              Back to Homepage <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </section>
      
      {/* Push Footer to bottom of screen naturally */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
