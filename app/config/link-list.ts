export type LinkListItemType = {
  type: "prod" | "test";
  version: string;
  script: string;
  cl_company: string;
  cl_code: string;
  description: string;
};

export type LinkListType = {
  prod: LinkListItemType[];
  test: LinkListItemType[];
};

export function linkList(): LinkListType {
  const repositoryName = import.meta.env.VITE_REPOSITORY_NAME;
  return {
    prod: [
      {
        type: "prod",
        version: "v1",
        script: "https://script.secure-link.jp/swt/c12579546.js",
        cl_code: "c12579546",
        cl_company: "株式会社サスケケ",
        description: "",
      },
      {
        type: "prod",
        version: "v2",
        script: `/${repositoryName}/c12579546/tracking.js?v=2.0.0`,
        cl_code: "c12579546",
        cl_company: "株式会社サスケケ",
        description: "",
      },
    ],
    test: [
      {
        type: "test",
        version: "v1",
        script: "https://script.secure-link.jp/swt-test/c00102027.js",
        cl_code: "c00102027",
        cl_company: "デモシステム株式会社",
        description: "",
      },
      {
        type: "test",
        version: "v2",
        script: `/${repositoryName}/c00102027/tracking.js?v=2.0.0`,
        cl_code: "c00102027",
        cl_company: "デモシステム株式会社",
        description: "",
      },
    ],
  };
}
