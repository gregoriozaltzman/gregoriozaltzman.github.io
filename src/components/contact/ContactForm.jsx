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
        throw new Error(data.error || "Message failed to send. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to send message. Please contact directly via email."
      );
    }
  };

  return (
    <section id="contact" className="space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block">
          06 / Contact
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
          Contact
        </h2>
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
                Message Sent
              </h3>
              <p className="text-sm text-zinc-400 font-light max-w-md">
                Thank you for reaching out. Gregorio will get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs text-sky-400 hover:underline pt-2 font-medium"
              >
                Send another message →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider block">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider block">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium uppercase tracking-wider block">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded p-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all resize-y"
                />
              </div>

              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-xs text-red-400">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-end pt-2">
                <ChamferButton
                  type="submit"
                  disabled={status === "submitting"}
                  variant="primary"
                  icon={status === "submitting" ? Loader2 : Send}
                  className={status === "submitting" ? "cursor-wait" : ""}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </ChamferButton>
              </div>
            </form>
          )}
        </DynamicGlow>
      </motion.div>
    </section>
  );
}
