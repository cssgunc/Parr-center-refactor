// Flashcard component that displays front and back side by side

export default function FlashcardListed(props: { front: string; back: string }) {
    return (
      <div className="flex border rounded-lg shadow-md p-4 max-w-md mx-auto bg-white">
        <div className="flex-[2] flex items-center justify-center pr-4">
          <p className="text-2xl font-bold text-gray-800">{props.front}</p>
        </div>
        <div className="flex-1 flex items-center justify-center pl-4">
          <p className="text-gray-700">{props.back}</p>
        </div>
      </div>
    );
  }