import { useCamera } from "../../hooks/useCamera"

export default function Footer() {
    const { currentView } = useCamera()

    return (
        <>
            <footer>
                {currentView === 'side'  && (
                    <>
                        <a href="#">
                            <img
                                src="/help_black.gif"
                                alt="Help Logo"
                                className="fixed m-4 bottom-0 left-10 transform -translate-x-1/2 w-[60px] z-20 hover:scale-110 transition-transform"
                            />
                        </a>
                        <a href="mailto:hello@ngaurama.com">
                            <img
                                src="/mail_black.gif"
                                alt="Mail Logo"
                                className="fixed m-4 bottom-0 right-10 transform -translate-x-1/2 w-[60px] z-20 hover:scale-110 transition-transform"
                            />
                        </a>
                        <a href="https://github.com/ngaurama">
                            <img
                                src="/github_black.gif"
                                alt="Github Logo"
                                className="fixed m-4 bottom-0 -right-8 transform -translate-x-1/2 w-[60px] z-20 hover:scale-110 transition-transform"
                            />
                        </a>
                    </>
                )}
            </footer>
        </>
    )
}
