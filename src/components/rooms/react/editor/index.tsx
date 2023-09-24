import React, { forwardRef, RefObject } from "react";
import HTMLEditor from "components/editors/html";
import CSSEditor from "components/editors/css";
import JSXEditor from "components/editors/jsx";
import {
  HTML_TYPE,
  CSS_TYPE,
  REACT_TYPE,
} from "components/constants/codeFiles";
import type { CodeT, SetCodeT } from "components/types.d";

type PropsT = {
  fileType: string;
  code: CodeT;
  setCode: SetCodeT;
  isResized: boolean;
};

export default forwardRef(function Editor(
  { fileType, code, setCode, isResized }: PropsT,
  ref
) {
  const editorRef = ref as RefObject<HTMLDivElement>;

  const getEditorComponent = () => {
    if (fileType === HTML_TYPE) return HTMLEditor;
    if (fileType === CSS_TYPE) return CSSEditor;
    if (fileType === REACT_TYPE) return JSXEditor;
    return HTMLEditor;
  };

  const EditorComponent: React.FunctionComponent<{
    code: CodeT;
    setCode: SetCodeT;
  }> = getEditorComponent();

  const editorContainerClassName = isResized
    ? `overflow-auto bg-neutral-900`
    : `overflow-auto bg-neutral-900 flex-1`;

  return (
    <div className={editorContainerClassName} ref={editorRef}>
      <EditorComponent code={code} setCode={setCode} />
    </div>
  );
});
