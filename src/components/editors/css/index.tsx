import React from "react";
import type { SpecificEditorPropsT } from "components/types.d";
import Editor from "components/editors";

function CodeEditorCSS({ code, setCode }: SpecificEditorPropsT) {
  return <Editor code={code} setCode={setCode} defaultLanguage="css" />;
}

export default CodeEditorCSS;
