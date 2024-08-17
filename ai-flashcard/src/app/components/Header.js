
export default function Header ({ title, subtitle }) {
    return (
        <main className="p-10 bg-yellow-200 text-black w-full text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-lg p-2">{subtitle}</p>
        </main>
    )
}