import { useAtom } from "jotai";
import { helpActiveAtom } from "../../atoms/helpAtom";
import { useCamera } from "../../hooks/useCamera";

export default function Footer() {
    const { currentView } = useCamera();
    const [helpActive, setHelpActive] = useAtom(helpActiveAtom);

    return (
        <>
        <footer style={{ fontFamily: "'gaegu', sans-serif" }}>
            {currentView === "side" && (
                <>
                {/* Help button */}
                <div className="relative">
                    <img
                    src="/new_vinyl_help.gif"
                    alt="Help"
                    className="fixed m-4 bottom-0 left-10 transform -translate-x-1/2 w-[60px] z-20 hover:scale-110 transition-transform cursor-pointer"
                    onMouseEnter={() => setHelpActive(true)}
                    onMouseLeave={() => setHelpActive(false)}
                    />
                    {helpActive && (
                    <div className="fixed bottom-18 left-14 -translate-x-1/2 text-2xl text-black text-center z-20">
                        Help
                    </div>
                    )}
                </div>

                {/* GitHub */}
                <div className="relative">
                    <a href="https://github.com/ngaurama">
                    <img
                        src="/github_done.gif"
                        alt="Github Logo"
                        className="fixed m-4 bottom-0 left-30 transform -translate-x-1/2 w-[60px] z-20 hover:scale-110 transition-transform"
                    />
                    </a>
                    {helpActive && (
                    <div className="fixed bottom-18 left-34 -translate-x-1/2 text-2xl text-black text-center z-20">
                        GitHub
                    </div>
                    )}
                </div>

                {/* Mail */}
                <div className="relative">
                    <a href="mailto:hello@ngaurama.com">
                    <img
                        src="/mail_done.gif"
                        alt="Mail Logo"
                        className="fixed m-4 bottom-0 left-50 transform -translate-x-1/2 w-[70px] z-20 hover:scale-110 transition-transform"
                    />
                    </a>
                    {helpActive && (
                    <div className="fixed bottom-18 left-54 -translate-x-1/2 text-2xl text-black text-center z-20">
                        Mail
                    </div>
                    )}
                </div>
                </>
            )}
        </footer>
        </>
    );
}
