import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";
import ScrollAnimation from "./ui/scroll-animation";
import TextScrollAnimation from "./ui/text-scroll-animation";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");

    try {
      const { error } = await supabase.from("messages").insert([{
        name: form.name,
        email: form.email,
        subject: form.subject || `Message from ${form.name}`,
        message: form.message,
      }]);

      if (error) throw error;

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || `Message from ${form.name}`,
          message: form.message,
          to_email: "nkavs777@gmail.com",
        }, EMAILJS_PUBLIC_KEY);
      } catch (emailError) {
        console.warn("Email notification was not sent:", emailError.message);
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-shell">
        <ScrollAnimation direction="down" viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}>
          <div className="section-marker"><span>05</span><span>CONTACT</span></div>
        </ScrollAnimation>

        <div className="contact-layout">
          <div className="contact-copy">
            <TextScrollAnimation className="section-display"
              lines={[{ text: "HAVE A GOOD" }, { text: "IDEA?", accent: true }]} />
            <p>Whether it&apos;s a product to ship, a role to discuss, or a problem worth solving, I&apos;d love to hear it.</p>
            <div className="contact-details">
              <a href="mailto:nkavs777@gmail.com"><Mail size={17} /> NKAVS777@GMAIL.COM <ArrowUpRight size={14} /></a>
              <span><MapPin size={17} /> PHILIPPINES / OPEN TO REMOTE</span>
            </div>
          </div>

          <ScrollAnimation
            direction="right"
            delay={0.15}
            viewport={{ amount: 0.2, margin: "0px 0px -50px 0px" }}
            className="contact-panel"
          >
            <AnimatePresence mode="wait">
              {!isFormOpen ? (
                <motion.div
                  key="closed"
                  className="contact-panel__closed"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>THE INBOX IS OPEN</p>
                  <button type="button" className="button button--light" onClick={() => setIsFormOpen(true)}>
                    START A CONVERSATION <Send size={16} />
                  </button>
                </motion.div>
              ) : status === "sent" ? (
                <motion.div
                  key="sent"
                  className="contact-panel__message"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-acid" /> MESSAGE RECEIVED</span>
                  <h3>THANKS FOR<br />REACHING OUT.</h3>
                  <p>I&apos;ll review your message and reply as soon as possible.</p>
                  <button type="button" className="text-link" onClick={() => { setStatus(""); setIsFormOpen(false); }}>
                    CLOSE ×
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="contact-form__header">
                    <span>NEW MESSAGE</span>
                    <button type="button" onClick={() => setIsFormOpen(false)} aria-label="Close message form">
                      CLOSE ×
                    </button>
                  </div>
                  <label>
                    YOUR NAME
                    <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Jane Doe" />
                  </label>
                  <label>
                    YOUR EMAIL
                    <input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="jane@example.com" />
                  </label>
                  <label>
                    SUBJECT
                    <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="A project, role, or hello" />
                  </label>
                  <label>
                    MESSAGE
                    <textarea required rows="4" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me a little about it." />
                  </label>
                  {status === "error" && <p className="contact-form__error">Something went wrong. Please email me directly instead.</p>}
                  <button className="button button--light" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "SENDING..." : <>SEND MESSAGE <ArrowUpRight size={17} /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
