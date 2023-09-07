"use client";
import React from "react";
import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type MonacoT = typeof monaco;
type EditorT = monaco.editor.IStandaloneCodeEditor;

// This function is used to active the JSX syntax highlighting
const activateMonacoJSXHighlighter = async (
  monacoEditor: EditorT,
  monaco: MonacoT
) => {
  const { default: traverse } = await import("@babel/traverse");
  const { parse } = await import("@babel/parser");
  const { default: MonacoJSXHighlighter, JSXTypes } = await import(
    "monaco-jsx-highlighter"
  );
  await import("./styles.css");

  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco,
    parse,
    traverse,
    monacoEditor
  );

  monacoJSXHighlighter.highlightOnDidChangeModelContent();
  monacoJSXHighlighter.addJSXCommentCommand();
  JSXTypes.JSXText.options.inlineClassName = "JSXText";
  JSXTypes.JSXIdentifier.options.inlineClassName = "JSXIdentifier";
  JSXTypes.JSXClosingFragment.options.inlineClassName = "JSXClosingFragment";

  JSXTypes.JSXSpreadChild.options.inlineClassName = "JSXSpreadChild";
  JSXTypes.JSXBracket.options.inlineClassName = "JSXBracket";

  return {
    monacoJSXHighlighter,
  };
};

function CodeEditor() {
  const [value, setValue] = React.useState<string | undefined>("");
  // We need to listen to the editor onMount event
  // to setup the JSX syntax highlighting
  const handleEditorDidMount = React.useCallback(
    async (editor: EditorT, monaco: MonacoT) => {
      activateMonacoJSXHighlighter(editor, monaco);
    },
    []
  );

  return (
    <MonacoEditor
      height="80vh"
      width="100%"
      value={value}
      theme="vs-dark"
      defaultLanguage="javascript"
      onMount={handleEditorDidMount}
      onChange={(val: string | undefined) => {
        setValue(val);
      }}
    />
  );
}

export default CodeEditor;
