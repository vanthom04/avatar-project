import Header from './Header'
import Navbar from './Navbar'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen font-Roboto overflow-hidden">
      <Header />
      <div className="h-[calc(100vh-80px)] flex">
        <Navbar />
        <main className="basis-4/5 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default Layout
