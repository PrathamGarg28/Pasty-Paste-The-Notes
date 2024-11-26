import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {useState } from "react";
// eslint-disable-next-line react/prop-types
const ViewPaste = ({isDisabled}) => {
  const { id } = useParams();

  console.log(id)
  const [setValue] = useState("");
  const [lines, setLines] = useState(1);
  const handleTextChange = (e) => {
    const content = e.target.value;
    setValue(content);  // Update the textarea value
    const newLines = content.split("\n").length;  // Count number of new lines
    setLines(newLines);  // Update the number of lines
  };
  // Render line numbers dynamically based on the number of lines
  const renderLineNumbers = () => {
    let lineNumbers = [];
    for (let i = 1; i <= lines; i++) {
      lineNumbers.push(<div key={i}>{i}</div>);
    }
    return lineNumbers;
  };
  const pastes = useSelector((state) => state.paste.pastes);

  // Filter pastes based on search term (by title or content)
  const paste = pastes.filter((paste) => paste._id === id)[0];

  console.log("Paste->",paste);
  return (
    <div className="bg-slate-500 min-h-screen w-screen">
      <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="w-full text-black bg-white border border-input rounded-md p-2"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full bg-white rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center text-slate-500 transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to Clipboard");
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>

          <div className="w-full flex">
      <div className="flex">
        <div
          id="line-numbers"
          className="w-8 bg-neutral-2 dark:bg-black dark:text-white text-right pr-2 text-sm rounded-l-[0.5rem] pt-2 max-h-[620px] overflow-auto border border-r-0 border-input scrollbar-hide"
        >
          {renderLineNumbers()}
        </div>
      </div>
      <textarea
        className={`flex min-h-[80px] text-white rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-0 ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        } bg-neutral-2 dark:bg-black w-full border-l-0 rounded-l-none focus-visible:ring-0`}
        placeholder="Write Your Content Here...."
        rows="25"
        value={paste.content}
        onChange={handleTextChange}
        readOnly={isDisabled} // Use readOnly to prevent editing but allow events
      ></textarea>
    </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default ViewPaste;
