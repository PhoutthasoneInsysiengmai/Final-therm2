import Image from "next/image";

const images = [
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image1.png",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  
  
];

const Carousel: React.FC = () => {
  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        {images.map((img, index) => (
          <Image key={index} src={img} alt={`Slide ${index}`} width={500} height={300} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
