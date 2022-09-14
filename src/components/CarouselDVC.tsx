//@ts-nocheck

import { FC } from "react";
import { observer } from "mobx-react-lite";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

enum MediaType {
  image = "img",
  video = "video"
}
export interface CarouselDVCProps {
  onChange?: () => {},
  onClickItem?: () => {},
  onClickThumb?: () => {},
  data_media_list_json?: string
}

export const CarouselDVC: FC<CarouselDVCProps> = observer(({
  data_media_list_json,
  onChange = () => {},
  onClickItem = () => {},
  onClickThumb = () => {}
}) => {

  var dataMediaList: any[] | undefined = undefined;

  if (typeof data_media_list_json == 'string') {
    dataMediaList = JSON.parse(data_media_list_json);
  }

  return (
    <Carousel 
      showArrows={true}
      showIndicators={true}
      dynamicHeight={false}
      showThumbs={false}
      useKeyboardArrows={true}
      swipeable={true}
      emulateTouch={true}
      >
        {
          dataMediaList ? (
            dataMediaList.map((media) => { return (
              <div>
                {media.type === MediaType.image && 
                  <img className="diapo-img" src={media.url} alt={media.name} />
                }

                {media.type === MediaType.video && 
                  <video width="100%" className="diapo-img" controls src={media.url} type={media.mime_type} />
                }
              </div>);
            })
          ) : (
            <div>
              <p class="diapo-img">Aucun média</p>
            </div>
          )
        }
    </Carousel>
  );
});

