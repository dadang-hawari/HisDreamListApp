import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookSolidIcon from "./assets/icons/book-solid.svg?react";
import { useNavigate } from "react-router-dom";

export default function DreamInput() {
  const [dreams, setDreams] = useState(() => {
    const storedDreams = localStorage.getItem("dreams");
    return storedDreams ? JSON.parse(storedDreams) : [];
  });
  const navigate = useNavigate();

  const addItem = (newDream) => {
    if (newDream.dream.trim()) {
      const updatedDreams = [...dreams, newDream];
      localStorage.setItem("dreams", JSON.stringify(updatedDreams));

      setDreams(updatedDreams);
      setTimeout(() => {
        toast.success("Dream berhasil ditambahkan");
      }, 100);
      return navigate("/");
    } else {
      toast.error("Mohon untuk mengisi field");
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto rounded-sm mt-10 pb-5 px-5">
      <div className="text-center font-bold mb-3 text-2xl">InputDreams</div>
      <form>
        <div className="relative border border-gray-300 p-5 rounded-md">
          <div className="bg-blue-cst absolute p-[14px] rounded-s-sm">
            <BookSolidIcon width="12" />
          </div>
          <input
            type="text"
            className="border outline-none w-full indent-10 border-gray-300 rounded-sm px-2 py-2 text-black  focus:border focus:border-blue-cst"
            name="dream"
            placeholder="Input Dream"
          />
          <button
            type="submit"
            className="bg-blue-cst w-full mt-5 rounded-sm p-2"
            onClick={(e) => {
              e.preventDefault();
              const dream = e.target.form.elements.dream.value;
              const isDreamAchieved = false;
              addItem({
                id: Date.now(),
                dream,
                isDreamAchieved,
              });
              e.target.form.elements.dream.value = "";
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer autoClose={1200} />
    </div>
  );
}
