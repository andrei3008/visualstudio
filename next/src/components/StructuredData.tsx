'use client'

interface StructuredDataProps {
  type: 'organization' | 'website' | 'product' | 'service'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    }

    switch (type) {
      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: 'Visual Studio',
          description: 'Platformă modernă pentru dezvoltare software la comandă',
          url: typeof window !== 'undefined' ? window.location.origin : '',
          logo: '/logo.svg',
          image: '/og-image.jpg',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'RO',
            addressLocality: 'Romania'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'contact@visualstudio.ro'
          },
          sameAs: [
            'https://linkedin.com/company/visualstudio',
            'https://twitter.com/visualstudio'
          ]
        }

      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: 'Visual Studio',
          description: 'Platformă pentru servicii software la comandă, ofertare rapidă și execuție transparentă',
          url: typeof window !== 'undefined' ? window.location.origin : '',
          potentialAction: {
            '@type': 'SearchAction',
            target: `${typeof window !== 'undefined' ? window.location.origin : ''}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          author: {
            '@type': 'Organization',
            name: 'Visual Studio',
            url: typeof window !== 'undefined' ? window.location.origin : ''
          }
        }

      case 'product':
        return {
          ...baseData,
          '@type': 'Product',
          name: data?.name || 'Serviciu Software la Comandă',
          description: data?.description || 'Dezvoltare software customizată pentru nevoile tale de business',
          brand: {
            '@type': 'Brand',
            name: 'Visual Studio'
          },
          offers: {
            '@type': 'Offer',
            price: data?.price || 'Custom',
            priceCurrency: 'RON',
            availability: 'https://schema.org/InStock',
            validFrom: new Date().toISOString().split('T')[0]
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127'
          }
        }

      case 'service':
        return {
          ...baseData,
          '@type': 'Service',
          name: 'Dezvoltare Software la Comandă',
          description: 'Servicii complete de dezvoltare software, de la consultanță la implementare și mentenanță',
          provider: {
            '@type': 'Organization',
            name: 'Visual Studio',
            url: typeof window !== 'undefined' ? window.location.origin : ''
          },
          serviceType: [
            'Web Development',
            'Mobile Apps',
            'Software Architecture',
            'AI Solutions',
            'Cloud Services'
          ],
          areaServed: {
            '@type': 'Country',
            name: 'Romania'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Servicii Software',
            itemListElement: [
              {
                '@type': 'Offer',
                item: {
                  '@type': 'Service',
                  name: 'Dezvoltare Web',
                  description: 'Aplicații web moderne și responsive'
                }
              },
              {
                '@type': 'Offer',
                item: {
                  '@type': 'Service',
                  name: 'Dezvoltare Mobile',
                  description: 'Aplicații iOS și Android performante'
                }
              },
              {
                '@type': 'Offer',
                item: {
                  '@type': 'Service',
                  name: 'AI Solutions',
                  description: 'Inteligentă artificială și machine learning'
                }
              }
            ]
          }
        }

      default:
        return baseData
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}