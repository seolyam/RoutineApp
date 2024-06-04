import { useState } from "react";

interface AddTodoFormProps {
  onSubmit: (title: string) => void;
}

export default function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    onSubmit(input);
    setInput("");
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Do this next!"
        className="rounded-s-md grow border border-black p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-[#716453] text-white hover:bg-[#7c6d5b] text-2xl"
      >
        +
      </button>
    </form>
  );
}
