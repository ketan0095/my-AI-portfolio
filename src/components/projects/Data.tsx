import Image from 'next/image';
import { Image as Img } from 'lucide-react';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { url } from 'inspector';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'Nak3D',
    description:
      "NAK3D is an AI-driven Web3 platform that lets creators monetize and manage digital assets with zero coding—just natural language commands for everything from NFTs to gated communities. It's all about smooth, automated blockchain workflows and making Web3 super accessible!",
    techStack: [
      'Next.js',
      'TailwindCSS',
      'Web3.js',
      'Stable Diffusion Upcaler',
      'Segment Anything Model (SAM, by Meta AI)',
      'Meshy AI | InstantMesh |Unique3D',
      'Blender Python API',

    ],
    date: '2024',
    links: [
      {
        name: 'website',
        url: 'https://www.nak3d.xyz/',
      },
      {
        name: 'Launch Video',
        url: 'https://www.youtube.com/watch?v=GLVmny6vRxU',
      },
      {
        name: 'X',
        url: 'https://x.com/nak3d_xyz',
      },
      {
        name:'Instagram',
        url:'https://www.instagram.com/nak3d_xyz/'
      },
      {
        name: 'Technical Video',
        url: 'https://www.youtube.com/watch?v=UIi7lLTrJq4',
      },
      {
        name:'LinkedIn',
        url:'https://www.linkedin.com/company/nak3d'
      },
      {
        name: 'Usage tutorial',
        url: 'https://www.youtube.com/watch?v=UIi7lLTrJq4',
      }
    ],
    images: [
      {
        src: '/nak3d_1.png',
        alt: 'Nak3d landing page',
      },
      {
        src: '/nak3d_3.png',
        alt: 'Nak3d Process',
      }
      ,
      {
        src: '/nak3d_2.png',
        alt: 'Nak3d Partners',
      }
    ],
  },
  {
    title: 'MachineAgent',
    description:
      "Machine Agents AI by AskGalore enables businesses to deploy 3D AI Human Agents for sales, service & operations across industries",
    techStack: ['Python','GenAI','Voice AI','Langchain','RAG','Pinecone','Fast API','Python','Next.js','MongoDB'],
    date: '2024',

    links: [
      {
        name: 'website',
        url: 'https://machineagents.ai',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/machine-agents/about/',
      },
    ],
    images: [
      {
        src: '/MA_1.png',
        alt: 'MA landing page',
      },
      {
        src: '/MA_2.png',
        alt: 'MA Bot page',
      },
      {
        src: '/MA_2.png',
        alt: 'MA Support',
      },
      {
        src: '/MA_4.png',
        alt: 'MA Pricing',
      },
    ],
  },
  {
    title: 'Defai',
    description:
      "We Win ETHOXford hackathon by building DEFAI. DEFAI stands for Decentralized Finance Artificial Intelligence. It's an AI-powered chat interface that simplifies on-chain operations on the Avalanche blockchain by allowing users to interact using natural language. This makes complex DeFi operations accessible even for those with limited technical expertise.",
    techStack: [
      'Next.js',
      'TailwindCSS',
      'shadcn-ui',
      'Vercel AI SDK',
      'TypeScript',
    ],
    date: '2025',
    links: [
      {
        name: 'website',
        url: 'https://dorahacks.io/buidl/22605',
      },
      {
        name: 'github',
        url: 'https://github.com/toukoum/DEFAI',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7299337190151483392/',
      },
      {
        name: 'Youtube Video',
        url: 'https://www.youtube.com/watch?v=N9O7los4-ng&t=34s&ab_channel=Toukoum',
      }
    ],
    images: [
      {
        src: '/defai1.png',
        alt: 'Landing Page of Defai',
      },
      {
        src: '/defai2.png',
        alt: 'Confirmation popup of Defai',
      },
      {
        src: '/defai3.png',
        alt: 'Chatbot of Defai',
      },
      {
        src: '/defai4.jpeg',
        alt: 'Winner team',
      },
    ],
  },
  {
    title: 'Fitgear',
    description:
      'Won the Gotta Go Hack IA by building Fitgear, a virtual voice seller accessible by QR code to improve the ratio between customers and sellers. Created an AI pipeline with API calls and a RAG system for natural language interactions.',
    techStack: ['Next.js', 'TailwindCSS', 'OpenAI API', 'Langchain'],
    date: '2024',
    links: [
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/posts/raphael-giraud-60939519a_hackathon-innovation-sporttech-activity-7210399263774674946-qSXq?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAC6vwikBVSEkS7XWktWS7y6GR3GHwAlKslc',
      },
    ],
    images: [
      {
        src: '/fitgear2.png',
        alt: 'Fitgear chatbot',
      },
      {
        src: '/fitgear1.png',
        alt: 'Fitgear landing page',
      },
    ],
  },
  {
    title: 'Datai',
    description:
      "DATAI is an AI-powered agent that lets non-technical users query a database using natural language without writing SQL. Built using Next.js, TailwindCSS, shadcn-ui, and Anthropic's Claude API, this project focuses on simplicity, speed, and user-friendly design.",
    techStack: [
      'Next.js',
      'TailwindCSS',
      'shadcn-ui',
      'Claude API',
      'TypeScript',
    ],
    date: '2024',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/datai',
      },
      {
        name: 'Youtube Video Demo',
        url: 'https://youtu.be/iE0RXjdbQsw',
      }
    ],
    images: [
      {
        src: '/datai1.png',
        alt: 'Datai landing page',
      },
      {
        src: '/datai2.png',
        alt: 'Datai chatbot',
      },
      {
        src: '/datai3.png',
        alt: 'Datai chatbot',
      },
      {
        src: '/datai4.png',
        alt: 'Datai chatbot',
      }
    ],
  },
  {
    title: '3d Pong Game',
    description:
      "Transcendance is the final project of my 42 cursus. It's a 3D pong game with multiplayer capabilities, user authentication, and real-time gameplay. We had to do everything from scratch, so it was pretty challenging and we learned a lot.",
    techStack: ['Django', 'Python', 'JavaScript', 'Websockets', 'PostgreSQL', 'Docker', 'Nginx', 'Web3', 'Solidity'],
    date: '2023',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/Transcendance',
      },
    ],
    images: [
      {
        src: '/trans1.png',
        alt: 'Transcendance landing page',
      },
      {
        src: '/trans2.png',
        alt: 'Transcendance game',
      },
      {
        src: '/trans3.png',
        alt: 'Transcendance game',
      },
      {
        src: '/trans4.png',
        alt: 'Transcendance game',
      },
      {
        src: '/trans5.png',
        alt: 'Transcendance game',
      },
      {
        src: '/trans6.png',
        alt: 'Transcendance game',
      }

    ],
  },
  {
    title: 'Minishell',
    description:
      "Minishell is a project that aims to create a simple shell. It's a great introduction to process creation and management in C, offering fundamental Unix command-line functionality. This was a very challenging project, but I learned a lot from it.",
    techStack: ['C', 'Unix', 'Bash'],
    date: '2023',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/Michelle-42',
      },
    ],
    images: [
      {
        src: '/minishell1.png',
        alt: 'Minishell landing page',
      }
    ],
  },
  {
    title: 'YouBot',
    description:
      'YouBot is a Python Bot that Scrapes Videos from Pexels, adds a random song from a Songs Folder, then auto-uploads the videos to your YouTube Channel for continuous content generation.',
    techStack: ['Python', 'YouTube API', 'Pexels API'],
    date: '2022',
    links: [
      {
        name: "YouTube Video",
        url: "https://youtu.be/vp1v5mBG7rA "
      },
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/YouBot',
      }
    ],
    images: [
      {
        src: '/youbot1.jpg',
        alt: 'Youbot landing page',
      },
      {
        src: '/youbot2.png',
        alt: 'Youbot chatbot',
      },
    ],
  },
  {
    title: 'Old Portfolio',
    description:
      'My previous traditional portfolio built with vanilla HTML, CSS and JS with GSAP animations for a smooth and interactive user experience.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    date: '2022',
    links: [
      {
        name: 'Website',
        url: 'https://toukoum.github.io/oldPortfolio/',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/toukoum/portfolio',
      },
    ],
    images: [
      {
        src: '/oldport1.png',
        alt: 'Old Portfolio landing page',
      },
      {
        src: '/oldport2.png',
        alt: 'Old Portfolio projects',
      }
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string }[];
}

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectData.links.map((link, index) => (
                <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            ))}
          </div>
        </div>
      )}

      {/* Images gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main data export with updated content
export const data = [
  

  // Voice AI platform
  {
    category: 'Voice AI Agent',
    title: 'MachineAgent',
    src: '/MA_preview.png',
    content: <ProjectContent project={{ title: 'Rrate' }} />,
  },
  {
    category: 'Startup Project',
    title: 'Nak3D',
    src: '/nak3d_preview.png',
    content: <ProjectContent project={{ title: 'Nak3D' }} />,
  },
  {
    category: 'Hackathon Winner',
    title: 'Defai',
    src: '/defaipreview.png',
    content: <ProjectContent project={{ title: 'Defai' }} />,
  },
  {
    category: 'Hackathon Winner',
    title: 'Fitgear',
    src: '/fitgearpreview.png',
    content: <ProjectContent project={{ title: 'Fitgear' }} />,
  },
  {
    category: 'Business Intelligence',
    title: 'Datai',
    src: '/dataipreview.png',
    content: <ProjectContent project={{ title: 'Datai' }} />,
  },
  {
    category: '42 Project',
    title: '3d Pong Game',
    src: '/transcendancepreview.png',
    content: <ProjectContent project={{ title: '3d Pong Game' }} />,
  },
  {
    category: '42 Project',
    title: 'Minishell',
    src: '/minishellpreview.png',
    content: <ProjectContent project={{ title: 'Minishell' }} />,
  },
  {
    category: 'Automation',
    title: 'YouBot',
    src: '/youbotpreview.png',
    content: <ProjectContent project={{ title: 'YouBot' }} />,
  },
  {
    category: 'Web Development',
    title: 'Old Portfolio',
    src: '/oldportfoliopreview.png',
    content: <ProjectContent project={{ title: 'Old Portfolio' }} />,
  },
];
