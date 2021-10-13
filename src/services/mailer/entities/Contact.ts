export class Contact {

  public requestSource!: string

  public name!: string
  public email!: string
  public phone!: string
  public subject!:string
  public message?:string

  constructor (props: Contact){
      Object.assign(this, props)
  }

}
