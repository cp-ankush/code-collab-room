import React from "react";
import Editor from "components/editors";
import type { SpecificEditorPropsT } from "components/types.d";

function CodeEditorHTML({ code, setCode }: SpecificEditorPropsT) {
  return <Editor code={code} setCode={setCode} defaultLanguage="html" />;
}

export default CodeEditorHTML;
