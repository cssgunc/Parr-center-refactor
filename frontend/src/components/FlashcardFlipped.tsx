// Flashcard component with 3D flip effect
// Utilizes global styles defined in index.css for 3D flip effect

import { useState } from "react";

export default function FlashcardFlipped(props: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-full perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white border rounded-lg shadow-md p-4">
          <p className="text-3xl font-bold text-gray-800">{props.front}</p>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center bg-gray-100 border rounded-lg shadow-md p-4">
          <p className="text-gray-700">{props.back}</p>
        </div>
      </div>
    </div>
  );
}