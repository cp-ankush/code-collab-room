import React, { forwardRef, RefObject } from "react";
import {
  useReactExecution,
  useHTMLExecution,
  useStylesAppend,
  usePreviewResizeEvents,
} from "./useIframeHooks";
import type { CodeT } from "components/types.d";

type PropsT = {
  htmlCode: CodeT;
  cssCode: CodeT;
  reactCode: CodeT;
  isResized: boolean;
  iframeDocument: HTMLElement | null;
  setIframeDocument: (arg: HTMLElement | null) => void;
};

export default forwardRef(function Preview(
  {
    htmlCode,
    cssCode,
    reactCode,
    isResized,
    iframeDocument,
    setIframeDocument,
  }: PropsT,
  ref
) {
  const iFrameRef = ref as RefObject<HTMLIFrameElement>;

  useReactExecution({ iframeDocument, reactCode });
  useHTMLExecution({ setIframeDocument, htmlCode });
  useStylesAppend({ iframeDocument, htmlCode, cssCode });
  usePreviewResizeEvents({ iFrameRef, iframeDocument });

  const iFrameClassName = isResized ? `overflow-auto` : `overflow-auto flex-1`;

  return (
    <>
      <iframe
        ref={iFrameRef}
        id="reactIframe"
        title="User React code"
        sandbox="allow-scripts allow-same-origin"
        className={iFrameClassName}
      ></iframe>
    </>
  );
});
