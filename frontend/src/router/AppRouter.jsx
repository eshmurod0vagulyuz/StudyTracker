import { Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

import ScreenOne from '../pages/onboarding/ScreenOne'
import ScreenTwo from '../pages/onboarding/ScreenTwo'
import ScreenThree from '../pages/onboarding/ScreenThree'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/dashboard/Dashboard'
import AllTasks from '../pages/tasks/AllTasks'
import AddTask from '../pages/tasks/AddTask'
import TaskDetails from '../pages/tasks/TaskDetails'
import StatisticsPage from '../pages/statistics/StatisticsPage'
import Profile from '../pages/profile/Profile'
import Achievements from '../pages/profile/Achievements'
import StudyHistory from '../pages/history/StudyHistory'

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

export default function AppRouter() {
  const onboarded = localStorage.getItem('onboarded')

  return (
    <Routes>
      <Route path="/" element={<Navigate to={onboarded ? '/login' : '/onboarding/1'} replace />} />
      <Route path="/onboarding/1" element={<ScreenOne />} />
      <Route path="/onboarding/2" element={<ScreenTwo />} />
      <Route path="/onboarding/3" element={<ScreenThree />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/tasks" element={<PrivateRoute><AllTasks /></PrivateRoute>} />
      <Route path="/tasks/add" element={<PrivateRoute><AddTask /></PrivateRoute>} />
      <Route path="/tasks/:id" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
      <Route path="/statistics" element={<PrivateRoute><StatisticsPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/profile/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><StudyHistory /></PrivateRoute>} />
    </Routes>
  )
}
