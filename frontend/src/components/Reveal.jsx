import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className, y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.65, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default Reveal;
