'use client';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const getCharacterById = async (id: string) => {
  const res = await fetch(`/api/character/${id}`);
  if (!res.ok) return null;
  return res.json();
};

const CharacterDetailPage = ({ params }: { params: { id: string } }) => {
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const characterData = await getCharacterById(params.id);
      if (!characterData) {
        notFound();
      } else {
        setCharacter(characterData.data);
      }
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (!character) return <div className="text-white text-center mt-10">Character not found</div>;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return {
          bg: 'bg-green-600',
          border: 'border-green-500',
          shade: 'bg-green-950',
        };
      case 'dead':
        return {
          bg: 'bg-red-600',
          border: 'border-red-500',
          shade: 'bg-red-950',
        };
      default:
        return {
          bg: 'bg-gray-600',
          border: 'border-gray-500',
          shade: 'bg-gray-800',
        };
    }
  };

  const statusColor = getStatusColor(character.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-zinc-800 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
      
        {/* Profile Image */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
          <img
            src={character.image}
            alt={character.name}
            className={`w-full h-full object-cover rounded-full border-4 ${statusColor.border} shadow-md`}
          />
          <span
            className={`absolute bottom-2 right-2 text-white text-xs md:text-sm px-3 py-1 rounded-full ${statusColor.bg} shadow`}
          >
            {character.status?.toUpperCase()}
          </span>
        </div>

        {/* Character Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold text-center md:text-left">{character.name}</h1>

          <div className="grid grid-cols-2 gap-4">
            <LabelValue
              label="STATUS"
              value={character.status}
              bgColor={statusColor.bg}
              valueBg={statusColor.shade}
            />
            <LabelValue label="GENDER" value={character.gender} />
            <LabelValue label="SPECIES" value={character.species} />
            <LabelValue label="ORIGIN" value={character.origin?.name} />
            <LabelValue label="LOCATION" value={character.location?.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LabelValue = ({
  label,
  value,
  bgColor = 'bg-zinc-700',
  valueBg = 'bg-zinc-900',
}: {
  label: string;
  value: string;
  bgColor?: string;
  valueBg?: string;
}) => (
  <>
    <span className={`${bgColor} text-xs md:text-sm font-semibold px-3 py-1 rounded-lg text-white text-center`}>
      {label}
    </span>
    <span className={`${valueBg} text-xs md:text-sm px-3 py-1 rounded-lg text-white text-center`}>
      {value}
    </span>
  </>
);

export default CharacterDetailPage;
