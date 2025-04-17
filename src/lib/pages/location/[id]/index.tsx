'use client';
import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';

// ฟังก์ชันดึงข้อมูลสถานที่ตาม id
const getLocationById = async (id: string) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch location');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
};

// คอมโพเนนต์แสดงรายละเอียดสถานที่
const LocationDetailPage = ({ params }: { params: { id: string } }) => {
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const locationData = await getLocationById(params.id);
      if (!locationData) {
        setError('Location not found');
        notFound(); // ใช้ฟังก์ชันจาก next/navigation
      } else {
        setLocation(locationData);
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Location Details</h1>

        <div className="space-y-6">
          <Row label="NAME" value={location.name} />
          <Row label="TYPE" value={location.type || 'Unknown'} />
          <Row label="DIMENSION" value={location.dimension || 'Unknown'} />
          <Row
            label="RESIDENTS"
            value={
              location.residents?.length > 0 ? (
                <ResidentAvatars residents={location.residents} />
              ) : (
                <p>No residents found</p>
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
      <span className=" text-black font-semibold">{label}</span>
    </div>
    <div className="flex-grow bg-green-800 text-white px-4 py-3 rounded">
      {value}
    </div>
  </div>
);

// คอมโพเนนต์แสดงอวตารของผู้อยู่อาศัย
const ResidentAvatars = ({ residents }: { residents: string[] }) => {
  const [avatars, setAvatars] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const avatarUrls = await Promise.all(
          residents.map(async (residentUrl) => {
            const characterId = residentUrl.split('/').pop();
            const res = await fetch(`/api/character/${characterId}`);
            if (!res.ok) throw new Error('Failed to fetch character data');
            const data = await res.json();
            return data.data.image;
          })
        );
        setAvatars(avatarUrls);
      } catch (error) {
        setError('Error fetching avatars');
        console.error('Error fetching avatars:', error);
      }
    };

    fetchAvatars();
  }, [residents]);

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <div className="flex gap-2 flex-wrap justify-start">
      {avatars.length > 0 ? (
        avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Resident Avatar ${index + 1}`}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full hover:ring-4 hover:ring-green-500 transition-all duration-300"
          />
        ))
      ) : (
        <span>No avatars available</span>
      )}
    </div>
  );
};

export default LocationDetailPage;
