import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BlogContent } from './BlogContent'
import { BackButton } from '@/components/ui/BackButton'

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) redirect('/blog')

  const related = await prisma.blogPost.findMany({
    where: { id: { not: post.id } },
    orderBy: { publishedAt: 'desc' },
    take: 2,
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <BackButton href="/blog" label="Back to Blog" />

      <div className="mt-6 flex items-center gap-3">
        <Badge variant="secondary">{post.topic}</Badge>
        <span className="text-sm text-gray-400">{post.readingTime} min read</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {post.title}
      </h1>

      <p className="mt-2 text-sm text-gray-400">
        Published{' '}
        {new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>

      <div className="mt-8">
        <BlogContent content={post.content} />
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900">Related Posts</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.id} href={`/blog/${r.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {r.topic}
                    </Badge>
                    <h3 className="font-semibold text-gray-900">{r.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">{r.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
