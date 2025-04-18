export default function Loading({ large }) {
    return (
        <div className={`${large ? "w-screen h-screen flex items-center justify-center" : ""}`}>
            <div className={`animate-spin rounded-full border-2 border-t-transparent border-cs-blue-dark w-3 h-3 ${large ? "w-16 h-16 border-4" : ""}`}></div>
        </div>
    )
}