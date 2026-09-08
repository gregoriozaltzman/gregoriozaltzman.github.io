import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-40 pointer-events-auto"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top of page"
            className="flex items-center justify-center w-11 h-11 chamfer-sm bg-[#080b12]/90 hover:bg-[#111726]/95 border border-white/20 hover:border-white/50 text-zinc-400 hover:text-white shadow-xl shadow-black/60 backdrop-blur-xl group cursor-pointer transition-all duration-200"
          >
            <ArrowUp
              size={18}
              strokeWidth={2}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
