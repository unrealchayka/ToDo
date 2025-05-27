
export default async function Post({ params }) {
  const decodedSlug = decodeURIComponent(params.slug);

  return <div className="h-full text-[20px]">Post ID: <span className="text-green-500 ml-10 text-[16px]">{decodedSlug}</span></div>;
}