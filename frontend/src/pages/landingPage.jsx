import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <section className="min-h-screen bg-white flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-primary">Taskzen</h1>
        <div className="space-x-4">
          <a href="/login" className="text-primary font-medium hover:underline">
            Login
          </a>
          <a
            href="/signup"
            className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 max-w-2xl leading-tight">
          Organize your team’s tasks with <span className="text-primary">clarity</span> and
          <span className="text-primary"> control</span>.
        </h2>
        <p className="text-gray-600 max-w-xl mb-8">
          Taskzen helps you track projects, assign tasks, collaborate easily, and boost productivity.
        </p>
        <div className="space-x-4">
          <a
            href="/signup"
            className="bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-primary/90 transition"
          >
            Start for Free
          </a>
          <a
            href="/login"
            className="text-primary border border-primary px-6 py-3 rounded-lg text-lg hover:bg-primary hover:text-white transition"
          >
            Login
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Taskzen. All rights reserved.
      </footer>
    </section>
    </div>
  )
}

export default LandingPage
