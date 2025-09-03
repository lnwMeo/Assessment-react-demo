const StickyFooter = () => {
  return (
    <footer className="fixed  w-full z-20 bottom-0 start-0  backdrop-blur-sm text-center text-sm py-2">
      © {new Date().getFullYear()} ASM NRRU. All rights reserved.
    </footer>
  )
}
export default StickyFooter