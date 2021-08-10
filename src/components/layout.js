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
        <h1 className="font-cool text-4xl font-bold">
          <Link to="/">{title}</Link>
        </h1>
      </>
    )
  } else {
    header = (
      <Link className="font-cool text-2xl font-bold" to="/">
        {title}
      </Link>
    )
  }

  return (
    <>
      <nav className="flex flex-row items-center">
        <header className={classNames(isRootPath ? "justify-center" : "justify-start", "h-16 mx-5 flex flex-auto items-center text-primary")}>
          {header}
        </header>
        <div className="flex-grow-0 flex-auto flex flex-row gap-3 justify-end pr-5">
          <ModeSwitch />
          <Society type="weChat" url={social.weChat || ''} />
          <Society type="youTube" url={social.youTube || ''} />
          <Society type="twitter" url={social.twitter || ''} />
        </div>
      </nav>


      <main className="min-h-screen container mx-auto px-5" data-is-root-path={isRootPath}>{children}</main>

      <footer className="bg-primary-300 text-white dark:bg-gray-500 h-20 flex justify-center items-center">
        © {new Date().getFullYear()},{`dzg`}
      </footer>
    </>
  )
}

export default Layout
