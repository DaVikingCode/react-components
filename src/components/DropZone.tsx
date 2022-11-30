import Dropzone from "dropzone";
import ReactDOMServer from 'react-dom/server'
import React, { useRef, useEffect, useState, SyntheticEvent } from "react";
import { DropZonePreviewTemplate } from "./DropZonePreviewTemplate";


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
  label?: string,
  // addRemoveLinks
  addRemoveLinks?: boolean,
  // autoProcessQueue
  autoProcessQueue?: boolean,
  // callback api 
  uploadSuccessCallback?: (files: FileList) => boolean,
  uploadErrorCallback?: (files: FileList, error: string) => boolean,
}

const initialDropzoneParameter = {
  timeout: 600000, // in ms
  parallelUploads: 1,
  dictFileTooBig: 'Fichier trop grand',
  dictInvalidFileType: 'Type de fichier invalide',
  dictResponseError: 'Erreur d\'upload',
  dictCancelUpload: 'Annuler',
  dictUploadCanceled: 'Upload du fichier annulé',
  dictCancelUploadConfirmation: 'Annuler ?',
  dictRemoveFile: 'Retirer',
  dictRemoveFileConfirmation: 'Retirer ?',
  dictMaxFilesExceeded: 'Nombre maximum de fichiers atteint',
  method: "post",
  params: {}
}

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
    Dropzone.autoDiscover = false;

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
      // Clear error list
      $('#dropzone-error-list').empty();

      // Dropzone import --> do not redirect, import and then redirect on success/error listener
      if (dropZone && !dropZoneParameter.autoProcessQueue) {
        dropZone.processQueue();
      }

      // Dropzone media --> redirect when click on button
      if (dropZoneParameter.autoProcessQueue && redirect_url) {
        document.location.href = redirect_url;
      }
    };

    // Fix to not reload page when click on form
    const onSubmitCallback = (ev: SyntheticEvent) => {
      ev.preventDefault();
    };

    // State of dropzone object
    const [dropZone, setDropZone] = useState<Dropzone | null>(null);
    const [isHidden, setIsHidden] = useState(true);
    const [isInfoHidden, setIsInfoHidden] = useState(true);

    const dropzoneIndex = dropzone_index;
    const acceptedExtensions = accepted_extensions;

    // FormRef
    const formRef = useRef<HTMLFormElement>(null);

    // Listeners
    dropZone &&
      (dropZone as Dropzone).on("addedfiles", () => {
        if (!autoProcessQueue) {
          // Hide custom progress bar when add files
          $("#upload_form-" + dropzoneIndex + " .custom-dz-upload").hide();
          setIsHidden(false);
          setIsInfoHidden(true);
        }

      }) &&
      (dropZone as Dropzone).on("processing", (file) => {
        setIsHidden(true);
        setIsInfoHidden(true);
        // Hide default progress bar when processing
        $(file.previewElement).find(".dz-upload").hide();
        // Show custom progress bar when processing
        $(file.previewElement).find(".custom-dz-upload").show();
        $(file.previewElement).find(".dz-progress").css("height", "inherit");

      }) &&
      (dropZone as Dropzone).on("success", (file) => {
        // Hide custom progress bar when processing
        $(file.previewElement).find(".custom-dz-upload").hide();
        // Override css success mark
        $(file.previewElement).find(".dz-success-mark").css("animation", "slide-in 3s cubic-bezier(0.77, 0, 0.175, 1)");
        $(file.previewElement).find(".dz-success-mark").css("opacity", "1");

        if (!autoProcessQueue) {
          // ManualProcess context : Is there file left to process ?
          if (dropZone.getQueuedFiles().length > 0) {
            dropZone.processQueue();
          } else {
            setIsInfoHidden(false);
          }
        } else {
          // AutoProcess context : Refresh button available
          setIsHidden(false);
          setIsInfoHidden(true);
        }
      }) && 
      (dropZone as Dropzone).on("error", () => {
        setIsInfoHidden(true);
        setIsHidden(true);
      });

    // Initialization of DropZone
    useEffect(() => {

      if (formRef.current && !dropZone) {
        setDropZone(new Dropzone(
          formRef.current,
          {
            ...dropZoneParameter,
            previewTemplate: ReactDOMServer.renderToString(DropZonePreviewTemplate),
            error: (file: any, message: any) => {
              // Code from github "npm dropzone"
              if (file.upload && file.upload.uuid && file.previewElement) {
                file.previewElement.classList.add("dz-error");
                if (typeof message !== "string" && (message.error || message.file)) {
                  message = message.error || message.file;
                } else if (typeof message !== "string") {
                  // Custom error sent by api
                  var finalMessage: string[] = [];

                  // CUSTOM : Iterate on each message
                  if (message.message.length > 0) {
                    message.message.forEach((currentMessage: any) => {
                      var errorList: string[] = [];
                      // Iterate on each errors
                      currentMessage.errors.forEach((errorMessage: string) => {
                        errorList.push((currentMessage.row ? "Ligne " + currentMessage.row + " : " : "") + errorMessage + " \n ");
                      })
                      // Return result message
                      finalMessage = finalMessage.concat(errorList);
                    });

                    message = "<p>" + finalMessage.sort().join("</p><p>") + "</p>";

                  } else {
                    message = "Une erreur est surevenue, veuillez vérifier le fichier importé.";
                  }

                }

                // CUSTOM : add span data-dz-errormessage-index
                const divFileError = $("<div id='dropzone-info' class='alert alert-danger' role='alert' data-dz-errormessage-" + file.upload.uuid + ">" + message + "</div>");
                $('#dropzone-error-list').append($(divFileError));
              }
            }
          }
        ));
      }
    }, [formRef]);

    return (
      <div id="dropzone-container">
        <div id="dropzone-info" className="alert alert-info" role="alert" hidden={isInfoHidden}>
          L'importation a commencé. Lorsque le traitement sera achevé, nous vous enverrons un mail récapitulatif.
        </div>
        <div id="dropzone">
          <form
            ref={formRef}
            action=""
            className="dropzone dropzone-form needsclick dz-clickable"
            id={`upload_form-${dropzoneIndex}`}
            onSubmit={onSubmitCallback}>

            <input type="hidden" name="_token" value={token} />

            <div className="row text-center">
              <div className="col">
                <button className="btn btn-primary" onClick={processQueue} hidden={isHidden}>{label}</button>
              </div>
            </div>

            <div className="dz-message needsclick">
              <button type="button" className="dz-button">Pour uploader des fichiers, cliquez ou déplacez-les ici.</button><br></br>
              <small>Documents au formats {acceptedExtensions}. {dropZoneParameter.maxFiles} fichier(s) maximum {dropZoneParameter.maxFileSize}Mo maximum par fichier.</small>
            </div>
            {/* <p class="alert alert-danger" role="alert" hidden>Connexion impossible, veuillez réssayer.</p> */}
            <div id="dropzone-error-list" className="dz-error-message" style={{paddingTop : 0.5 + 'em' }}></div>
          </form>
        </div>
      </div>
    );
  }
);

export default DropZone;