export type WikipediaResponse = {
  batchcomplete?: string
  warnings?: WikipediaWarnings
  query: {
    pages: {
      [pageId: string]: WikipediaPage
    }
  }
}

export type WikipediaWarnings = {
  main?: {
    '*': string
  }
  revisions?: {
    '*': string
  }
}

export type WikipediaPage = {
  pageid: number
  ns: number
  title: string
  revisions: WikipediaRevision[]
}

export type WikipediaRevision = {
  contentformat: string // 例: "text/x-wiki"
  contentmodel: string  // 例: "wikitext"
  '*': string           // 実際の本文（wikitext）
}
