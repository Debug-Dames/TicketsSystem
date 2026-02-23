// import { Navigate, Route, Routes } from 'react-router-dom'
// import Layout from './components/Layout.jsx'
// import ProtectedRoute from './components/ProtectedRoute.jsx'
// import AgentDashboard from './pages/AgentDashboard.jsx'
// import Dashboard from './pages/Dashboard.jsx'
// import ForgotPassword from './pages/ForgotPassword.jsx'
// import Login from './pages/Login.jsx'
// import MyTickets from './pages/MyTickets.jsx'
// import Register from './pages/Register.jsx'
// import Reports from './pages/Reports.jsx'
// import Settings from './pages/Settings.jsx'
// import CreateTicket from './pages/CreateTicket.jsx'
// import UserDashboard from './pages/UserDashboard.jsx'

// function App() {
//   return (
//     // <Routes>
//     //   <Route path='/' element={<Navigate to='/login' replace />} />
//     //   <Route path='/login' element={<Login />} />
//     //   <Route path='/forgot-password' element={<ForgotPassword />} />
//     //   <Route path='/register' element={<Register />} />
//     //   <Route
//     //     element={
//     //       <ProtectedRoute>
//     //         <Layout />
//     //       </ProtectedRoute>
//     //     }
//     //   >
//     //     <Route path='/dashboard' element={<Dashboard />} />
//     //     <Route path='/my-tickets' element={<MyTickets />} />
//     //     <Route path='/reports' element={<Reports />} />
//     //     <Route path='/settings' element={<Settings />} />
//     //     <Route path='/user' element={<Navigate to='/user-dashboard' replace />} />
//     //     <Route path='/agent' element={<Navigate to='/agent-dashboard' replace />} />
//     //     <Route
//     //       path='/user-dashboard'
//     //       element={
//     //         <ProtectedRoute role='user'>
//     //           <UserDashboard />
//     //         </ProtectedRoute>
//     //       }
//     //     />
//     //     <Route
//     //       path='/agent-dashboard'
//     //       element={
//     //         <ProtectedRoute role='support'>
//     //           <AgentDashboard />
//     //         </ProtectedRoute>
//     //       }
//     //     />
//     //     <Route
//     //       path='/create-ticket'
//     //       element={
//     //         <ProtectedRoute role='user'>
//     //           <CreateTicket />
//     //         </ProtectedRoute>
//     //       }
//     //     />
//     //   </Route>
//     //   <Route path='*' element={<Navigate to='/login' replace />} />
//     // </Routes>

//     <Routes>
//       <Route path="/" element={<Navigate to="/login" replace />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected routes */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Role-specific dashboards */}
//         <Route
//           path="/user-dashboard"
//           element={
//             <ProtectedRoute role="user">
//               <UserDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/agent-dashboard"
//           element={
//             <ProtectedRoute role="support">
//               <AgentDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Other protected routes */}
//         <Route
//           path="/my-tickets"
//           element={
//             <ProtectedRoute>
//               <MyTickets />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/reports" element={<Reports />} />
//         <Route path="/settings" element={<Settings />} />
//         <Route
//           path="/create-ticket"
//           element={
//             <ProtectedRoute role="user">
//               <CreateTicket />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* Catch-all */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>

//   )
// }

// export default App;


import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AgentDashboard from './pages/AgentDashboard.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import MyTickets from './pages/MyTickets.jsx'
import CreateTicket from './pages/CreateTicket.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import Toast from './components/Toast.jsx'

function App() {
  return (
    <ToastProvider>
      <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected routes */}
      <Route element={<Layout />}>
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute role="support">
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-tickets"
          element={
            <ProtectedRoute>
              <MyTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute role="user">
              <CreateTicket />
            </ProtectedRoute>
          }
        />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toast />
    </ToastProvider>
  )
}

export default App