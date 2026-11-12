import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";
import { Send, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";

export default function JamContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://formspree.io/f/mdaejvek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Message delivery failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to send message. Please connect on LinkedIn."
      );
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 border-b border-white/10 select-none">
      {/* Section Header with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-10 border-b border-white/10"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.04em] text-white">
          CONTACT
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-10">
        {/* Left: Info & Links (col-5) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              Get in touch
            </h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Open to discussions regarding spacecraft engineering, orbital mechanics, propulsion systems, and aerospace research collaborations.
            </p>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3 font-mono text-xs pt-2">
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-full liquid-glass-pill text-zinc-300 hover:text-white transition-all group cursor-pointer hover:border-white/40"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
            </a>

            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-full liquid-glass-pill text-zinc-300 hover:text-white transition-all group cursor-pointer hover:border-white/40"
            >
              <span>GitHub</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
            </a>
          </div>

          <div className="border-t border-white/10 pt-4 font-mono text-xs text-zinc-400 space-y-1">
            <div>Based in Munich, Germany</div>
          </div>
        </motion.div>

        {/* Right: Contact Form (col-7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-10 rounded-[32px] liquid-glass-card relative hover:border-white/20 transition-colors">
            <div className="glass-reflection" />
            <div className="relative z-10">
              {status === "success" ? (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold uppercase tracking-tight text-white">
                    Message Sent
                  </h4>
                  <p className="text-sm text-zinc-400 font-light max-w-md">
                    Thank you for reaching out. Gregorio will review your message and reply promptly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-bold transition-all hover:bg-zinc-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="w-full px-4 py-3 text-sm bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@domain.com"
                        className="w-full px-4 py-3 text-sm bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project inquiry or discussion topic"
                      className="w-full px-4 py-3 text-sm bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Your message..."
                      className="w-full px-4 py-3 text-sm bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono rounded-xl flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-6 rounded-full bg-white text-black hover:bg-zinc-200 font-bold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    <Send size={14} />
                    <span>{status === "submitting" ? "Transmitting..." : "Send Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}