export interface IContent {
  content: Array<IHome>
}
interface IHome {
  show_case_section:{
    main_title: string
    sub_title?: string
  },
  how_we_work_section: {
    title: string
    subtitle: string
    image_url: string
    content: string
  },
  top_packages_section: {
    title: string
    subtitle: string
    packages: Array<{
      image: string
      destination: string
      value: string
      time_amount: string
      hotel_classification: string
      transportations: string
      meal_options: string
      qualification: string
    }>
  },
  about_us_section: {
    title: string
    subtitle: string
    image_url: string
    content: string
  },
  top_destinations_section: {
    title: string
    subtitle: string
    destinations: Array<{
      image: string
      destination: string
      tours: string
      places: string
    }>
  },
  our_team_section: {
    title: string
    subtitle: string
    image_url: string
    content: string
  },
  testimonials_section: {
    title: string
    subtitle: string
    testimonials: Array<{
      image: string
      name: string
      testimonial: string
    }>
  },
  contact_form_section: {
    title: string
    subtitle: string
    email: string
    phone: string
  },
  site_contacts_section: {
    whatsapp_number: string
    whatsapp_message: string
    phone_number: string
    email: string
    facebook: string
    instagram: string
    linkedin: string
  }
}
