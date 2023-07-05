import { ArrowUpToLine } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  if (!visible) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="outline"
      className="fixed bottom-4 right-4"
    >
      <ArrowUpToLine className={"h-6 w-6"} />
    </Button>
  );
}
