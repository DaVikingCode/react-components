import React from "react";
import { LinearProgress } from "@material-ui/core";
import FailureIcon from "./failure_icon.svg";
import ValidIcon from "./valid_icon.svg";

export const DropZonePreviewTemplate = (
  <div className="dz-preview dz-file-preview">
    <div className="dz-image"><img data-dz-thumbnail /></div>
    <div className="dz-details" style={{ padding: '1em 1em 1em 1em' }}>
      <div className="dz-size" style={{ marginBottom: 2.5 + 'em' }} data-dz-size></div>
      <div className="dz-filename" style={{ paddingTop: 1 + 'em' }}><span data-dz-name></span></div>
    </div>
    <div className="dz-progress">
      <span className="dz-upload"></span>
      <span className="custom-dz-upload"><LinearProgress style={{ height: '0.3em' }} /></span>
    </div>
    <div className="dz-success-mark" style={{ top: 5 + '%', left: 105 + '%' }}>
      <svg style={{ width: 30 + 'px' }} width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path
            d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"
            stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#00a10d"></path>
        </g>
      </svg>
    </div>
    <div className="dz-error-mark" style={{ top: 5 + '%', left: 105 + '%' }}>
      <svg style={{ width: 30 + 'px' }} width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g stroke="#747474" stroke-opacity="0.198794158" fill="#b90000" fill-opacity="0.816519475">
            <path
              d="M 32.7 29 L 38.3 23.3 C 39.9 21.8 39.9 19.2 38.3 17.7 C 36.8 16.1 34.2 16.1 32.7 17.7 L 27 23.3 L 21.3 17.7 C 19.8 16.1 17.2 16.1 15.7 17.7 C 14.1 19.2 14.1 21.8 15.7 23.3 L 21.3 29 L 15.7 34.7 C 14.1 36.2 14.1 38.8 15.7 40.3 C 17.2 41.9 19.8 41.9 21.3 40.3 L 27 34.7 L 32.7 40.3 C 34.2 41.9 36.8 41.9 38.3 40.3 C 39.9 38.8 39.9 36.2 38.3 34.7 L 32.7 29 Z M 27 53 C 41.4 53 53 41.4 53 27 C 53 12.6 41.4 1 27 1 C 12.6 1 1 12.6 1 27 C 1 41.4 12.6 53 27 53 Z">
            </path>
          </g>
        </g>
      </svg>
    </div>
  </div>
);