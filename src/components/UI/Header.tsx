import { useCamera } from "../../hooks/useCamera"

export default function Header() {
    const { currentView } = useCamera()

    return (
        <>
            <header>
                {currentView === 'side'  && (
                    <a href="/">
                        <img
                            src="/intro.gif"
                            alt="Welcome Text"
                            className="fixed m-4 top-0 left-1/2 transform -translate-x-1/2 w-[600px] z-20 hover:scale-110 transition-transform"
                        />
                    </a>
                )}
            </header>
        </>
    )
}
