import { supabase } from '@/lib/supabase'

export default async function TestDB() {
  // Test connection by fetching tables
  const { data: providers, error: providersError } = await supabase
    .from('providers')
    .select('*')
    .limit(5)

  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('*')
    .limit(5)

  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .limit(5)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Providers Table:</h2>
          {providersError ? (
            <p className="text-red-500">Error: {providersError.message}</p>
          ) : (
            <pre className="text-xs">{JSON.stringify(providers, null, 2)}</pre>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Services Table:</h2>
          {servicesError ? (
            <p className="text-red-500">Error: {servicesError.message}</p>
          ) : (
            <pre className="text-xs">{JSON.stringify(services, null, 2)}</pre>
          )}
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold">Users Table:</h2>
          {usersError ? (
            <p className="text-red-500">Error: {usersError.message}</p>
          ) : (
            <pre className="text-xs">{JSON.stringify(users, null, 2)}</pre>
          )}
        </div>
      </div>
    </div>
  )
}
