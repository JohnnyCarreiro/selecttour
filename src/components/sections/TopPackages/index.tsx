import { Package } from '@/components/Package'
import { ReactNode } from 'react'

import { Container } from './styles'

interface TopPackagesProps {
  content_data: {
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
  }
  children?: ReactNode
}

export const TopPackages: React.FC<TopPackagesProps> = ({ children, content_data }) => {
  const {
    title,
    subtitle,
    packages
   } = content_data;
  return (
    <Container>
      <div className="packages">
        <h2>{ title }</h2>
        <h3>{ subtitle }</h3>
      </div>
      <div className="container">
        { packages.map(package_data => <Package
          key={ package_data.destination}
          package_data={package_data}
        /> ) }
        {children}
      </div>
    </Container>
  )
}
