// import { useCamera } from "../../hooks/useCamera"

// export default function Doodles() {
//   const { currentView } = useCamera()

//   return (
//     <>
//       {currentView === 'side' && (
//         <>
//           <img
//             src="/computer_black.gif"
//             alt="Computer Doodle"
//             title="Hello, World!"
//             style={{
//               position: 'fixed',
//               top: '120px',
//               left: '120px',
//               width: '200px',
//               zIndex: 20,
//               transform: 'rotate(-20deg)'
//             }}
//             className="hover:scale-110 transition-transform"
//           />

//           <img
//             src="/notes.gif"
//             alt="Music notes"
//             style={{
//               position: 'fixed',
//               bottom: '80px',
//               left: '20px',
//               width: '150px',
//               zIndex: 20,
//               transform: 'rotate(20deg)'
//             }}
//           />

//           <img
//             src="/sisyphus.gif"
//             alt="Sisyphus moving the boulder"
//             title="One must imagine..."
//             style={{
//               position: 'fixed',
//               bottom: '-5px',
//               right: '-5px',
//               width: '150px',
//               zIndex: 20
//             }}
//           />

//           <img
//             src="/guitar_face_again.gif"
//             alt="Guitar dude"
//             title="AC/DC? More like... AD/HD"
//             style={{
//               position: 'fixed',
//               top: '80px',
//               right: '40px',
//               width: '100px',
//               zIndex: 20,
//               transform: 'rotate(20deg) scaleX(-1)'
//             }}
//             className="hover:scale-110 transition-transform"
//           />
//         </>
//       )}
//     </>
//   )
// }

// import { useCamera } from "../../hooks/useCamera"

// export default function Doodles() {
//   const { currentView } = useCamera()

//   // Desktop dimensions you designed for
//   const desktopWidth = 1710
//   const desktopHeight = 1112


//   // Scale factor based on current window
//   const scaleX = window.innerWidth / desktopWidth
//   const scaleY = window.innerHeight / desktopHeight
//   const scale = Math.min(scaleX, scaleY)
//   return (
//     <>
//       {currentView === 'side' && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: `${desktopWidth}px`,
//             height: `${desktopHeight}px`,
//             pointerEvents: 'none',
//             transform: `scale(${scale})`,
//             transformOrigin: 'top left',
//             zIndex: 20,
//           }}
//         >
//           <img
//             src="/computer_black.gif"
//             alt="Computer Doodle"
//             title="Hello, World!"
//             style={{
//               position: 'absolute',
//               top: '120px',
//               left: '120px',
//               width: '200px',
//               transform: 'rotate(-20deg)',
//             }}
//             className="hover:scale-110 transition-transform"
//           />

//           <img
//             src="/notes.gif"
//             alt="Music notes"
//             style={{
//               position: 'absolute',
//               bottom: '80px',
//               left: '20px',
//               width: '150px',
//               transform: 'rotate(20deg)',
//             }}
//           />

//           <img
//             src="/sisyphus.gif"
//             alt="Sisyphus moving the boulder"
//             title="One must imagine..."
//             style={{
//               position: 'absolute',
//               bottom: '-5px',
//               right: '-65px',
//               width: '150px',
//             }}
//             className="hover:scale-110 transition-transform"
//           />

//           <img
//             src="/guitar_face_again.gif"
//             alt="Guitar dude"
//             title="AC/DC? More like... AD/HD"
//             style={{
//               position: 'absolute',
//               top: '80px',
//               right: '10px',
//               width: '100px',
//               transform: 'rotate(15deg) scaleX(-1)',
//             }}
//             className="hover:scale-110 transition-transform"
//           />
//         </div>
//       )}
//     </>
//   )
// }

import { useCamera } from "../../hooks/useCamera"
export default function Doodles() {
    const { currentView } = useCamera()
    
    return (
        <>
            {currentView === 'side'  && (
                <>
                    <img
                        src="/computer_black.gif"
                        alt="Computer Doodle"
                        title="Hello, Wordl!"
                        className="fixed m-4 top-30 left-40 -rotate-20 transform -translate-x-1/2 w-[200px] z-20 hover:scale-110 transition-transform"
                    />
                    {/* <img
                        src="/sudo_black.gif"
                        alt="sudo rm -rf /"
                        title="I even have a shirt with this"
                        className="fixed m-4 bottom-80 -right-30 rotate-20 transform -translate-x-1/2 w-[300px] z-20 hover:scale-110 transition-transform"
                    /> */}
                    <img
                        src="/notes.gif"
                        alt="Music notes"
                        className="fixed m-4 bottom-0 left-20 rotate-20 transform -translate-x-1/2 w-[150px] z-20 transition-transform"
                    />
                    <img
                        src="/sisyphus.gif"
                        alt="Sisyphus moving the boulder"
                        title="One must imagine..."
                        className="fixed m-4 -bottom-5 -right-24 transform -translate-x-1/2 w-[150px] z-20 transition-transform"
                        // className="fixed m-4 top-40 -right-24 transform -translate-x-1/2 w-[150px] z-20 transition-transform"
                    />
                    <img
                        src="/guitar_face_again.gif"
                        alt="Guitar dude"
                        title="AC/DC? More like... AD/HD"
                        className="fixed m-4 top-20 -right-10 rotate-20 scale-x-[-1] transform -translate-x-1/2 w-[100px] z-20 hover:scale-110 transition-transform"
                    />
                </>
            )}
        </>
    )
}
