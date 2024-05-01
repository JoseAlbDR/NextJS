import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About page',
  description: 'About info',
  keywords: ['About Page'],
};

const AboutPage = () => {
  return <div className="text-7xl">AboutPage</div>;
};

export default AboutPage;
