'use client'
import { useState, useEffect } from "react"
import Header from "../components/Header"
import { useRouter } from "next/navigation"


export default function Register () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const accountSetup = (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage('')
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed Up
                router.push('/')
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setLoading(false)
            })
        } else {
            setErrorMessage("Passwords do not match")
            setLoading(false)
        }

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            router.push('/')
          }
        })
        return () => unsubscribe()
      }, [router])

    return (
        <main className="flex col-auto flex-col h-full w-full bg-white">
            <Header title={"Sign Up"} subtitle={"Create an account to continue"} />
            <div>
                <div className="p-1 items-center flex w-1/2 m-auto">
                    <form onSubmit={accountSetup}>
                        <input 
                            className="p-2 border focus:border-yellow-300 border-black rounded-md bg-gray-400 w-full mt-5" 
                            type="email" required
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        <input 
                            className="p-2 border focus:border-yellow-300 border-black rounded-md bg-gray-400 w-full mt-5" 
                            type="password" required
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                        <input
                            className="p-2 border focus:border-yellow-300 border-black rounded-md bg-gray-400 w-full mt-5" 
                            type="password" required    
                            placeholder="Enter your password again"
                            value={confirmPassword}
                            onChange={(e)=> setConfirmPassword(e.target.value)}
                            />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-yellow-500 hover:bg-yellow-600 rounded-md w-full p-2 mt-5">
                            {loading? "Signing up..." : "Continue"}
                        </button>    
                    </form>
                    {errorMessage && <p className="text-red-500 text-lg">{errorMessage}</p>}
                </div>
            </div>
        </main>
    )
}