import React from "react";
import { tabHeight } from "components/constants/tab";
import { CodeFileT } from "components/types.d";

type PropsT = {
  files: Array<CodeFileT>;
  selectedTab: string;
  setSelectedTab: (arg: string) => void;
};

export default function Tabs({ files, selectedTab, setSelectedTab }: PropsT) {
  const tabClassName =
    "px-6 py-1.5 cursor-pointer whitespace-nowrap text-ellipsis overflow-hidden w-32 text-center";
  const tabContainerClassName = "grid grid-cols-3 divide-x divide-gray-800";
  const selectedTabClassName =
    "border-solid border-b !border-b-gray-200 font-bold";
  const genericBorderClassName = "border-solid border-b border-gray-800";

  return (
    <div
      className={`flex text-xs ${genericBorderClassName}`}
      style={{ minHeight: tabHeight }}
    >
      <div className={tabContainerClassName}>
        {files?.map((file) => (
          <span
            key={file?.fileName}
            className={`${tabClassName} ${
              selectedTab === file?.fileName ? selectedTabClassName : ""
            }`}
            onClick={() => {
              setSelectedTab(file?.fileName);
            }}
          >
            {file.displayName}
          </span>
        ))}
      </div>
    </div>
  );
}
