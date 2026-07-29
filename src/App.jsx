import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// Route-level code splitting: each page ships as its own chunk, so
// visiting /assignments never downloads the Dashboard's chart.js
// bundle (and vice versa). Layout stays eager since it's needed for
// every route.
const Home = lazy(() => import('./pages/Home.jsx'))
const Assignments = lazy(() => import('./pages/Assignments.jsx'))
const AddAssignment = lazy(() => import('./pages/AddAssignment.jsx'))
const EditAssignment = lazy(() => import('./pages/EditAssignment.jsx'))
const Calendar = lazy(() => import('./pages/Calendar.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function RouteFallback() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/assignments/new" element={<AddAssignment />} />
          <Route path="/assignments/:id/edit" element={<EditAssignment />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
