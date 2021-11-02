type PostData = {
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

  public contents?:{
    posts?: Array<PostData>
  }
  public pages?: {
    currentPage: number
    totalPages: number
  }
  public filteredCategory?:string
  public filteredTags?:string
  public error?: { message: string }

  constructor(props: ICMSData) {
    Object.assign(this, props)
  }
}
