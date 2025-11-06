import { useAtom } from "jotai";
import { helpActiveAtom } from "../../atoms/helpAtom";

export default function HelpOverlay() {
  const [helpActive] = useAtom(helpActiveAtom);
//     const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//     navigator.userAgent
//   ) || window.innerWidth < 768;
  const isMobile = window.innerWidth < 768;  
  if (!helpActive) return null;

  if (isMobile) {
    return (<div className="pointer-events-none select-none z-50" style={{ fontFamily: "'gaegu', sans-serif" }}>
      <div className="fixed top-[100px] right-[100px] text-4xl text-black p-3">
        Please view in desktop for best experience
      </div>
    </div>)
  } else {
    return (
        <div className="pointer-events-none select-none z-50" style={{ fontFamily: "'gaegu', sans-serif" }}>
        <div className="absolute top-60 rotate-16 right-70 text-4xl text-black p-3 max-w-xs">
            Click on the book to view main portfolio content.
        </div>

        <div className="absolute -rotate-12 top-28 left-112 text-black text-4xl p-3 max-w-xs">
            Click on laptop to interact with the terminal.
        </div>

        <div className="absolute whitespace-pre-wrap top-23 right-134 text-2xl text-black p-3 max-w-3xs">
            Click      on the lamp to         change the lighting    color.
        </div>

        <div className="absolute bottom-130 left-40 -rotate-20 text-4xl text-black p-3 max-w-xs">
            Click on the headphones for music. (coming soon)
        </div>
        <div className="absolute top-130 -right-37 rotate-90 text-4xl text-black p-3">
            Scroll to change views.
        </div>
        </div>
    );}
}
