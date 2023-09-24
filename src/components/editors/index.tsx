import React from "react";
import MonacoEditor from "@monaco-editor/react";
import EditorLoader from "components/editors/common/loader";
import type { CodeT, EditorPropsT } from "components/types.d";

export default function CodeEditor({
  code,
  setCode,
  defaultLanguage,
  handleEditorDidMount,
}: EditorPropsT) {
  return (
    <MonacoEditor
      height="100%"
      width="100%"
      value={code}
      theme="vs-dark"
      defaultLanguage={defaultLanguage}
      onMount={handleEditorDidMount}
      loading={<EditorLoader />}
      options={{ fontSize: 10 }}
      onChange={(val: CodeT) => {
        setCode(val);
      }}
    />
  );
}
