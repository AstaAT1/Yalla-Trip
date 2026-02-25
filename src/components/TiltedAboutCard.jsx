import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { TiWorld } from "react-icons/ti";

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltedAboutCard({
  imageSrc,
  alt = "Travel community",
  height = 380, //rah px
  rotateAmplitude = 14,
  scaleOnHover = 1.03,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  const [lastY, setLastY] = useState(0);
  const tooltipOpacity = useSpring(0);
  const rotateBadge = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });

  function handleMouseMove(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rx = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const ry = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rx);
    rotateY.set(ry);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateBadge.set(-velocityY * 0.35);
    setLastY(offsetY)
  }

  function handleEnter() {
    scale.set(scaleOnHover);
    tooltipOpacity.set(1);
  }

  function handleLeave() {
    tooltipOpacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateBadge.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full [perspective:900px]"
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* card wrapper  */}
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
      >
        {/* image */}
        <div className="overflow-hidden rounded-3xl shadow-lg h-full w-full">
          <img src={imageSrc} alt={alt} className="h-full w-full object-cover" />
        </div>

        {/* badge  */}
        <motion.div
          className="absolute -bottom-5 right-6 z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl"
          style={{
            rotate: rotateBadge,
            transform: "translateZ(40px)", 
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span className="text-blue-600 text-2xl">
              <TiWorld />
            </span>
          </div>

          <div>
            <div className="text-lg font-extrabold text-[var(--color-secondary-blue)] text-black">
              50+
            </div>
            <div className="text-xs font-semibold text-[var(--color-font-black)] text-black">
              COUNTRIES EXPLORED
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute left-3 top-3 hidden sm:block rounded-md  bg-white px-3 py-1 text-[10px] font-semibold text-[#2d2d2d] shadow"
          style={{ opacity: tooltipOpacity, x, y }}
        >
         Wouldn't you like to try it too?
        </motion.div>
      </motion.div>
    </figure>
  );
}
