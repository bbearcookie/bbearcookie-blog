import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import Footer from '@/components/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between font-sans">
        <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
          <Header />
          <main className="mb-auto">{children}</main>
        </SearchProvider>
        <Footer />
      </div>
    </SectionContainer>
  )
}
