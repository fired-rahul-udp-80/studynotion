import { useEffect, useRef } from "react"

function CursorScrollEffect({ children, className = "" }) {
  const effectRef = useRef(null)

  useEffect(() => {
    const effect = effectRef.current
    if (!effect) return undefined

    const updatePointer = (event) => {
      const bounds = effect.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width) * 100
      const y = ((event.clientY - bounds.top) / bounds.height) * 100
      const tiltX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -4
      const tiltY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4

      effect.style.setProperty("--cursor-x", `${x}%`)
      effect.style.setProperty("--cursor-y", `${y}%`)
      effect.style.setProperty("--tilt-x", `${tiltX}deg`)
      effect.style.setProperty("--tilt-y", `${tiltY}deg`)
      effect.classList.add("cursor-scroll-effect--active")
    }

    const resetPointer = () => {
      effect.classList.remove("cursor-scroll-effect--active")
      effect.style.setProperty("--tilt-x", "0deg")
      effect.style.setProperty("--tilt-y", "0deg")
    }

    effect.addEventListener("pointermove", updatePointer)
    effect.addEventListener("pointerleave", resetPointer)

    return () => {
      effect.removeEventListener("pointermove", updatePointer)
      effect.removeEventListener("pointerleave", resetPointer)
    }
  }, [])

  return (
    <div ref={effectRef} className={`cursor-scroll-effect ${className}`}>
      <div className="cursor-scroll-effect__glow" aria-hidden="true" />
      <div className="cursor-scroll-effect__content">{children}</div>
    </div>
  )
}

export default CursorScrollEffect