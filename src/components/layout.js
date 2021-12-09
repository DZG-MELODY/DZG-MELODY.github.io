import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import classNames from "classnames"
import ModeSwitch from "./mode-switch"
import Society from "./society"

const Layout = ({ location, title, children }) => {

  const data = useStaticQuery(graphql`
  query SocietyQuery {
    site {
      siteMetadata {
        social {
          twitter,
          weChat,
          youTube
        }
      }
    }
  }
`)

  const social = data.site.siteMetadata?.social

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <>
        <h1 className="font-sans text-5xl font-bold">
          <Link to="/">
            <span className="text-primary-blue">D</span>
            <span className="text-primary-red">Z</span>
            <span className="text-primary-yellow">G</span>
            <span className="text-primary-green">的技术世界</span></Link>
        </h1>
      </>
    )
  } else {
    header = (
      <Link className="text-2xl font-bold" to="/">
        <span className="text-primary-blue">D</span>
        <span className="text-primary-red">Z</span>
        <span className="text-primary-yellow">G</span>
        <span className="text-primary-green">的技术世界</span>
      </Link>
    )
  }

  return (
    <>
      <nav className="flex flex-row items-center h-20">
        <header className={classNames(isRootPath ? "justify-center" : "justify-start", "h-16 mx-5 flex flex-auto items-center")}>
          {header}
        </header>
        <div className="flex-grow-0 flex-auto flex flex-row gap-3 justify-end pr-5">
          <ModeSwitch />
        </div>
      </nav>


      <main className="container mx-auto px-5" style={{ minHeight: 'calc(100vh - 185px)' }} data-is-root-path={isRootPath}>{children}</main>

      <footer className=" text-gray-400 italic border-t border-gray-400 h-20 px-5 flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="flex-grow-0 flex-shrink-0 flex-auto">
        © {new Date().getFullYear()},{`dzg`}
        </div>
        <div className="flex-1 flex justify-end items-center gap-3">
          <Society type="weChat" url={social.weChat || ''} />
          <Society type="youTube" url={social.youTube || ''} />
          <Society type="twitter" url={social.twitter || ''} />
        </div>
      </footer>
    </>
  )
}

export default Layout
