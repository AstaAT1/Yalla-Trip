import Masonry from "./Masonry.jsx";
import images from "../constants/Images.jsx";

export default function AboutMasonryGallery() {
  const items = [
    { id: "m1", img: images.aboutmemo2, url: "", height: 420 },
    { id: "m2", img: images.aboutmemo1, url: "", height: 360 },
    { id: "m3", img: images.aboutmemo3, url: "", height: 460 },
    { id: "m4", img: images.aboutmemo4, url: "", height: 380 },
    { id: "t4", img: images.trajet4, url: "", height: 520 },
    { id: "t14", img: images.trajet14, url: "", height: 420 },
    { id: "atlas", img: images.homeatlas, url: "", height: 440 },
    { id: "login", img: images.login, url: "", height: 400 },
    { id: "t15", img: images.trajet15, url: "", height: 510 },
    { id: "t16", img: images.trajet16, url: "", height: 370 },
    { id: "t17", img: images.trajet17, url: "", height: 460 },
    { id: "t18", img: images.trajet18, url: "", height: 420 },
    { id: "t19", img: images.trajet19, url: "", height: 490 },
  ];

  return (
    <div className="w-full">
      <Masonry
        items={items}
        animateFrom="bottom"
        scaleOnHover={true}
        hoverScale={0.96}
        blurToFocus={true}
        colorShiftOnHover={false}
        premium={true}
      />
    </div>
  );
}