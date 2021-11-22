import { Container } from './styles'

interface AboutProps {
  slice_label?: string
  content_data: {
    title: string
    subtitle: string
    image_url: string
    content: string
  }
}

export const config = { amp: true }

export const TextBlock:React.FC<AboutProps> = ({slice_label, content_data}) => {

  const {
    title,
    subtitle,
    image_url,
    content
   } = content_data

  return (
    <Container>
      <div className="header">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <div className="container">
        <div className="imageContainer" >
          <img loading={"lazy"} className={slice_label === 'our_team' ? 'team' : ''} src={image_url} alt="" />
        </div>
          <div className="mainContent" dangerouslySetInnerHTML={{ __html:content}} />
        </div>
    </Container>
  )
}


