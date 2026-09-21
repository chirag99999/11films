import gsap from "gsap";

export function expandFilmThumbnail(
  imgElement: HTMLImageElement,
  onNavigate: () => void
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    onNavigate();
    return;
  }

  const rect = imgElement.getBoundingClientRect();
  const clone = document.createElement("img");
  clone.src = imgElement.currentSrc || imgElement.src;
  clone.alt = "";

  Object.assign(clone.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    objectFit: "cover",
    zIndex: "80",
    pointerEvents: "none",
  });

  document.body.appendChild(clone);

  gsap
    .timeline()
    .to(clone, {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      duration: 0.95,
      ease: "power4.inOut",
    })
    .call(onNavigate)
    .to(clone, {
      opacity: 0,
      duration: 0.6,
      delay: 0.35,
      ease: "power2.out",
      onComplete: () => clone.remove(),
    });
}
