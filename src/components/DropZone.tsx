import Dropzone, { DropzoneDictFileSizeUnits } from "dropzone";
import React, { FC, useRef, useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import ReactDOM from "react-dom";


export interface DropZoneProps {
  // token
  token?: string,
  // url api
  url?: string,
  // redirect_url
  redirect_url?: string,
  // dropzone index
  dropzone_index?: number,
  // accepted_extensions
  accepted_files?: string,
  // accepted_extensions
  accepted_extensions?: string,
  // maxFiles
  max_files?: number,
  // maxFilesize
  max_file_size?: number,
  // label
  label? : string,
  // addRemoveLinks
  addRemoveLinks? : boolean,
  // autoProcessQueue
  autoProcessQueue? : boolean,
  // callback api 
  uploadSuccessCallback?: (files: FileList) => boolean,
  uploadErrorCallback?: (files: FileList, error: string) => boolean,
}

const initialDropzoneParameter = {
  // method : 'POST',
  // withCredentials: true,
  timeout : 600000, // in ms
  parallelUploads: 1,
  // uploadMultiple: false,
  // chunking: false,
  // forceChunking: false,
  // chunkSize: 4096000, // Bytes
  // parallelChunkUploads: false,
  // retryChunks: false,
  // retryChunksLimit: 3,
  // paramName: "file", // The name that will be used to transfer the file
  // createImageThumbnails: true,
  // maxThumbnailFilesize: 10,
  // thumbnailWidth: 120,
  // thumbnailheight: 120,
  // thumbnailMethod: 'crop',
  // resizeWidth: null,
  // resizeHeight: null,
  // resizeMimeType: null,
  // resizeQuality: 0.8,
  // resizeMethod: 'contain',
  // filesizeBase: 1000,
  // clickable: true,
  // ignoreHiddenFiles: true,
  // autoProcessQueue: true,
  // autoQueue: true,
  // addRemoveLinks: true,
  // previewsContainer: null,
  // hiddenInputContainer: 'body',
  // capture: null,
  // renameFile: null,
  // forceFallback: true,
  // dictDefaultMessage: 'Default Message',
  // dictFallbackMessage: 'Fallback msg',
  // dictFallbackText: 'Fallback txt',
  dictFileTooBig: 'Fichier trop grand',
  dictInvalidFileType: 'Type de fichier invalide',
  dictResponseError: 'Erreur d\'upload',
  dictCancelUpload: 'Annuler',
  dictUploadCanceled: 'Upload du fichier annulé',
  dictCancelUploadConfirmation: 'Annuler ?',
  dictRemoveFile: 'Retirer',
  dictRemoveFileConfirmation: 'Retirer ?',
  dictMaxFilesExceeded: 'Nombre maximum de fichiers atteint',
  dictFileSizeUnits: 'mb' as DropzoneDictFileSizeUnits,
  params: {},
  // accept: function(){},
  // chunksUploaded: function(){},
  // fallback: function(){},
  // resize: function(){},
  // transformFile: function() {},
  // previewTemplate: ''
}

const CircularProgressPortaled: FC<{ btnPortalEl?: HTMLElement}> = ({ btnPortalEl }) => {
  const circle = <CircularProgress style={{ width: "25px", height: "25px", marginLeft: "16px" }} />;

  return btnPortalEl ? ReactDOM.createPortal(circle, btnPortalEl) : circle;
};

export const DropZone = React.forwardRef<HTMLFormElement, DropZoneProps>(
  (
    {
      token,
      url,
      redirect_url,
      dropzone_index,
      accepted_files,
      accepted_extensions,
      max_files,
      max_file_size,
      label = "Terminé",
      addRemoveLinks = false,
      autoProcessQueue = true
    },
    ref
  ) => {
    const dropZoneRef = ref;

    const dropZoneParameter = {
      ...initialDropzoneParameter,
      addRemoveLinks,
      autoProcessQueue,
      acceptedFiles: accepted_files,
      maxFiles: max_files,
      maxFileSize: max_file_size,
      url: url
    };

    const processQueue: React.MouseEventHandler<HTMLButtonElement> = () => {
      // Dropzone import --> do not redirect, import and then redirect on success/error listener
      if (dropZone && !dropZoneParameter.autoProcessQueue) {
        dropZone.processQueue();
      }

      // Dropzone media --> redirect when click on button
      if (dropZoneParameter.autoProcessQueue && redirect_url) {
        document.location.href = redirect_url;
      }
    };

    // State of dropzone object
    const [dropZone, setDropZone] = useState<Dropzone|null>(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);


    const dropzoneIndex = dropzone_index;
    const acceptedExtensions = accepted_extensions;

    // FormRef
    const formRef = useRef<HTMLFormElement>(null);

    // Listeners
    dropZone &&
    (dropZone as Dropzone).on("addedfiles", (files) => {
      console.log("addedfiles");
      console.log(files);
      if (!autoProcessQueue) {
        setIsDisabled(false);
      }
    }) && 
    (dropZone as Dropzone).on("processingmultiple", (files) => {
      console.log("processingmultiple");
      console.log(files);
    }) && 
    (dropZone as Dropzone).on("processing", (file) => {
      console.log("processing");
      console.log(file);
    }) &&
    (dropZone as Dropzone).on("successmultiple", (files) => {
      console.log("successmultiple");
      console.log(files);
      setIsDisabled(false);
    }) &&
    (dropZone as Dropzone).on("success", (files) => {
      console.log("success");
      console.log(files);
      setIsDisabled(false);
    }) &&
    (dropZone as Dropzone).on("errormultiple", (files, error) => {
      console.log("errormultiple");
      console.log(files, error);
    }) &&
    (dropZone as Dropzone).on("error", (file, error) => {
      console.log("error");
      console.log(file, error);

    });
    
    // Initialization of DropZone
    useEffect(() => {

      if (formRef.current && !dropZone) {
        setIsLoading(false);

        // Fix error dropzone already set 
        Dropzone.autoDiscover = false;

        setDropZone(new Dropzone(
          formRef.current,
          {
            ...dropZoneParameter
          }
        ));
      }
    }, [formRef]);

    return (
      <div id="dropzone">
        {isLoading ? <CircularProgressPortaled/> : <></>}
        <form 
          ref={formRef} 
          action="" 
          className="dropzone dropzone-form needsclick dz-clickable" 
          id={`upload_form-${dropzoneIndex}`}>
          
          <input type="hidden" name="_token" value={token}/>

          <div className="row text-center">
              <div className="col">
                <button className="btn btn-primary" onClick={processQueue} disabled={isDisabled}>{label}</button>
              </div>
          </div>

          <div className="dz-message needsclick">
              <button className="dz-button">Pour uploader des fichiers, cliquez ou déplacez-les ici.</button><br></br>
              <small>Documents au formats {acceptedExtensions}. {dropZoneParameter.maxFiles} fichier(s) maximum {dropZoneParameter.maxFileSize}Mo maximum par fichier.</small>
          </div>

        </form>
      </div>
    );
  }
);

export default DropZone;