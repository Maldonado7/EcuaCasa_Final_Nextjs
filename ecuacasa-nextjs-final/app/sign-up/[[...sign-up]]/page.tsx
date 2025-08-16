import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto mb-4">
            EC
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Únete a EcuaCasa</h1>
          <p className="text-gray-600">Crea tu cuenta para empezar</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm normal-case',
                card: 'shadow-none border-0',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
