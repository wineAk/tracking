export interface WtfJson {
  title?: string
  categories?: string[]
  sections?: WtfSection[]
}

export interface WtfSection {
  title?: string
  depth: number
  paragraphs?: WtfParagraph[]
  templates?: WtfTemplate[]
  infoboxes?: WtfInfobox[]
  references?: WtfReference[]
  images?: WtfImage[]
  lists?: WtfListItem[][]
}

export interface WtfParagraph {
  sentences: WtfSentence[]
}

export interface WtfSentence {
  text: string
  links?: WtfLink[]
  formatting?: {
    bold?: string[]
    italic?: string[]
  }
}

export interface WtfLink {
  text?: string
  type: "internal" | "external"
  page?: string
  site?: string
}

export interface WtfTemplate {
  template: string
  list?: string[]
  frame?: string
  text?: string
  lan1?: string
  text1?: string
  id?: string
  name?: string
  data?: Record<string, string>
  inline?: Record<string, string>
  agency?: string
  newspaper?: string
  author?: string
  publicationDate?: string
}

export interface WtfInfobox {
  [key: string]: {
    text?: string
    links?: WtfLink[]
  }
}

export interface WtfReference {
  url?: string
  title?: string
  work?: string
  website?: string
  publisher?: string
  author?: string
  first?: string
  last?: string
  date?: string
  accessdate?: string
  language?: string
  template?: string
  type?: string
  agency?: string
  newspaper?: string
  data?: Record<string, unknown>
  inline?: Record<string, unknown>
}

export interface WtfImage {
  file: string
  thumb: string
  url: string
  caption: string
  links: WtfLink[]
}

export interface WtfListItem {
  text: string
  links?: WtfLink[]
}
