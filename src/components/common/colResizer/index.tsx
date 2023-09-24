import React, { useRef, RefObject, MutableRefObject } from "react";
import { useResizeEvents } from "./useResizerHooks";

type PropsT = {
  editorRef: MutableRefObject<HTMLDivElement | undefined>;
  previewRef: MutableRefObject<HTMLIFrameElement | undefined>;
  setIsResized: (arg: boolean) => void;
  isResized: boolean;
  iframeDocument: HTMLElement | null;
};

export default function ColResizer({
  editorRef,
  previewRef,
  setIsResized,
  isResized,
  iframeDocument,
}: PropsT) {
  const dividerRef = useRef() as RefObject<HTMLSpanElement>;
  let isResizing = false;

  useResizeEvents({
    dividerRef,
    editorRef,
    previewRef,
    isResizing,
    isResized,
    setIsResized,
    iframeDocument,
  });

  return (
    <span
      ref={dividerRef}
      className="w-4 h-full cursor-col-resize z-10 bg-zinc-900"
    />
  );
}
