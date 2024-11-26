import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "../utils/formatDate";
//import { Calendar, Copy, Eye, PencilLine, Search, Share, Trash2 } from "lucide-react";
import { Calendar, Copy, Eye, PencilLine, Search, Trash2 } from "lucide-react";

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
  // function handleShare(paste){
  //   const url =`${window.location.origin}/?pasteId=${paste?._id}`;
  //   navigator.clipboard.writeText(url);
  //   if(url) toast.success("URL Copied");
  //   else toast.error("Error");
  // }
  return (
    <div className="bg-slate-500 min-h-screen w-screen h-full">
      <div className=" w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className=" w-full flex gap-3 px-4 py-2 rounded-[0.3rem] mb-4 bg-white border border-[rgba(128,121,121,0.3)] mt-6">
        <input
          className="focus:outline-none  w-full bg-transparent"
          type="search"
          placeholder="Search Here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text=[20px] text-slate-500"/>
      </div>
      <div className=" flex flex-col rounded border border-[rgba(128,121,121,0.3)] pb-4">
        <h2 className=" px-4 text-4xl font-bold text-white border-b pb-4 border-[rgba(128,121,121,0
        3)]">
          All Pastes
        </h2>
        <div className=" w-full px-4 pt-4 flex flex-col  gap-y-5">
        {
          filteredData.length > 0 ? (
          filteredData.map((paste) =>  (
              // eslint-disable-next-line react/jsx-key
              <div className="border border-[rgba(128,121,121,0.3)] w-full bg-white gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]" key={paste?._id}>
                <div className=" w-[50%] flex flex-col space-y-3">
                  <p className="text-4xl text-slate-500 font-semibold">{paste?.title}</p>
                  <p className="text-mdfont-normal text-black line-clamp-3 max-w-[80%] text-[#707070]">{paste?.content}</p>
                </div>
                
                <div className="flex flex-col gap-y-4 text-slate-500 sm:items-end">
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button onClick={()=>handleEdit(paste)}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-slate-500">
                        <PencilLine className="text-black group-hover:text-blue-500" size={20}/>
                        Edit
                      </button>
                      <button onClick={()=>handleView(paste)}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-slate-500" >
                        <Eye className="text-black group-hover:text-orange-500" size={20}/>
                        View
                      </button>
                      <button onClick={()=>handleDelete(paste?._id)}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-slate-500">
                        <Trash2 className="text-black group-hover:text-pink-500" size={20} />
                        Delete
                      </button>
                      <button onClick={()=>{ navigator.clipboard.writeText(paste?.content)
                        toast.success("Copied to Clipboard")}}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-slate-500"
                        >
                        <Copy className="text-black group-hover:text-green-500" size={20}/>
                        Copy
                      </button>
                      {/* <button onClick={()=>handleShare(paste)}
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-slate-500"
                      >
                        <Share className="text-black group-hover:text-green-500" size={20}/>
                        Share
                      </button> */}
                  </div>
                  <div className=" gap-x-2 flex">
                  <Calendar className="text-black" size={20}/>
                  {FormatDate(paste.createdAt)}
                </div>
                </div>
                
              </div>
            
          ))
          )
          :(
            <div className="text-2xl text-center text-white w-full text-chileanFire-500">
                No Data Found
              </div>
          )}
      </div>
      </div>
    </div>
    </div>
  );
};
export default Paste;