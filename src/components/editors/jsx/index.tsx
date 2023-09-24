import React from "react";
import Editor from "components/editors";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import type { SpecificEditorPropsT } from "components/types.d";

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

function CodeEditorReact({ code, setCode }: SpecificEditorPropsT) {
  // We need to listen to the editor onMount event
  // to setup the JSX syntax highlighting
  const handleEditorDidMount = React.useCallback(
    async (editor: EditorT, monaco: MonacoT) => {
      activateMonacoJSXHighlighter(editor, monaco);
    },
    []
  );

  return (
    <Editor
      code={code}
      defaultLanguage="javascript"
      handleEditorDidMount={handleEditorDidMount}
      setCode={setCode}
    />
  );
}

export default CodeEditorReact;
