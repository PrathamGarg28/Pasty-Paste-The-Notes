import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
const ViewPaste = () => {
  const {id}=useParams();
  const allPastes= useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=> p._id === id)[0];
  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
      <input
        className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
        type='text' placeholder='Enter Title Here'
        value={paste.title}
        disabled
      />
      </div>
      <div>
        <textarea 
          className='rounded-2xl mt-4 min-w-[500px] p-4'
          value={paste.content} placeholder='Enter Content Here'
          rows={20} disabled
        />
      </div>
    </div>
  )
}
export default ViewPaste