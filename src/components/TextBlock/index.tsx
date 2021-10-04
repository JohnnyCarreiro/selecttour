import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react'
import { useVisibility } from '../../utils/useVisibility'
import { Container } from './styles'

interface AboutProps {
  content_data: {
    title: string
    subtitle: string
    image_url: string
    content: string
  }
}

export const TextBlock:React.FC<AboutProps> = ({content_data}) => {
  const [isVisible, currentElement] = useVisibility<HTMLDivElement>(100)

  const {
    title,
    subtitle,
    image_url,
    content
   } = content_data

  return (
    <Container ref={currentElement} >
      <div className="about">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <div className="container">
        <div className="imageContainer" >
          <img src={image_url} alt="" />
        </div>
        {/* <div className="mainContent"> */}
          <div className="mainContent" dangerouslySetInnerHTML={{ __html:content}} />
          {/* <p> Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Suco de cevadiss deixa as pessoas mais interessantis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.
            <br/><br/>
          Mé faiz elementum girarzis, nisi eros vermeio. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Mussum Ipsum, cacilds vidis litro abertis.
          <br/><br/>
          Per aumento de cachacis, eu reclamis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Suco de cevadiss deixa as pessoas mais interessantis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per.
          <br/><br/>
          Mé faiz elementum girarzis, nisi eros vermeio. Si u mundo tá muito paradis? Toma um mé que o mundo vai girarzis! Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. </p> */}
        </div>
      {/* </div> */}
    </Container>
  )
}


