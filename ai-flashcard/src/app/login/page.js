'use client'
import Header from "../components/Header"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()

    const accountLogIn = (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMessage('')

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed In
            router.push('/chat')
        })
        .catch((error) => {
            setErrorMessage(error.message)
            setLoading(false)
        })
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
        <main className="flex col-auto flex-col w-full bg-white h-full">
            <Header title={"Log In"} subtitle={"Log in to continue"} />
            <div>
                <div className="p-2 items-center flex w-1/2 m-auto justify-center">
                    <form onSubmit={accountLogIn}>
                        <input 
                            className="p-2 border focus:border-yellow-300 border-black rounded-md bg-gray-400 w-full mt-5" 
                            type="email" required
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            />
                        <input 
                            className="p-2 border focus:border-yellow-300 border-black rounded-md bg-gray-400 w-full mt-5" 
                            type="password" required
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-yellow-500 hover:bg-yellow-600 rounded-md w-full p-2 mt-5">
                            {loading? "Logging in.. ": "Continue"}
                        </button>
                    </form>
                    {errorMessage && <p className="text-red-400 text-lg">{errorMessage}</p>}
                </div>
            </div>
        </main>
    )
}