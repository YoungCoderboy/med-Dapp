import React, { useState, useContext } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { auth, provider } from './firebase'
import { signInWithPopup } from 'firebase/auth'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authUser, setAuthUser] = useState(null)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign Out successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
        authUser,
        setAuthUser,
        userSignOut,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
