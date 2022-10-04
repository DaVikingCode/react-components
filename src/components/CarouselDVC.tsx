//@ts-nocheck

import { FC, useState, useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

enum MediaType {
  image = "img",
  video = "video"
}
export interface CarouselDVCProps {
  showArrows?: boolean,
  showIndicators?: boolean,
  dynamicHeight?: boolean,
  showThumbs?: boolean,
  useKeyboardArrows?: boolean,
  swipeable?: boolean,
  emulateTouch?: boolean,
  autoPlay?: boolean,
  interval?: number,
  infiniteLoop?: true,
  onChange?: () => {},
  onClickItem?: () => {},
  onClickThumb?: () => {},
  statusFormatter?: () => {},
  data_media_list_json?: string
}

export const CarouselDVC: FC<CarouselDVCProps> = observer(({
  data_media_list_json,
  showArrows = true,
  showIndicators = true,
  dynamicHeight = false,
  showThumbs = true,
  useKeyboardArrows = true,
  swipeable = true,
  emulateTouch = true,
  autoPlay,
  interval = 3000,
  infiniteLoop = true,
  onChange = () => {},
  onClickItem = () => {},
  onClickThumb = () => {},
  statusFormatter = () => {}
}) => {

  // Init variables
  var carouselRef = React.createRef();
  var videoListRefs = useRef([]);
  var dataMediaList: any[] | undefined = undefined;
  const [isAutoPlay, setIsAutoPlay] = useState(true); 
  const [isPlayingVideo, setIsPlayingVideo] = useState(false); 

  // Parse media json list
  if (typeof data_media_list_json == 'string') {
    dataMediaList = JSON.parse(data_media_list_json);
  }

  const handleVideoEnded = (videoElement) => {
    // More than one element
    if (carouselRef.current != null && carouselRef.current.itemsRef.length > 1 && isPlayingVideo) {
      setIsPlayingVideo(false);

      // Reset video after ended
      $(videoElement.target).get(0).pause();
      $(videoElement.target).get(0).currentTime = 0;

      setIsAutoPlay(true);

      // Next slide
      $("#arrow-next").trigger("click");
  
    } else if (carouselRef.current != null && carouselRef.current.itemsRef.length == 1 && isPlayingVideo) {
      // Exactly one element --> then repeat if it's a video

      // Reset video after ended
      $(videoElement.target).get(0).pause();
      $(videoElement.target).get(0).currentTime = 0;

      // Replay
      $(videoElement.target).get(0).play();
    }
  }

  const handleLoadedData = (videoElement) => {
    if (carouselRef.current != null && videoElement.target.id === "video-0") {
      const videoList = $(".selected").find("video");

      for (var video of videoList) {
        $(video).get(0).play();
      }
      setIsPlayingVideo(true);
    }
  }

  useEffect(() => {
    if (carouselRef.current != null) {
      const videoList = $(".selected").find("video");

      for (var video of videoList) {
        if (video.id === "video-0")
          $(video).get(0).play();
      }

      setIsPlayingVideo(true);
    }
  }, carouselRef);

  const defaultOnChange = (index: number, item: React.ReactNode) => {
    // Check if sibling element are video ?

    var siblingElements = [];

    // Element left <-- current --> right
    if (index > 0 && index < (carouselRef.current as Carousel).itemsRef.length - 1) {
      siblingElements = [(carouselRef.current as Carousel).itemsRef[index - 1], (carouselRef.current as Carousel).itemsRef[index + 1]];
    } else if (index === 0) {
      // First element last <-- current --> right
      siblingElements = [
        (carouselRef.current as Carousel).itemsRef[index + 1],
        (carouselRef.current as Carousel).itemsRef[(carouselRef.current as Carousel).itemsRef.length - 1]
      ];
    } else if (index === (carouselRef.current as Carousel).itemsRef.length - 1) {
      // Last element left <-- current --> first
      siblingElements = [
        (carouselRef.current as Carousel).itemsRef[0],
        (carouselRef.current as Carousel).itemsRef[index - 1]
      ];
    }

    siblingElements.forEach((siblingElement) => {
      if ($(siblingElement).find("video").length > 0) {
        $(siblingElement).find("video").get(0).pause();
        $(siblingElement).find("video").get(0).currentTime = 0;
      }
    });


    // Check if is video selected
    const itemVideo = React.Children.map(item.props.children, (element) => {
      if (element) {
        return element.type === MediaType.video ? element : undefined;
      }
    });
  
    // Disable autoplay during video
    if (itemVideo.length > 0) {
      setIsAutoPlay(false);
      const currentVideo = videoListRefs.current.filter(video => video.id === itemVideo[0].props.id);

      // TODO : If first element is a video ==> 
      // Play the other video (because first element of a carousel has two videos and catch the event of only one)
      if (itemVideo[0].props.id === "video-0") {
        const videoList = $(".selected").find("video");

        for (var video of videoList) {
          $(video).get(0).play();
        };
      } else {
        // Get video item and then play
        $(currentVideo).get(0).play();
      }

      setIsPlayingVideo(true);

    } else {
      setIsAutoPlay(true);
    }


  }
  return (
    <Carousel
      ref={carouselRef}
      showArrows={showArrows}
      showIndicators={showIndicators}
      dynamicHeight={dynamicHeight}
      showThumbs={showThumbs}
      useKeyboardArrows={useKeyboardArrows}
      swipeable={swipeable}
      emulateTouch={emulateTouch}
      autoPlay={autoPlay ? autoPlay : isAutoPlay}
      interval={interval}
      infiniteLoop={infiniteLoop}
      onChange={onChange.length > 0 ? onChange : defaultOnChange}
      statusFormatter={statusFormatter.length > 0 ? statusFormatter : (current, total) => `${current} / ${total}`}
      renderArrowPrev={(onClickHandler: () => void, hasPrev: boolean, label: string) => 
        <button type="button" id="arrow-prev" aria-label={label} className={`control-arrow control-prev`} onClick={onClickHandler} />
      }
      renderArrowNext={(onClickHandler: () => void, hasNext: boolean, label: string) =>
        <button type="button" id="arrow-next" aria-label={label} className={`control-arrow control-next`} onClick={onClickHandler} />
      }
      >
        {
          dataMediaList ? (
            dataMediaList.map((media, idx) => { return (
              <div>
                {media.type === MediaType.image && 
                  <img 
                    className="diapo-container" 
                    src={media.url} 
                    alt={media.name} />
                }

                {media.type === MediaType.video && 
                  <video 
                    id={`video-${idx}`} 
                    data-index={idx} 
                    ref={el => videoListRefs.current[idx] = el}
                    onEnded={handleVideoEnded}
                    width="100%" 
                    className="diapo-container" 
                    src={media.url} 
                    type={media.mime_type} 
                    preload="auto"
                    muted="muted"
                    onLoadeddata={handleLoadedData}
                    playsInline
                  />
                }
              </div>);
            })
          ) : (
            <div>
              <p class="diapo-container">Aucun média</p>
            </div>
          )
        }
    </Carousel>
  );
});

