'use client';

import { useState, useEffect } from 'react';
import { useCustomWallet } from '@/contexts/CustomWallet';
import { createClient } from '@supabase/supabase-js';
import PhotoBooth from '@/components/PhotoBooth';
import Loading from '@/components/Loading';
import ProfilePopover from '@/components/ProfilePopover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

interface Event {
  id: number;
  created_at: string;
  event_title: string;
  event_date: string;
  admin_id: number;
}

const PhotoBoothPage: React.FC = () => {
  const { isConnected, emailAddress } = useCustomWallet();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentAdminId, setCurrentAdminId] = useState<number | null>(null);
  const [currAdminsEvents, setCurrAdminsEvents] = useState<Event[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchCurrentAdmin = async () => {
      setIsLoading(true);

      const { data: admins, error } = await supabase
        .from('admins')
        .select('id')
        .eq('email', emailAddress);

      if (error) {
        setError(error);
        console.error('Error fetching admin info:', error);
      } else {
        if (admins.length > 0) setCurrentAdminId(admins[0].id);
      }

      setIsLoading(false);
    };

    fetchCurrentAdmin();
  }, [emailAddress]);

  useEffect(() => {
    const fetchCurrentAdminsEvents = async () => {
      setIsLoading(true);

      if (currentAdminId) {
        const { data: events, error } = await supabase
          .from('events')
          .select('*')
          .eq('admin_id', currentAdminId);

        if (error) {
          setError(error);
          console.error("Error fetching current admin's events:", error);
        } else {
          setCurrAdminsEvents((events as Event[]) || []);
        }
      }

      setIsLoading(false);
    };

    fetchCurrentAdminsEvents();
  }, [currentAdminId]);

  const handleSelectEvent = (e: string) => {
    const eNum = parseInt(e);
    const foundEvent = currAdminsEvents.filter((e) => e.id === eNum);
    localStorage.setItem('selectedEvent', JSON.stringify(foundEvent[0]));
    setSelectedEvent(foundEvent[0]);
  };

  if (error) {
    return <div>Error loading events</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!isConnected && !selectedEvent) {
    return (
      <main className='container mx-auto'>
        <div className='min-h-screen w-full flex items-center justify-center p-4 relative'>
          <ProfilePopover />
        </div>
      </main>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center ${
        selectedEvent ? 'bg-[url("/brand-image-walrus.png")] bg-cover' : ''
      }`}
    >
      <main className='container mx-auto px-4 py-8 flex flex-col w-full'>
        <div className='w-full flex items-center justify-center grow p-4'>
          {selectedEvent ? (
            <PhotoBooth
              selectedEventTitle={selectedEvent.event_title}
              selectedEventId={selectedEvent.id}
            />
          ) : (
            <>
              {currentAdminId && (
                <div className='flex flex-col items-center justify-center w-full gap-4'>
                  <ProfilePopover />
                  <Select onValueChange={handleSelectEvent}>
                    <SelectTrigger className='w-[280px]'>
                      <SelectValue placeholder='Select an Event' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {currAdminsEvents &&
                          currAdminsEvents.map((el: Event, index) => (
                            <SelectItem key={index} value={el.id.toString()}>
                              {el.event_title.toUpperCase()}&nbsp;/&nbsp;
                              {new Date(el.event_date).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                }
                              )}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PhotoBoothPage;
