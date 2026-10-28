import { motion } from "framer-motion";

export default function PageHero({ eyebrow, title, text, image, imageAlt = "", testid, children }) {
  return (
    <section data-testid={testid} className="hero-gradient relative overflow-hidden pt-[72px] text-white md:pt-[104px]">
      <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-12 md:pb-20 lg:grid-cols-12">
        <div className={image ? "lg:col-span-7" : "lg:col-span-9"}>
          <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="font-tech flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-blue-100">
            <span className="h-px w-8 bg-blue-100/70" /> {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {text && (
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="mt-5 max-w-2xl text-base text-blue-50/90 md:text-lg">
              {text}
            </motion.p>
          )}
          {children}
        </div>
        {image && (
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:col-span-5 lg:block">
            <img src={image} alt={imageAlt} className="hex-clip mx-auto aspect-[1.08] w-full max-w-sm object-cover" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
