import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import DynamicGlow from "../ui/DynamicGlow";
import ChamferButton from "../ui/ChamferButton";

export default function ContactForm() {
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
        throw new Error(data.error || "Transmission failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to transmit message. Please email directly."
      );
    }
  };

  return (
    <section id="contact" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-block font-mono text-[11px] text-sky-400 tracking-widest uppercase">
          // DATA BLOCK 06 — COMM LINK
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Establish Contact
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
          Open to aerospace engineering opportunities, research collaborations, or technical discussions in aircraft design and space systems.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <DynamicGlow className="chamfer-box p-8 sm:p-10 border border-borderCustom hover:border-white/30">
          {status === "success" ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Transmission Received
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md">
                Your message has been dispatched to Gregorio Zaltzman. You can expect a response within 24-48 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="font-mono text-xs text-sky-400 hover:underline pt-2"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
                    Identifier // Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Dr. John von Kármán"
                    className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-xs sm:text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-400/60 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
                    Frequency // Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="engineer@aerospace.org"
                    className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-xs sm:text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-400/60 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
                  Telemetry Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry regarding aerodynamics position / research"
                  className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-xs sm:text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-400/60 focus:bg-white/[0.06] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider block">
                  Transmission Body // Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your project scope, engineering challenge, or opportunity..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-xs sm:text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-sky-400/60 focus:bg-white/[0.06] transition-all resize-y"
                />
              </div>

              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-xs font-mono text-red-400">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <div className="font-mono text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>DIRECT ENCRYPTED RELAY</span>
                </div>

                <ChamferButton
                  type="submit"
                  disabled={status === "submitting"}
                  variant="primary"
                  icon={status === "submitting" ? Loader2 : Send}
                  className={status === "submitting" ? "cursor-wait" : ""}
                >
                  {status === "submitting" ? "Transmitting..." : "Send Transmission"}
                </ChamferButton>
              </div>
            </form>
          )}
        </DynamicGlow>
      </motion.div>
    </section>
  );
}
