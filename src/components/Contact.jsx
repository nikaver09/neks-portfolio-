import { useState } from "react";
import { Mail, MapPin, Send, Terminal, Link, Globe } from "lucide-react";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";

const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const { error: dbError } = await supabase
        .from("messages")
        .insert([
          {
            name:    form.name,
            email:   form.email,
            subject: form.subject || `Message from ${form.name}`,
            message: form.message,
          },
        ]);

      if (dbError) {
        console.error("Supabase insert error:", dbError.message);
        setStatus("error");
        setTimeout(() => setStatus(""), 4000);
        return;
      }

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name:  form.name,
            from_email: form.email,
            subject:    form.subject || `Message from ${form.name}`,
            message:    form.message,
            to_email:   "nkavs777@gmail.com",
          },
          EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        // EmailJS not configured yet — message still saved to Supabase
        console.warn("EmailJS not configured:", emailError.message);
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <section id="contact" className="py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-accent uppercase tracking-[0.3em]">05 — Contact</span>
          <div className="flex-1 h-px bg-muted/30" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading font-bold text-4xl lg:text-5xl leading-tight mb-4">
                Let's build something <span className="text-accent">great</span> together.
              </h2>
              <p className="font-body text-ghost text-lg leading-relaxed">
                Whether you have a project in mind, a job opportunity, or just want to chat about tech — my inbox is always open.
              </p>
            </div>

            <div className="space-y-4">
              <a href="mailto:nkavs777@gmail.com" className="flex items-center gap-4 text-ghost hover:text-accent transition-colors group">
                <div className="w-10 h-10 bg-card border border-muted/40 rounded-xl flex items-center justify-center group-hover:border-accent/50 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="font-body">nkavs777@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-ghost">
                <div className="w-10 h-10 bg-card border border-muted/40 rounded-xl flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <span className="font-body">Philippines — Open to Remote</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { icon: Terminal, href: "https://github.com/nikaver09", label: "GitHub" },
                { icon: Link, href: "https://www.linkedin.com/in/nkewi-undefined-1096ba413/", label: "LinkedIn" },
                { icon: Globe, href: "https://www.facebook.com/neysoo900", label: "Facebook" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-12 h-12 bg-card border border-muted/40 rounded-xl flex items-center justify-center text-ghost hover:text-accent hover:border-accent/50 transition-all hover:scale-110">
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="bg-card border border-muted/30 rounded-2xl p-6 space-y-2 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs text-ghost uppercase tracking-widest">Response time</span>
              </div>
              <p className="font-heading font-semibold text-snow">Usually within 24 hours</p>
              <p className="font-body text-ghost text-sm">I'm currently open to freelance projects and full-time opportunities.</p>
            </div>
          </div>

          {!isFormOpen ? (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <button onClick={() => setIsFormOpen(true)}
                className="group flex items-center gap-3 bg-accent text-ink font-heading font-bold px-8 py-5 rounded-full hover:bg-white transition-all duration-300 uppercase tracking-wider text-base hover:scale-105 shadow-lg shadow-accent/20">
                Send a Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="bg-card border border-muted/30 rounded-3xl p-8 lg:p-10 animate-fade-in relative">
              <button onClick={() => setIsFormOpen(false)} className="absolute top-6 right-8 text-ghost hover:text-snow transition-colors text-sm uppercase tracking-widest font-mono">
                Close
              </button>
              {status === "sent" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 gap-4">
                  <div className="w-16 h-16 bg-accent/10 border border-accent/30 rounded-full flex items-center justify-center">
                    <Send size={24} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-snow">Message sent!</h3>
                  <p className="font-body text-ghost">I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                  <h3 className="font-heading font-bold text-xl text-snow mb-4">Send a message</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-ghost uppercase tracking-widest">Name</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-ink border border-muted/40 rounded-xl px-4 py-3 font-body text-snow placeholder:text-ghost/40 focus:outline-none focus:border-accent/60 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-ghost uppercase tracking-widest">Email</label>
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-ink border border-muted/40 rounded-xl px-4 py-3 font-body text-snow placeholder:text-ghost/40 focus:outline-none focus:border-accent/60 transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-ghost uppercase tracking-widest">Subject</label>
                  <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project collaboration, job opportunity..."
                    className="w-full bg-ink border border-muted/40 rounded-xl px-4 py-3 font-body text-snow placeholder:text-ghost/40 focus:outline-none focus:border-accent/60 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-ghost uppercase tracking-widest">Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-ink border border-muted/40 rounded-xl px-4 py-3 font-body text-snow placeholder:text-ghost/40 focus:outline-none focus:border-accent/60 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-accent text-ink font-heading font-bold py-4 rounded-xl hover:bg-white transition-all duration-200 uppercase tracking-wider text-sm disabled:opacity-60">
                  {status === "sending" ? (
                    <><div className="w-4 h-4 border-2 border-ink/40 border-t-ink rounded-full animate-spin" />Sending...</>
                  ) : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
              </form>
            )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
