import Header from 'components/layout/Header'
// import Footer from 'components/layout/Footer'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  )
}

export default Layout
