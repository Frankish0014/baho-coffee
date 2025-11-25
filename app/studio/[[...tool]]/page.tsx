/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 * 
 * NOTE: Sanity Studio is currently disabled. Install Sanity packages to enable:
 * npm install sanity @sanity/vision next-sanity
 */

export const dynamic = 'force-static'

export default function StudioPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Sanity Studio</h1>
        <p className="text-gray-600">Sanity packages are not installed.</p>
        <p className="text-sm text-gray-500 mt-2">
          Run: <code className="bg-gray-100 px-2 py-1 rounded">npm install sanity @sanity/vision next-sanity</code>
        </p>
      </div>
    </div>
  )
}
