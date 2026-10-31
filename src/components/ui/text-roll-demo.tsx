import TextRoll from "@/components/ui/text-roll";

const navigationItems = [
  { name: "Home" },
  { name: "Components" },
  { name: "Pricing" },
  { name: "How to use" },
  { name: "Account" },
  { name: "Login" },
];

export default function TextRollDemo() {
  return (
    <ul className="flex min-h-screen w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-4xl leading-[0.8] font-extrabold tracking-[-0.03em] uppercase transition-colors lg:text-5xl"
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
}
