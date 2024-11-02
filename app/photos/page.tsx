'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

interface Photo {
  id: number;
  created_at: string;
  blob_id: string;
  object_id: string;
  event: string | null;
  user: string | null;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('blob_id, object_id, event');

      if (error) {
        setError(error);
        console.error('Error fetching photos:', error);
      } else {
        setPhotos((data as Photo[]) || []);
      }
    };

    fetchPhotos();
  }, []);

  if (error) {
    return <div>Error loading photos</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Event</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div key={photo.blob_id} className="border rounded-lg p-4">
            <p className="text-sm mb-2">Blob ID: {photo.blob_id}</p>
            <p className="text-sm mb-2">Object ID: {photo.object_id}</p>
            <p className="text-sm">Event: {photo.event || 'No event specified'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
