import { useEffect, useState } from "react";
import TrashSolidIcon from "./assets/icons/trash-solid.svg?react";
import PenSolidIcon from "./assets/icons/pen-solid.svg?react";
import MagnifyingGlassIcon from "./assets/icons/magnifying-glass-solid.svg?react";
import { Flip, ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function HisDreamListApp() {
  const [dreams, setDreams] = useState(() => {
    const storedDreams = localStorage.getItem("dreams");
    return storedDreams ? JSON.parse(storedDreams) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editedDream, setEditedDream] = useState("");
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [isToastShown, setIsToastShown] = useState(false);

  useEffect(() => {
    setFilteredDreams(dreams);
    localStorage.setItem("dreams", JSON.stringify(dreams));
  }, [dreams]);

  const updateFilteredDreams = (data) => {
    const filtered = dreams.filter((item) =>
      typeof data === "boolean"
        ? item.isDreamAchieved === data
        : item.dream.toLowerCase().includes(data.trim().toLowerCase())
    );
    setFilteredDreams(filtered);
  };

  const editItem = (index, updatedDream) => {
    if (updatedDream.dream.trim()) {
      const updatedDreams = [...dreams];
      updatedDreams[index] = {
        ...updatedDream,
      };

      setDreams(updatedDreams);
      toast.success("Dream berhasil diupdate");
      setEditedDream("");
      setEditIndex(null);
      return;
    }
    toast.error("Mohon untuk mengisi field");
    setEditedDream("");
  };

  const setDreamAchieved = (index, isComeTrue) => {
    const updatedDreams = [...dreams];
    updatedDreams[index].isDreamAchieved = isComeTrue;
    setDreams(updatedDreams);
  };

  const removeAllDreams = () => {
    if (dreams.length === 0) {
      toastify("Seluruh dreams sudah kosong", "info");
    } else if (confirm("Apakah anda yakin ingin menghapus seluruh dreams?")) {
      setDreams([]);
      toastify("Seluruh dreams dihapus", "success");
    }
  };

  const removeAllAchievedDreams = () => {
    if (dreams.filter((dream) => dream.isDreamAchieved).length === 0) {
      toastify("Seluruh achieved dreams sudah kosong", "info");
      return;
    } else if (
      confirm("Apakah anda yakin ingin menghapus seluruh achieved dreams?")
    ) {
      const allAchieveDreams = dreams.filter(
        (dream) => dream.isDreamAchieved === false
      );
      setDreams(allAchieveDreams);
      toastify("Seluruh achieved dreams dihapus", "success");
    }
  };
  const removeDream = (index) => {
    if (confirm("Apakah anda ingin menghapus dream ini?")) {
      toast.success("Berhasil Menghapus");
      setEditIndex(null);
      setDreams(dreams.filter((_, i) => i !== index));
    }
  };

  const toastify = (message, type = "default") => {
    if (!isToastShown) {
      const toastOptions = {
        hideProgressBar: true,
        closeOnClick: true,
        theme: "light",
        transition: Flip,
      };

      if (type === "success") {
        toast.success(message, toastOptions);
      } else if (type === "error") {
        toast.error(message, toastOptions);
      } else if (type === "info") {
        toast.info(message, toastOptions);
      } else {
        toast(message, toastOptions);
      }

      setIsToastShown(true);

      setTimeout(() => {
        setIsToastShown(false);
      }, 700);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto rounded-sm mt-10 py-2 pb-5 pt-3 px-2 ">
      <ToastContainer
        autoClose={1000}
        theme="light"
        className={"text-sm max-w-[275px] right-0 max-sm:max-w-full"}
        position="top-right"
        pauseOnHover={false}
      />
      <div className="max-w-[650px] mx-auto text-sm">
        <h1 className="font-bold text-2xl text-center">HisDreamList</h1>
        <form
          className="border border-gray-300 p-5 rounded-sm my-4 flex justify-around gap-x-14 text-white max-sm:flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            const searchData = e.target.searchDreams.value;
            updateFilteredDreams(searchData);
          }}
        >
          <div className="relative max-w-[350px] w-full max-sm:max-w-full">
            <div className="bg-blue-cst absolute p-[10px] rounded-s-sm ">
              <MagnifyingGlassIcon width="16" height="16" />
            </div>
            <input
              type="text"
              className="border outline-none w-full indent-9 border-gray-300 rounded-sm px-2 h-9 text-black focus:border focus:border-blue-cst"
              name="searchDreams"
              placeholder="Search Dreams"
            />
            <button
              type="submit"
              className="bg-blue-cst w-full mt-5 rounded-sm p-1 h-9"
            >
              Search
            </button>
          </div>
          <Link
            to={"/input-dream"}
            className="bg-blue-cst rounded-sm p-2 self-end max-w-[170px] w-full font-light text-center max-sm:max-w-full max-sm:mt-4"
          >
            Add New Dream
          </Link>
        </form>

        <div>
          <h2 className="text-center font-medium text-2xl">DreamList</h2>
          <div className="text-white flex justify-between gap-x-3 my-4">
            <button
              className="btn-blue-cst"
              onClick={() => {
                setFilteredDreams(dreams);

                toastify("Menampilkan Semua", "success");
              }}
            >
              Semua
            </button>
            <button
              className="btn-blue-cst"
              onClick={() => {
                updateFilteredDreams(true);
                toastify("🏆 Menampilkan Sudah Tercapai ");
              }}
            >
              Tercapai
            </button>
            <button
              className="btn-blue-cst"
              onClick={() => {
                updateFilteredDreams(false);
                toastify("❌ Menampilkan Belum Tercapai");
              }}
            >
              Belum
            </button>
          </div>
        </div>

        <ul className="flex flex-col gap-y-3 mt-10">
          {filteredDreams.length > 0 ? (
            filteredDreams.map((item, index) => (
              <li
                key={item.id}
                className="border border-gray-300 flex justify-between items-center rounded-md p-3 text-base "
              >
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedDream}
                      className="border-[1px] border-gray-300 outline-none ps-1 py-1 max-w-48 w-full me-16 "
                      onChange={(e) => setEditedDream(e.target.value)}
                    />
                    <div className="flex gap-x-4">
                      <button
                        onClick={() => {
                          editItem(index, {
                            ...item,
                            dream: editedDream,
                          });
                        }}
                        className="bg-blue-cst rounded-sm text-white p-1 w-16"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditedDream("");
                          setEditIndex(null);
                        }}
                        className="bg-blue-cst rounded-sm text-white p-1 w-16"
                      >
                        Batal
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span
                      className={`max-w-50 w-full mx-2 ps-1 ${
                        item.isDreamAchieved ? "line-through text-red-cst" : ""
                      }`}
                    >
                      {item.dream}
                    </span>
                    <div className="flex gap-x-4 items-center mr-4">
                      <input
                        type="checkbox"
                        className="checkbox-custom"
                        name="isDreamAchieved"
                        checked={item.isDreamAchieved}
                        onChange={(e) => {
                          setDreamAchieved(index, e.target.checked);
                        }}
                      />
                      <button
                        onClick={() => {
                          setEditedDream(item.dream);
                          setEditIndex(index);
                        }}
                      >
                        <PenSolidIcon height="14" className="fill-yellow-cst" />
                      </button>

                      <button onClick={() => removeDream(index)}>
                        <TrashSolidIcon height="14" className="fill-red-cst" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <span className="text-red-cst text-1xl text-center">
              Tidak Ada Dream . . . .
            </span>
          )}
        </ul>
        <div className="flex justify-between gap-x-11 mt-4">
          <button
            className="btn-red-cst"
            onClick={() => removeAllAchievedDreams()}
          >
            Delete Achieved Dreams
          </button>

          <button
            className="btn-red-cst"
            onClick={() => {
              removeAllDreams();
            }}
          >
            Delete All Dreams
          </button>
        </div>
      </div>
    </div>
  );
}
