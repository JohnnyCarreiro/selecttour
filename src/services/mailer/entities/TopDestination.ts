export class TopDestination {

  public requestSource!: string
  public destination!: string

  public name!: string
  public surname!: string
  public email!: string
  public phone!: string
  public observations?: string

  constructor (props: TopDestination){
      Object.assign(this, props)
  }

}
