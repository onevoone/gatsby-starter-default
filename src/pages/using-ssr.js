import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const UsingSSR = ({ serverData, ...rest }) => {
  console.log('serverData: ', serverData);
  console.log('rest: ', rest);

  return (
    <Layout>
      <Seo title="Using SSR" />
      <h1>
        This page is <b>rendered server-side</b>
      </h1>
      {serverData.data.map((item, k) => {
        return <div key={k}>
          <code>
            {JSON.stringify(item, null, 2)}
          </code>
          <br />
          <br />
        </div>

      })}
      <br />
      <br />
      <br />
      <p>
        This page is rendered server side every time the page is requested.
        Reload it to see a(nother) random photo from{" "}
        <code>dog.ceo/api/breed/shiba/images/random</code>:
      </p>
      <img
        style={{ width: "320px", borderRadius: "var(--border-radius)" }}
        alt="A random dog"
        src={serverData.message}
      />
      <p>
        To learn more, head over to our{" "}
        <a href="https://www.gatsbyjs.com/docs/reference/rendering-options/server-side-rendering/">
          documentation about Server Side Rendering
        </a>
        .
      </p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default UsingSSR

export async function getServerData() {
  try {
    const res = await fetch(`http://localhost:1337/api/pages`)
    if (!res.ok) {
      throw new Error(`Response failed`)
    }
    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
