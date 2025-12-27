export default function ScreenLoader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* thin bar / skeleton / shimmer */}
    </div>
  );
}
