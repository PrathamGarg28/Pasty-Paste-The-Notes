import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId));
  }
  function handleView(paste){
    navigate(`/pastes/${paste?._id}`)
  }
  function handleEdit(paste){
    navigate(`/?pasteId=${paste?._id}`)
  }
  function handleShare(paste){
    const url =`${window.location.origin}/?pasteId=${paste?._id}`;
    navigator.clipboard.writeText(url);
    if(url) toast.success("URL Copied");
    else toast.error("Error");
  }
  return (
    <div>
      <input
        className=" p-2 rounded-2xl min-w-[500px] mt-2 pl-4"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                    <button onClick={()=>handleEdit(paste)}>Edit</button>
                    <button onClick={()=>handleView(paste)}>View</button>
                    <button onClick={()=>handleDelete(paste?._id)}>Delete</button>
                    <button onClick={()=>{ navigator.clipboard.writeText(paste?.content)
                      toast.success("Copied to Clipboard")}}>
                      Copy
                    </button>
                    <button onClick={()=>handleShare(paste)}>Share</button>
                </div>
                <div>{paste.createdAt.split("T")}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Paste;