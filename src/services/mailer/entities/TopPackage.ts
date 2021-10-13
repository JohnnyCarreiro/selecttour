export class TopPackage {

  public requestSource!: string
  public destination!: string

  public name!: string
  public surname!: string
  public email!: string
  public phone!: string
  public observations?: string

  constructor (props: TopPackage){
      Object.assign(this, props)
  }

}
