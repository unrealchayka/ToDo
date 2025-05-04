export const ANIMATION = {
  slide: {
    initial: { height: 0 },
    animate: { height: "100%" },
    exit: { width: 0 },
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  fade: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 }
  }
};