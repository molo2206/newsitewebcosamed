import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const LightboxViewer = ({
  isOpen,
  onClose,
  images,
  currentIndex = 0,
  setCurrentIndex,
}: any) => {
  if (!isOpen) return null;
  const imgs: any[] = images;
  return (
    <Lightbox
      mainSrc={imgs[currentIndex]?.src}
      nextSrc={imgs[(currentIndex + 1) % imgs.length]?.src}
      prevSrc={imgs[(currentIndex + imgs.length - 1) % imgs.length]?.src}
      onCloseRequest={onClose}
      onMovePrevRequest={() =>
        setCurrentIndex((currentIndex + imgs.length - 1) % imgs.length)
      }
      onMoveNextRequest={() =>
        setCurrentIndex((currentIndex + 1) % imgs.length)
      }
      imageCaption={imgs[currentIndex]?.caption}
    />
  );
};

export default LightboxViewer;
