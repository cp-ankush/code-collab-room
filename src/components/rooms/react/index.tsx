import React, { useState, useRef } from "react";
import Editor from "./editor";
import Preview from "./preview";
import Tabs from "./tabs";
import ColResizer from "components/common/colResizer";
import { CodeT, SetCodeT } from "components/types.d";

import {
  HTML_TYPE,
  CSS_TYPE,
  REACT_TYPE,
} from "components/constants/codeFiles";

// Files will come from backend
const files = [
  {
    displayName: "index.html",
    fileName: "index.html",
    code: "",
    fileType: "html",
  },
  {
    displayName: "styles.css",
    fileName: "styles.css",
    code: "",
    fileType: "css",
  },
  {
    displayName: "App.js",
    fileName: "App.js",
    code: "",
    fileType: "react",
  },
];

export default function ReactEditorRoom() {
  const [isResized, setIsResized] = useState(false);
  const editorRef = useRef<HTMLDivElement>();
  const previewRef = useRef<HTMLIFrameElement>();
  const [iframeDocument, setIframeDocument] = useState<HTMLElement | null>(
    null
  );

  // Default code will be moved to backend.
  const [htmlCode, setHTMLCode] = React.useState<CodeT>(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>React App</title>
  </head>

  <body>
    <div id="react-app"></div>
  </body>
</html>`);

  // Default code will be moved to backend.
  const [cssCode, setCSSCode] = React.useState<CodeT>(`html {
  box-sizing: border-box;
  font-size: 10px;
  color: white;
}`);

  // Default code will be moved to backend.
  const [reactCode, setReactCode] = React.useState<CodeT>(`function App() {
  return (
    <div>
    Welcome to realtime code collab!
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('react-app'));
`);

  const [selectedTab, setSelectedTab] = useState(files?.[0]?.fileName);
  const selectedFile = files.filter(
    (file) => file.fileName === selectedTab
  )?.[0];

  const getTabCode = () => {
    if (selectedFile?.fileType === HTML_TYPE) return htmlCode;
    if (selectedFile?.fileType === CSS_TYPE) return cssCode;
    if (selectedFile?.fileType === REACT_TYPE) return reactCode;
    // If nothing matches above, by default show html code
    return htmlCode;
  };

  const getSetTabCode = () => {
    if (selectedFile?.fileType === HTML_TYPE) return setHTMLCode;
    if (selectedFile?.fileType === CSS_TYPE) return setCSSCode;
    if (selectedFile?.fileType === REACT_TYPE) return setReactCode;
    // If nothing matches above, by default show html code
    return setHTMLCode;
  };

  const tabCode: CodeT = getTabCode();
  const setTabCode: SetCodeT = getSetTabCode();

  return (
    <div className="overflow-hidden h-full">
      <Tabs
        files={files}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className={`flex h-full`}>
        <Editor
          ref={editorRef}
          fileType={selectedFile?.fileType}
          code={tabCode}
          setCode={setTabCode}
          isResized={isResized}
        />
        <ColResizer
          editorRef={editorRef}
          previewRef={previewRef}
          setIsResized={setIsResized}
          isResized={isResized}
          iframeDocument={iframeDocument}
        />
        <Preview
          ref={previewRef}
          htmlCode={htmlCode}
          cssCode={cssCode}
          reactCode={reactCode}
          isResized={isResized}
          iframeDocument={iframeDocument}
          setIframeDocument={setIframeDocument}
        />
      </div>
    </div>
  );
}
