// hooks/useScrollNavigation.ts
import { useEffect } from 'react'
import { useCamera } from './useCamera'


export function useScrollNavigation() {
  const { currentView, moveToFrontView, moveToSideView } = useCamera()

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault()

      if (currentView === "laptop") {
        if (event.deltaY < 10) {
          moveToFrontView()
        }
        return
      }

      if (event.deltaY > 10) moveToFrontView()
      else if (event.deltaY < -10) moveToSideView()
    }

    const canvas = document.querySelector("canvas")
    canvas?.addEventListener("wheel", handleScroll, { passive: false })

    return () => {
      canvas?.removeEventListener("wheel", handleScroll)
    }
  }, [currentView, moveToFrontView, moveToSideView])

  return {}
}
