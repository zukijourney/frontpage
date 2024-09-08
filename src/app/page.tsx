'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { StarryBackground } from '@/components/ui/StarryBackground'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronDown, Github, ExternalLink, Zap, Users, Code, Sparkles, Menu, Home, Briefcase, UserCircle2 } from 'lucide-react'
import { motion, AnimatePresence, useAnimation, HTMLMotionProps } from 'framer-motion'
import Balance from "react-wrap-balancer"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
type MotionDivProps = HTMLMotionProps<"div">
type MotionH1Props = HTMLMotionProps<"h1">
const ScrollSpy = () => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg">
      <ul className="flex space-x-4 px-4 py-2">
        <ScrollSpyItem id="home" active={activeSection === 'home'} icon={<Home size={20} />} />
        <ScrollSpyItem id="projects" active={activeSection === 'projects'} icon={<Briefcase size={20} />} />
        <ScrollSpyItem id="team" active={activeSection === 'team'} icon={<UserCircle2 size={20} />} />
      </ul>
    </nav>
  )
}

const ScrollSpyItem = ({ id, active, icon }: { id: string; active: boolean; icon: React.ReactNode }) => (
  <li>
    <Link href={`#${id}`}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "rounded-full p-2",
          active && "bg-primary text-primary-foreground"
        )}
      >
        {icon}
        <span className="sr-only">{id}</span>
      </Button>
    </Link>
  </li>
)

const MobileMenu = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="fixed top-4 right-16 z-50">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription>
          Navigate through our site
        </SheetDescription>
      </SheetHeader>
      <nav className="flex flex-col space-y-4 mt-4">
        <Link href="#home" className="text-lg font-medium">Home</Link>
        <Link href="#projects" className="text-lg font-medium">Projects</Link>
        <Link href="#team" className="text-lg font-medium">Team</Link>
        <Link href="https://discord.gg/zukijourney" className="text-lg font-medium">Join Discord</Link>
        <Link href="https://github.com/zukijourney" className="text-lg font-medium">GitHub</Link>
      </nav>
    </SheetContent>
  </Sheet>
)

const PageHeader = React.memo(({ className, children, ...props }: MotionDivProps) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={cn(
      "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20",
      className
    )}
    {...props}
  >
    {children}
  </motion.section>
))

const PageHeaderHeading = React.memo(({ className, ...props } : MotionH1Props ) => (
  <motion.h1
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className={cn(
      "text-center text-3xl font-bold leading-tight tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1]",
      className
    )}
    {...props}
  />
))

const PageHeaderDescription = React.memo(({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <Balance
      className={cn(
        "max-w-[750px] text-center text-lg sm:text-xl md:text-2xl font-light text-muted-foreground",
        className
      )}
      {...props}
    />
  </motion.div>
))

const PageActions = React.memo(({ className, ...props }: MotionDivProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className={cn(
      "flex w-full flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-4 md:pb-10",
      className
    )}
    {...props}
  />
))

const AnimatedLink = React.memo(({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  const controls = useAnimation()

  const handleHover = useCallback(() => {
    controls.start({ scale: 1.05, transition: { duration: 0.2 } })
  }, [controls])

  const handleHoverEnd = useCallback(() => {
    controls.start({ scale: 1, transition: { duration: 0.2 } })
  }, [controls])

  return (
    <motion.div
      animate={controls}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  )
})

export default function IndexPage() {
  return (
    <div className="relative min-h-screen">
      <StarryBackground />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <MobileMenu />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <section id="home" className="min-h-screen flex items-center justify-center">
          <PageHeader>
            <AnimatedLink
              href="https://discord.gg/zukijourney"
              className="group inline-flex items-center px-0.5 text-sm sm:text-base font-medium text-primary hover:text-primary-focus transition-colors duration-200"
            >
              <span className="underline-offset-4 group-hover:underline">
                From one Zuki to a Journey.
              </span>
            </AnimatedLink>
            <PageHeaderHeading>Welcome to the Future of AI Integration</PageHeaderHeading>
            <PageHeaderDescription>
              zukijourney: Your gateway to a world where AI meets creativity, community, and innovation. 
              Embark on a journey where artificial intelligence seamlessly integrates with human interaction.
            </PageHeaderDescription>
            <PageActions>
              <AnimatedLink href="https://discord.gg/zukijourney">
                <Button size="lg" className="w-full sm:w-auto">Join Our Discord</Button>
              </AnimatedLink>
              <AnimatedLink href="https://github.com/zukijourney">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore our Github Organization
                </Button>
              </AnimatedLink>
            </PageActions>
          </PageHeader>
        </section>
        <ProjectsSection />
        <TeamSection />
        <CTASection />
        <Footer />
      </div>
      <ScrollSpy />
    </div>
  )
}

const ProjectsSection = React.memo(() => {
  return (
    <section id="projects" className="space-y-12 mt-24">
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Groundbreaking Projects
      </motion.h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <ProjectCard
          icon={<Code />}
          title="zukijourney-api"
          description="One of the largest and oldest continuously operating freemium multi AI API on Discord."
          link="https://docs.zukijourney.com/ai"
          github='https://github.com/zukijourney/api-oss'
        />
        <ProjectCard
          icon={<Users />}
          title="zukijourney-bots"
          description="AI-powered bots serving 50,000+ users across 3000+ servers, including zuki.gm and zuki.time."
          link="https://docs.zukijourney.com/bots"
          github='https://github.com/zukijourney/bots-docs'
        />
        <ProjectCard
          icon={<Sparkles />}
          title="CAS (Cool AI Stuff)"
          description="Uncensored benchmarks and showcase of free-to-use AI APIs on Discord."
          link="https://cas.zukijourney.com"
          github="https://github.com/zukixa/cool-ai-stuff"
        />
        <ProjectCard
          icon={<Zap />}
          title="Project ORNE"
          description="A secretive project set to revolutionize AI integration. Coming 9/25/2024."
          comingSoon
        />
      </motion.div>
    </section>
  )
})

interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  github?: string;
  comingSoon?: boolean;
}

const ProjectCard = React.memo(({ icon, title, description, link, github, comingSoon }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center">
          {icon}
          <CardTitle className="ml-2 text-base sm:text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 flex-grow">
          <CardDescription className="text-sm sm:text-base mb-4">{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 sm:p-6">
          {comingSoon ? (
            <p className="text-muted-foreground text-sm">Coming Soon</p>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
              {link && (
                <AnimatedLink href={link}>
                  <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                    <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> See for yourself!
                  </Button>
                </AnimatedLink>
              )}
              {github && (
                <AnimatedLink href={github}>
                  <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                    <Github className="mr-2 h-3 w-3 sm:h-4 sm:w-4" /> See the Github
                  </Button>
                </AnimatedLink>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
})

const TeamSection = React.memo(() => {
  const teamMembers = [
    { name: "zukixa", role: "CEO", url: "https://cdn.discordapp.com/avatars/325699845031723010/3eb13f80d44c05a0f94e9fd0151e2fbd.webp?size=4096", githubUrl: "https://github.com/zukixa" },
    { name: "thatluvinhasguy", role: "CTO", url: "https://cdn.discordapp.com/avatars/881961145236353056/d4216d644564b3ce3e307a8a018a41ce.webp?size=4096", githubUrl: "https://github.com/ThatLukinhasGuy" },
    { name: "aunchers", role: "CSO", url: "https://cdn.discordapp.com/avatars/800718471935557663/757dd08a5230de37efa9dac13665cd2a.webp?size=4096", githubUrl: 'https://github.com/Aunchers'},
    { name: "thorn_ike", role: "Chief RP Officer", url: "https://cdn.discordapp.com/avatars/345275472764076032/a_bf1f4d4e0e7b999c2196fc2ca75c155d.gif?size=4096", githubUrl: 'https://github.com/thorn_ike'},
    { name: "prostoleander", role: "Executive", url: "https://cdn.discordapp.com/avatars/829858497746305024/316127131824b4400e9f333232ba4440.webp?size=4096", githubUrl: "https://github.com/henceiusegentoo" },
    { name: "sabsterrexx", role: "Executive", url: "https://cdn.discordapp.com/avatars/864267600070836284/05a70ff902393fe693fd1a56a2257835.webp?size=4096", githubUrl: 'https://github.com/sabsterrexx'},
    { name: "voidiiii", role: "Executive", url: "https://cdn.discordapp.com/avatars/821328725643100172/5acd5ef1d04c44ff2ed3777abc80597a.webp?size=4096", githubUrl: 'https://github.com/void6670'},
    { name: "lunaiiii", role: "Executive", url: "https://cdn.discordapp.com/avatars/868795530493431868/1a9992096ad3b8a53d787b1ee5985af5.webp?size=4096", githubUrl: 'https://github.com/zukixa'},
  ];

  return (
    <section id="team" className="space-y-12 mt-24">
      <motion.h2 
        className="text-3xl sm:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meet Our Visionary Team
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-center text-sm sm:text-base md:text-lg">
          Connect with our team members on our <AnimatedLink href="https://discord.gg/zukijourney" className="text-primary hover:underline">Discord server</AnimatedLink>
        </p>
      </motion.div>
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {teamMembers.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </motion.div>
    </section>
  )
})

interface TeamMemberProps {
  name: string;
  role: string;
  url?: string;
  githubUrl?: string;
}

const TeamMember = React.memo(({ name, role, url, githubUrl }: TeamMemberProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-2 sm:p-4 bg-gradient-to-r from-primary to-accent">
          <Avatar className="w-16 h-16 sm:w-24 sm:h-24 mx-auto border-4 border-background">
            <AvatarImage src={url} alt={name} />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="text-center p-2 sm:p-4">
          <h3 className="font-bold text-sm sm:text-base">@{name}</h3>
          <p className="text-muted-foreground text-xs sm:text-sm">{role}</p>
          {githubUrl && (
            <AnimatedLink href={githubUrl}>
              <Button variant="outline" className="mt-2 text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4">
                <Github className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> GitHub
              </Button>
            </AnimatedLink>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
})

const CTASection = React.memo(() => {
  return (
    <motion.section 
      className="text-center space-y-8 mt-24"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Experience the AI Revolution
      </h2>
      <p className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
        Join our Discord server and immerse yourself in a unique environment where
        AI users seamlessly integrate with real users, creating an unparalleled
        experience in the world of Discord communities.
      </p>
      <AnimatedLink href="https://discord.gg/zukijourney">
        <Button className="text-sm sm:text-base md:text-lg px-6 py-3 sm:px-8 sm:py-4">
          Enter the AI Realm <ChevronDown className="ml-2" />
        </Button>
      </AnimatedLink>
    </motion.section>
  )
})

const Footer = React.memo(() => {
  return (
    <footer className="bg-card text-card-foreground mt-24 py-8 sm:py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm sm:text-base">© 2024 zukijourney. All rights reserved.</p>
        <p className="mt-2 text-sm sm:text-base">
          Contact us on <AnimatedLink href="https://discord.gg/zukijourney" className="text-primary hover:underline">Discord</AnimatedLink>
        </p>
      </div>
    </footer>
  )
})