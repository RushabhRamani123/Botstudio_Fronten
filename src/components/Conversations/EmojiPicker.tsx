import { Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "../ui/button";

export default function EmojiPicker({onSelectEmoji}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectEmoji, setSelectEmoji] = useState([]); 
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSelectEmoji = (emoji) => {
    onSelectEmoji(emoji.native); 
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
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
        <div 
          ref={pickerRef}
          className="absolute bottom-12 right-0 z-50"
        >
          <Picker
            theme={'light'}
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
}