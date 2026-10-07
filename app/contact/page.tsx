"use client";

import React, { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MessageCircle, Phone, Mail, Clock, MapPin, CheckCircle2, Send, Facebook } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      {/* Header */}
      <div className="bg-brand-offwhite border-y border-brand-lightgrey py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-wider text-olive mb-1.5 block">
            Customer Support & Inquiries
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-black tracking-tight mb-2">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-brand-grey max-w-2xl leading-relaxed">
            Have questions about bike sizing, custom covers, or tracking your Cash on Delivery parcel? Our team is available 6 days a week.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-brand-black">
              Get in Touch
            </h2>
            <p className="text-sm text-brand-grey leading-relaxed">
              We respond promptly during business hours. For immediate assistance with ongoing orders, WhatsApp is our quickest channel.
            </p>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/923288985916"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey hover:border-olive transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-brand-lightgrey flex items-center justify-center text-olive shrink-0 group-hover:bg-olive group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-grey block">
                    WhatsApp Chat
                  </span>
                  <span className="text-sm font-bold text-brand-black">
                    +92 328 8985916
                  </span>
                  <p className="text-xs text-brand-grey mt-0.5">
                    Fastest response for sizing advice & order status
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+923288985916"
                className="flex items-start gap-3.5 p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey hover:border-olive transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-brand-lightgrey flex items-center justify-center text-olive shrink-0 group-hover:bg-olive group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-grey block">
                    Phone Support
                  </span>
                  <span className="text-sm font-bold text-brand-black">
                    +92 328 8985916
                  </span>
                  <p className="text-xs text-brand-grey mt-0.5">
                    Click to call during business hours
                  </p>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19Kk5K8U7j/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey hover:border-olive transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-brand-lightgrey flex items-center justify-center text-olive shrink-0 group-hover:bg-olive group-hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-grey block">
                    Facebook Page
                  </span>
                  <span className="text-sm font-bold text-brand-black">
                    Super Safety Covers
                  </span>
                  <p className="text-xs text-brand-grey mt-0.5">
                    Follow us on Facebook for demos & reviews
                  </p>
                </div>
              </a>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey">
                <div className="w-10 h-10 rounded-lg bg-white border border-brand-lightgrey flex items-center justify-center text-olive shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-grey block">
                    Email
                  </span>
                  <span className="text-sm font-bold text-brand-black">
                    support@supersafetycover.com
                  </span>
                  <p className="text-xs text-brand-grey mt-0.5">
                    For bulk orders & corporate inquiries
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5 p-4 rounded-lg bg-brand-offwhite border border-brand-lightgrey">
                <div className="w-10 h-10 rounded-lg bg-white border border-brand-lightgrey flex items-center justify-center text-olive shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-grey block">
                    Business Hours
                  </span>
                  <span className="text-sm font-bold text-brand-black block">
                    Monday – Saturday: 9:00 AM – 8:00 PM
                  </span>
                  <span className="text-xs text-brand-grey">
                    Sunday: Closed (WhatsApp messages queued)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-brand-offwhite p-6 sm:p-10 rounded-2xl border border-brand-lightgrey">
              <h3 className="text-lg font-bold text-brand-black mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-brand-grey mb-6">
                Fill in the form below and we will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-white p-6 rounded-lg border border-brand-lightgrey text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-olive-soft text-olive mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-brand-black">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-brand-grey leading-relaxed">
                    Thank you, {formData.name}. Our customer care team has received your query and will reply via SMS or WhatsApp shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", message: "" });
                    }}
                    className="text-xs font-bold text-olive hover:underline pt-2 block mx-auto"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold text-brand-black mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold text-brand-black mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="03001234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-brand-black mb-1.5">
                        Email Address <span className="text-brand-grey font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-brand-black mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Tell us about the bike model or product query you need assistance with..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md border border-brand-lightgrey bg-white text-xs sm:text-sm text-brand-black outline-none focus:border-olive"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-md bg-olive text-white font-bold text-xs sm:text-sm hover:bg-olive-hover transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
