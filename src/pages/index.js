import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <ol className="list-none flex flex-col gap-4 mt-5">
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <Link key={post.fields.slug} to={`/${post.frontmatter.category || 'blog'}${post.fields.slug}`} itemProp="url">
              <li>
                <article
                  className="w-full border border-primary-blue rounded-xl px-5 py-3 transform hover:scale-105 transition-transform duration-200"
                  itemScope
                >
                  <header>
                    <h2>
                      <span itemProp="headline" className="font-bold text-3xl text-primary-blue">{title}</span>
                    </h2>
                    <span className="mt-2 text-gray-700 dark:text-gray-200">{post.frontmatter.date}</span>
                  </header>
                  <section>
                    <p
                      className="mt-3 italic text-gray-600 dark:text-gray-100"
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            </Link>
          )
        })}
      </ol>
    </Layout >
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
  }
`
