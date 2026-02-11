import { supabase } from '@/lib/supabase'

export default async function TestSupabase() {
  let connectionStatus = 'Testing connection...'
  let tables = []
  let error = null

  try {
    // Test basic connection
    const { data, error: tablesError } = await supabase
      .from('providers')
      .select('*')
      .limit(1)
    
    if (tablesError) {
      error = tablesError.message
      connectionStatus = 'Connection successful but table query failed'
    } else {
      connectionStatus = 'Connected successfully!'
      
      // Get all tables
      const { data: tablesData } = await supabase
        .from('providers')
        .select('count(*)', { count: 'exact', head: true })
      
      tables = [
        { name: 'providers', status: data ? 'exists' : 'missing' }
      ]
    }
  } catch (e) {
    error = e.message
    connectionStatus = 'Connection failed'
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="bg-gray-100 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
        <p className={connectionStatus.includes('success') ? 'text-green-600' : 'text-red-600'}>
          {connectionStatus}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Database Info</h2>
        <p className="mb-2">
          <strong>URL:</strong> {process.env.NEXT_SERVICE_SUPABASE_URL || 'Not set'}
        </p>
        <p>
          <strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set'}
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600">
          If you see "relation does not exist" error, run the SQL setup script in your Supabase dashboard.
        </p>
      </div>
    </div>
  )
}