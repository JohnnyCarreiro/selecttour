export class RequestVisit {

  public requestSource!: string

  public name!: string
  public surname!: string
  public email!: string
  public phone!: string
  public observations?: string

  public from?: string
  public to?: string
  public departure?: string
  public returns?: string
  public adults?: string
  public childs?: string
  public childrenAge?: string
  public flightClass?: string
  public accomodation?: string

  constructor (props: RequestVisit){
      Object.assign(this, props)
  }

}
