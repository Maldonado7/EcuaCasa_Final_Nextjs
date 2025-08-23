import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogPost, getBlogPosts, getRelatedPosts } from '../../data/blog-posts'

// Utility function to format dates consistently on server and client
const formatDate = (date: Date): string => {
  // Use UTC methods to ensure consistent formatting across server and client
  const utcDate = new Date(date.getTime())
  return `${utcDate.getUTCDate()}/${utcDate.getUTCMonth() + 1}/${utcDate.getUTCFullYear()}`
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <span className="font-black text-xl">EcuaCasa</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/blog" className="text-gray-600 hover:text-purple-600 font-medium">
                ← Volver al Blog
              </Link>
              <Link href="/providers">
                <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                  Buscar Profesionales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-purple-600 hover:underline">Inicio</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/blog" className="text-purple-600 hover:underline">Blog</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            <span className="text-gray-600">{post.readTime} min de lectura</span>
            <span className="text-gray-400">•</span>
            <time className="text-gray-600">{post.publishedAtFormatted}</time>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-700 leading-relaxed">
            {post.excerpt}
          </p>
          
          {post.author && (
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-200">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {post.author.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          )}
        </header>

        {/* Hero Image - For now using gradient fallback until AI images are generated */}
        <div className="mb-10">
          <div className="h-80 rounded-2xl overflow-hidden relative" style={{
            background: post.category === 'Electricidad' ? 'linear-gradient(to bottom right, #fef3c7, #fcd34d)' :
                       post.category === 'Precios' ? 'linear-gradient(to bottom right, #dcfce7, #86efac)' :
                       post.category === 'Carpintería' ? 'linear-gradient(to bottom right, #f3e8ff, #c4b5fd)' :
                       post.category === 'Limpieza' ? 'linear-gradient(to bottom right, #e0f2fe, #7dd3fc)' :
                       post.category === 'Jardinería' ? 'linear-gradient(to bottom right, #f0fdf4, #bbf7d0)' :
                       post.category === 'Plomería' ? 'linear-gradient(to bottom right, #fef3c7, #fed7aa)' :
                       'linear-gradient(to bottom right, #f3f4f6, #d1d5db)'
          }}>
            {/* TODO: Replace with actual AI-generated images using prompts like:
                - Plumbing: "Professional plumbing tools arranged on workbench in modern workshop"  
                - Electricidad: "Modern residential electrical panel with safety equipment and testing tools"
                - Precios: "Calculator and invoices on desk with various home maintenance tools in background"
            */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl drop-shadow-lg">
                {post.category === 'Electricidad' ? '⚡' :
                 post.category === 'Precios' ? '💰' :
                 post.category === 'Carpintería' ? '🔨' :
                 post.category === 'Limpieza' ? '🧹' :
                 post.category === 'Jardinería' ? '🌱' :
                 post.category === 'Plomería' ? '🔧' : '📝'}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-blockquote:text-gray-600 prose-blockquote:border-purple-500"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-3xl">📚</span>
              Artículos Relacionados
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden h-full">
                    <div className="h-32 relative overflow-hidden" style={{
                      background: relatedPost.category === 'Electricidad' ? 'linear-gradient(to bottom right, #fef3c7, #fcd34d)' :
                                 relatedPost.category === 'Precios' ? 'linear-gradient(to bottom right, #dcfce7, #86efac)' :
                                 relatedPost.category === 'Carpintería' ? 'linear-gradient(to bottom right, #f3e8ff, #c4b5fd)' :
                                 relatedPost.category === 'Limpieza' ? 'linear-gradient(to bottom right, #e0f2fe, #7dd3fc)' :
                                 relatedPost.category === 'Jardinería' ? 'linear-gradient(to bottom right, #f0fdf4, #bbf7d0)' :
                                 'linear-gradient(to bottom right, #f3f4f6, #d1d5db)'
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl drop-shadow-lg">
                          {relatedPost.category === 'Electricidad' ? '⚡' :
                           relatedPost.category === 'Precios' ? '💰' :
                           relatedPost.category === 'Carpintería' ? '🔨' :
                           relatedPost.category === 'Limpieza' ? '🧹' :
                           relatedPost.category === 'Jardinería' ? '🌱' :
                           relatedPost.category === 'Plomería' ? '🔧' : '📝'}
                        </span>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="bg-purple-600/90 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {relatedPost.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-purple-600 font-medium mb-2">
                        {relatedPost.category}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <div className="text-xs text-gray-500">
                        {relatedPost.readTime} min
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas un Profesional?</h2>
          <p className="text-lg text-white/90 mb-6">
            Encuentra expertos verificados en {post.category.toLowerCase()} y otros servicios para tu hogar
          </p>
          <Link href="/providers">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all">
              Buscar Profesionales
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return {
      title: 'Artículo no encontrado - EcuaCasa Blog'
    }
  }

  return {
    title: `${post.title} - EcuaCasa Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: post.tags,
    }
  }
}