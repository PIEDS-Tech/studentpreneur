/** The rocket motif from the deck backgrounds. */
export default function Rocket(props: React.SVGProps<SVGSVGElement> & { "data-drift"?: boolean }) {
  return (
    <svg viewBox="0 0 200 400" aria-hidden="true" focusable="false" {...props}>
      <path d="M100 0C150 60 168 150 160 250l34 70-12 48-46-46H64l-46 46-12-48 34-70C32 150 50 60 100 0z" />
      <circle cx="100" cy="150" r="26" fill="var(--rocket-window, transparent)" />
      <path d="M78 330h44l-6 36c-4 22-28 22-32 0z" opacity=".7" />
    </svg>
  );
}
