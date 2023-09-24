import React, { useEffect, MutableRefObject, RefObject } from "react";

type UseResizeEventsPropsT = {
  dividerRef: RefObject<HTMLSpanElement>;
  editorRef: MutableRefObject<HTMLDivElement | undefined>;
  previewRef: MutableRefObject<HTMLIFrameElement | undefined>;
  isResizing: boolean;
  isResized: boolean;
  setIsResized: (arg: boolean) => void;
  iframeDocument: HTMLElement | null;
};

export const useResizeEvents = ({
  dividerRef,
  editorRef,
  previewRef,
  isResizing,
  isResized,
  setIsResized,
  iframeDocument,
}: UseResizeEventsPropsT) => {
  useEffect(() => {
    const divider = dividerRef.current;
    const editor = editorRef.current;
    const preview = previewRef.current;
    let startX: number | undefined;
    let initialEditorWidth: number | undefined;

    const onMouseDown = (event: MouseEvent) => {
      isResizing = true;
      document.body.style.cursor = "col-resize";

      startX = event.clientX;
      initialEditorWidth = editor?.offsetWidth;

      const onMouseMove = (event: MouseEvent) => {
        if (!isResizing) return;
        if (!isResized) setIsResized(true);
        const deltaX = event.clientX - (startX || 0);
        const editorPxWidth = (initialEditorWidth || 0) + deltaX + "px";
        if (editor) editor.style.width = editorPxWidth;
        if (preview) preview.style.width = `calc(100% - ${editorPxWidth})`;
      };

      const onMouseUp = () => {
        if (isResizing) {
          isResizing = false;
          document.body.style.cursor = "auto";
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        }
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const handleWindowMessage = (event: MessageEvent) => {
      // Access the event data sent from the iframe
      const eventData = event.data;

      // Access the clientX value corresponding to the parent window's coordinates
      const clientXInParent = eventData.clientX;

      if (eventData.type === "mouseup") {
        if (isResizing) {
          isResizing = false;
          document.body.style.cursor = "auto";
          return;
        }
      }

      if (eventData.type === "mousedown") {
        startX = clientXInParent;
        initialEditorWidth = editor?.offsetWidth;
        isResizing = true;
        document.body.style.cursor = "col-resize";
      }

      if (eventData.type === "mousemove") {
        if (!isResizing) return;
        if (!isResized) setIsResized(true);

        const deltaX = clientXInParent - (startX || 0);
        const editorPxWidth = (initialEditorWidth || 0) + deltaX + "px";
        if (editor) editor.style.width = editorPxWidth;
        if (preview) preview.style.width = `calc(100% - ${editorPxWidth})`;
      }
    };

    if (editor && divider && preview && iframeDocument) {
      if (divider) divider.addEventListener("mousedown", onMouseDown);
      // Add an event listener for messages sent from the iframe
      window.addEventListener("message", handleWindowMessage);
    }

    return () => {
      divider?.removeEventListener?.("mousedown", onMouseDown);
      window?.removeEventListener?.("message", handleWindowMessage);
    };
  }, [dividerRef, editorRef, previewRef, iframeDocument]);
};
