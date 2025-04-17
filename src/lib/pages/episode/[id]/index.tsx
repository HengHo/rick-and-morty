'use client';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

// ฟังก์ชันดึงข้อมูลตอนตาม id
const getEpisodeById = async (id: string) => {
  const res = await fetch(`/api/episode/${id}`);
  if (!res.ok) return null;
  return res.json();
};

const EpisodeDetailPage = ({ params }: { params: { id: string } }) => {
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const episodeData = await getEpisodeById(params.id);
      if (!episodeData) {
        setError('Episode not found');
        notFound(); // ถ้าไม่เจอตัวละครให้ไปหน้าผลลัพธ์ 404
      } else {
        setEpisode(episodeData.data);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="spinner-border animate-spin border-4 border-t-4 border-green-600 w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 font-semibold text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl p-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Episode Details</h1>

        <div className="space-y-6">
          <Row label="NAME" value={episode.name} />
          <Row label="AIR DATE" value={episode.air_date || 'Unknown'} />
          <Row label="EPISODE CODE" value={episode.episode || 'Unknown'} />
          <Row
            label="CHARACTERS"
            value={
              episode.characters?.length > 0 ? (
                <CharacterAvatars characters={episode.characters} />
              ) : (
                <p>No characters found</p>
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

// คอมโพเนนต์แสดงแต่ละแถวของข้อมูล
const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row items-center gap-4">
    <div className="flex-none w-full md:w-1/3 bg-green-600 px-4 py-3 rounded">
      <span className="text-black font-semibold">{label}</span>
    </div>
    <div className="flex-grow bg-green-800 text-white px-4 py-3 rounded">
      {value}
    </div>
  </div>
);

// คอมโพเนนต์แสดงรูปโปรไฟล์ของตัวละคร
const CharacterAvatars = ({ characters }: { characters: string[] }) => {
  const [avatars, setAvatars] = useState<string[]>([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const avatarUrls = await Promise.all(
          characters.map(async (characterUrl) => {
            const res = await fetch(characterUrl);
            if (!res.ok) throw new Error('Failed to fetch character data');
            const data = await res.json();
            return data.image; // ดึง URL ของรูปโปรไฟล์จากข้อมูลตัวละคร
          })
        );
        setAvatars(avatarUrls);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, [characters]);

  return (
    <div className="flex gap-2 flex-wrap justify-start">
      {avatars.length > 0 ? (
        avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Character Avatar ${index + 1}`}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full hover:ring-4 hover:ring-green-500 transition-all duration-300"
          />
        ))
      ) : (
        <span>No avatars available</span>
      )}
    </div>
  );
};

export default EpisodeDetailPage;
