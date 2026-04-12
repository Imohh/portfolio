import { motion, AnimatePresence } from "framer-motion";

function Pre({ load }) {
  return (
    <AnimatePresence>
      {load && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            backgroundColor: "#03030a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(190,255,85,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Logo letters */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "48px" }}>
            {["I", "M", "O", "H"].map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  fontFamily: '"Syne", sans-serif',
                  fontWeight: 900,
                  fontSize: "clamp(48px, 8vw, 80px)",
                  letterSpacing: "0.12em",
                  color: "#f2f0ff",
                }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.55, ease: "backOut" }}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#BEFF55",
                alignSelf: "flex-end",
                marginBottom: "14px",
                display: "inline-block",
              }}
            />
          </div>

          {/* Loading bar */}
          <div
            style={{
              width: "160px",
              height: "1px",
              backgroundColor: "rgba(242,240,255,0.08)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #8B5CF6, #BEFF55)",
                borderRadius: "1px",
              }}
            />
          </div>

          {/* Status text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              marginTop: "20px",
              fontFamily: '"Inter", sans-serif',
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              color: "rgba(242,240,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Pre;
