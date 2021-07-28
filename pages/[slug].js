import { MDXRemote } from "next-mdx-remote";
import { getFileBySlug, getFiles } from "../lib/mdx"
import  MDXComponents from "../Components/MDXComponents";

export default function Post({source, frontmatter}) {
  console.log(source)
  return <MDXRemote {...source} components={MDXComponents}  />
}
export async function getStaticProps({ params }) {
  const { source, frontmatter } = await getFileBySlug("posts", params.slug);

  return {
    props: {
      source,
      frontmatter: {
        slug: params.slug,
        ...frontmatter,
      },
    },
  };
}



export async function getStaticPaths() {
  const posts = await getFiles("posts");
  const paths = await posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
