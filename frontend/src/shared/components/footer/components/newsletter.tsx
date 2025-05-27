'use client';

import { useState } from 'react';
import { TextInput, Button, Text } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
//import axios from 'axios';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      setStatus('loading');
      //await axios.post('/api/subscribe', { email });
      setStatus('success');
      setMessage('Thanks for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Subscription failed. Try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Text fz={{ base: 20, sm: 32 }} c="white" className="playfair-display font-semibold">
        Subscribe to our newsletter
      </Text>
      <div className="flex gap-2">
        <TextInput
          placeholder="Enter your email"
          icon={<IconMail size={18} />}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="flex-1"
        />
        <Button onClick={handleSubscribe} loading={status === 'loading'}>
          Subscribe
        </Button>
      </div>
      {message && <Text c={status === 'success' ? 'green' : 'red'}>{message}</Text>}
    </div>
  );
}
