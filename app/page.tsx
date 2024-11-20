'use client';

import { useState, useEffect } from 'react';
import { useCustomWallet } from '@/contexts/CustomWallet';
import { createClient } from '@supabase/supabase-js';
import ProfilePopover from '@/components/ProfilePopover';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

interface Event {
  id: number;
  created_at: string;
  event_title: string;
  admin_id: number;
}

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { isConnected } = useCustomWallet();

  const currentUserId = 1;

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: events, error } = await supabase.from('events').select('*');

      if (error) {
        setError(error);
        console.error('Error fetching events:', error);
      } else {
        setEvents((events as Event[]) || []);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };

  if (error) {
    return <div>Error loading events</div>;
  }

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='w-full flex items-center justify-between relative mb-10'>
        <h1 className='text-3xl font-bold'>Photo Booth Events</h1>
        <div className='flex items-center gap-2'>
          {isConnected && (
            <a
              href='/addEvent'
              className='flex items-center justify-center rounded-md text-sm text-white bg-gray-500 p-2'
            >
              + Event
            </a>
          )}

          <ProfilePopover />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {events.length > 0 &&
          events.map((e) => (
            <a
              href={`photos/${e.id}`}
              key={e.id}
              className='w-full rounded-md text-white bg-black py-6 px-6 mb-4 text-center'
            >
              {isConnected && e.admin_id === currentUserId && (
                <Button
                  onClick={(e) => handleDeleteEvent(e)}
                  className='cursor-pointer'
                >
                  <TrashIcon />
                </Button>
              )}
              <p>{e.event_title.toUpperCase()}</p>
            </a>
          ))}
      </div>
    </main>
  );
};

export default HomePage;
