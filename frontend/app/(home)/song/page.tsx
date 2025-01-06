'use client';
import AddSongDialog from '@/components/AddSongDialog';
import SongTable from '@/components/SongTable';

const SongList = () => {
  return (
    <div className='flex flex-col justify-start items-center gap-8 '>
      <AddSongDialog />
      <SongTable />
    </div>
  );
};

export default SongList;
