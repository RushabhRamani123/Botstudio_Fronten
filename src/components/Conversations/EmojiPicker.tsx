import { Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "../ui/button";
import { EmojiThing,EmojiPickerProps } from "./ChatDTO";
const EmojiPicker = ({ onSelectEmoji }: EmojiPickerProps) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSelectEmoji = (emoji: EmojiThing) => {
    console.log(emoji);
    onSelectEmoji(emoji.native);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        className="hover:bg-gray-200"
        onClick={() => setPickerOpen(!pickerOpen)}
      >
        <Smile className="h-4 w-4" />
      </Button>

      {pickerOpen && (
        <div ref={pickerRef} className="absolute bottom-12 right-0 z-50">
          <Picker
            theme="light"
            data={data}
            onEmojiSelect={handleSelectEmoji}
            previewPosition="none"
            skinTonePosition="none"
            perLine={8}
            maxFrequentRows={1}
          />
        </div>
      )}
    </div>
  );
};
export default EmojiPicker;