import { motion } from "motion/react";
import CircularGallery from "./CircularGallery.jsx";
import images from "../constants/Images.jsx";

export default function AboutMemoriesGallery() {
  const items = [
    { image: images.aboutmemo2, text: "" },
    { image: images.aboutmemo1, text: "" },
    { image: images.aboutmemo3, text: "" },
    { image: images.aboutmemo4, text: "" },
    { image: images.trajet4, text: "" },
    { image: images.trajet14, text: "" },
    { image: images.trajet17, text: "" },
    { image: images.trajet19, text: "" },
    { image: images.trajet18, text: "" },
    { image: images.trajet19, text: "" },
    { image: images.homeatlas, text: "" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full h-[420px] overflow-hidden rounded-3xl"
    >
      <CircularGallery
        items={items}
        bend={3}
        textColor="var(--color-font-blue)"
        borderRadius={0.08}
        scrollSpeed={2}
        scrollEase={0.06}
      />
    </motion.div>
  );
}