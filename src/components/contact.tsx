'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function Contact() {
  // Contact information
  // TODO: fetch this from global json
  const contactInfo = {
    name: 'Ketan Shetye',
    email: 'shetyeketan18@gmail.com',
    phone: "+61- 430 006 738",
    handle: '@Ketan.Shetye',
    socials: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/ketan-shetye-769892133/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/ketan_shetye/',
      },
      {
        name: 'Github',
        url: 'hhttps://github.com/ketan0095',
      },
    ],
  };

  // Function to handle opening links
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto mt-8 w-full">
      <div className="bg-accent w-full overflow-hidden rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12">
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
            Contacts
          </h2>
          {/* <span className="mt-2 sm:mt-0">
            {contactInfo.handle}
          </span> */}

          <img
            src="profile_pic.jpeg" // Replace with your image path
            alt="Contact"
            className="mt-4 sm:mt-0 h-16 w-16 rounded-full object-cover border"
          />

        </div>

        {/* Email Section */}
        <div className="mt-8 flex flex-col md:mt-10">
          <div className="group mb-5 cursor-pointer flex justify-between items-center" onClick={() => openLink(`mailto:${contactInfo.email}`)}>
            <div className="flex items-center gap-1">
              <span className="text-base font-medium text-blue-500 hover:underline sm:text-lg">
                {contactInfo.email}
              </span>
              <ChevronRight className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            <span className="text-base font-medium text-gray-700 sm:text-lg">
              {contactInfo.phone}
            </span>
          </div>


          {/* Social Links */}
          <div className="flex flex-wrap justify-between items-center gap-y-5">
            {/* Social links on left */}
            <div className="flex flex-wrap gap-x-6 gap-y-5 sm:gap-x-8">
              {contactInfo.socials.map((social) => (
                <button
                  key={social.name}
                  className="text-muted-foreground hover:text-foreground cursor-pointer text-sm transition-colors"
                  onClick={() => openLink(social.url)}
                  title={social.name}
                >
                  {social.name}
                </button>
              ))}
            </div>

            {/* Download Resume button on right */}
            <button
              onClick={() => openLink('Ketan_Shetye_resume.pdf')} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              Download Resume
            </button>
          </div>

        </div>
      </div >
    </div >
  );
}

export default Contact;
