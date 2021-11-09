export type PostData = {
  slug: string
  image: {
    url: string
    alt: string
  }
  categories: string
  tags: Array<string>
  author: string
  title: string
  snippet: string
  updatedAt: string
}

export class ICMSData {

  public contents!:{
    // posts?: Array<PostData>
    posts?: Array<any>
  }
  public pages!: {
    currentPage: number
    totalPages: number
  }
  public tags!: Array<string>
  public categories!: Array<string>
  public filteredCategory?:string
  public filteredTag?:string
  public error?: { message: string }

  constructor(props: ICMSData) {
    Object.assign(this, props)
  }
}
