import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Content from './Pages/Content'
import AuthPage from './Pages/AuthPage'

export default function App() {
    const Authenticated = useSelector(state => state.auth.isLogedIn)
    return (
        <>
            {
                !Authenticated && <Routes>
                    && <Route path='*' element={<Navigate to='/login' />} />
                    && <Route path='/login' element={<AuthPage />} />
                </Routes>
            }
            {
                Authenticated && <Routes>
                    && <Route path='*' element={<Navigate to='/' />} />
                    && <Route path='/' element={<Content />} />
                </Routes>
            }
        </>
    )
}
