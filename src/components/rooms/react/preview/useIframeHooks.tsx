import React, { useEffect, RefObject } from "react";
import ReactDOM from "react-dom";
import type { CodeT } from "components/types.d";

type UseReactExecutionPropsT = {
  reactCode: CodeT;
  iframeDocument: HTMLElement | null;
};

type UseHTMLExecutionPropsT = {
  setIframeDocument: (arg: HTMLElement | null) => void;
  htmlCode: CodeT;
};

type UseStylesAppendPropsT = {
  iframeDocument: HTMLElement | null;
  htmlCode: CodeT;
  cssCode: CodeT;
};

type UsePreviewResizeEventsPropsT = {
  iFrameRef: RefObject<HTMLIFrameElement>;
  iframeDocument: HTMLElement | null;
};

// Execute React code under iframe document
export const useReactExecution = ({
  iframeDocument,
  reactCode,
}: UseReactExecutionPropsT) => {
  useEffect(() => {
    if (iframeDocument) {
      const Babel = require("@babel/standalone");
      try {
        const reactTranspiledCode = Babel.transform(reactCode, {
          presets: ["react"],
        }).code;

        const reactExecutableCode = new Function(
          "React",
          "ReactDOM",
          "document",
          reactTranspiledCode
        );

        reactExecutableCode(React, ReactDOM, iframeDocument);
      } catch (error) {
        console.log("error message", error);
      }
    }
  }, [reactCode, iframeDocument]);
};

// Execute HTML code in an iframe
export const useHTMLExecution = ({
  setIframeDocument,
  htmlCode,
}: UseHTMLExecutionPropsT) => {
  useEffect(() => {
    // Get the iframe element by Id
    const iframe = document.getElementById("reactIframe");

    // Access the iframe's document
    const iframeDoc =
      // @ts-ignore: browser api's
      iframe?.contentDocument || iframe?.contentWindow?.document;

    // Set the user's HTML content in the iframe's document
    iframeDoc.open();
    iframeDoc.write(htmlCode);
    iframeDoc.close();

    // Store the iframe's document in state
    setIframeDocument(iframeDoc);
  }, [htmlCode]);
};

// Append styles in an iframe
export const useStylesAppend = ({
  iframeDocument,
  htmlCode,
  cssCode,
}: UseStylesAppendPropsT) => {
  useEffect(() => {
    // Create a <style> element to inject user CSS
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    const iFrameHead = iframeDocument?.getElementsByTagName?.("head")?.[0];

    const existingStyleElement = iFrameHead?.getElementsByTagName?.("style");
    if (existingStyleElement && existingStyleElement?.length > 0) {
      iFrameHead?.removeChild?.(existingStyleElement?.[0]);
    }

    // Set the user's CSS content
    if ("textContent" in styleElement) {
      // @ts-ignore: browser api's
      styleElement.textContent = cssCode; // For modern browsers
    } else {
      // @ts-ignore: browser api's
      styleElement.styleSheet.cssText = cssCode; // For older versions of IE
    }

    // Append the <style> element to the document's <head>
    // @ts-ignore: browser api's
    iframeDocument?.head?.appendChild(styleElement);
  }, [cssCode, htmlCode, iframeDocument]);
};

// Events for resizing the window
export const usePreviewResizeEvents = ({
  iFrameRef,
  iframeDocument,
}: UsePreviewResizeEventsPropsT) => {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get the clientX value relative to the iframe's viewport
      const clientXInIframe = event.clientX;

      // Get the iframe's position relative to the parent window
      const iframeRect = iFrameRef?.current?.getBoundingClientRect();

      // Calculate the clientX value in the parent window's coordinates
      const clientXInParent = clientXInIframe + (iframeRect?.left || 0);

      // Send a message to the parent window with the clientX value
      window.postMessage({ clientX: clientXInParent, type: "mousemove" }, "*");
    };

    const handleMouseDown = () => {
      // Send a message to the parent window with the clientX value
      window.postMessage({ type: "mousedown" }, "*");
    };

    const handleMoveUp = () => {
      // Send a message to the parent window with the clientX value
      window.postMessage({ type: "mouseup" }, "*");
    };

    if (iframeDocument && iFrameRef?.current) {
      iframeDocument.addEventListener("mousemove", handleMouseMove);

      iframeDocument.addEventListener("mouseup", handleMoveUp);

      iframeDocument.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      iframeDocument?.removeEventListener?.("mousedown", handleMouseDown);
      iframeDocument?.removeEventListener?.("mousemove", handleMouseMove);
      iframeDocument?.removeEventListener?.("mouseup", handleMoveUp);
    };
  }, [iFrameRef, iframeDocument]);
};
