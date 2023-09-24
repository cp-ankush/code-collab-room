import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

type MonacoT = typeof monaco;
type EditorT = monaco.editor.IStandaloneCodeEditor;

export type CodeFileT = {
  displayName: string;
  fileName: string;
  code: string;
};

export type CodeT = string | undefined;

export type SetCodeT = (arg: codeT) => codeT;

export type SpecificEditorPropsT = {
  code: CodeT;
  setCode: SetCodeT;
};

export type EditorPropsT = {
  code: CodeT;
  setCode: SetCodeT;
  defaultLanguage: string;
  handleEditorDidMount?: (editor: EditorT, monaco: MonacoT) => void;
};
