'use client'
import React from 'react'
import { StarryBackground } from '@/components/ui/StarryBackground'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Moon, Sun, ChevronDown, Github, ExternalLink, Zap, Users, Code, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Balance from "react-wrap-balancer"
import { cn } from "@/lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn(
        "max-w-[750px] text-center text-lg font-light text-foreground",
        className
      )}
      {...props}
    />
  )
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center space-x-4 py-4 md:pb-10",
        className
      )}
      {...props}
    />
  )
}

export default function IndexPage() {
  return (
    <div className="container relative mx-auto min-h-screen">
      <StarryBackground />
      <div className="absolute top-4 right-4">
        <ThemeToggle ></ThemeToggle>
      </div>
      <PageHeader>
        <Link
          href="https://discord.gg/zukijourney"
          className="group inline-flex items-center px-0.5 text-sm font-medium"
        >
          <span className="underline-offset-4 group-hover:underline">
            From one Zuki to a Journey.
          </span>
        </Link>
        <PageHeaderHeading>Welcome to the Future of AI Integration</PageHeaderHeading>
        <PageHeaderDescription>
          zukijourney: Your gateway to a world where AI meets creativity, community, and innovation. 
          Embark on a journey where artificial intelligence seamlessly integrates with human interaction.
        </PageHeaderDescription>
        <PageActions>
          <Link href="https://discord.gg/zukijourney">
            <Button size="lg">Join Our Discord</Button>
          </Link>
          <Link href="https://github.com/zukijourney">
            <Button size="lg" variant="outline">
             Explore our Github Organization!
            </Button>
          </Link>
        </PageActions>
      </PageHeader>
      <ProjectsSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </div>
  )
}

function ProjectsSection(): JSX.Element {
  return (
    <section id="projects" className="space-y-12 mt-24">
      <h2 className="text-4xl font-bold text-center">Our Groundbreaking Projects</h2>
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
}

interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  github?: string;
  comingSoon?: boolean;
}

function ProjectCard({ icon, title, description, link, github, comingSoon }: ProjectCardProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center">
          {icon}
          <CardTitle className="ml-2">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardDescription className="text-lg mb-4">{description}</CardDescription>
        </CardContent>
        <CardFooter className="p-6">
          {comingSoon ? (
            <p className="text-muted-foreground">Coming Soon</p>
          ) : (
            <div className="flex space-x-4">
              {link && (
                <Button asChild variant="outline">
                  <Link href={link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> See for yourself!
                  </Link>
                </Button>
              )}
              {github && (
                <Button asChild variant="outline">
                  <Link href={github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> See the Github.
                  </Link>
                </Button>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function TeamSection(): JSX.Element {
  return (
    <section id="team" className="space-y-12 mt-24">
      <h2 className="text-4xl font-bold text-center">Meet Our Visionary Team</h2>
      <p className="text-center text-xl">
        Connect with our team members on our <Link href="https://discord.gg/zukijourney" className="text-primary hover:underline">Discord server</Link>
      </p>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <TeamMember name="zukixa" role="CEO" url="https://cdn.discordapp.com/avatars/325699845031723010/3eb13f80d44c05a0f94e9fd0151e2fbd.webp?size=4096" githubUrl="https://github.com/zukixa" />
        <TeamMember name="thatluvinhasguy" role="CTO" url="https://cdn.discordapp.com/avatars/881961145236353056/d4216d644564b3ce3e307a8a018a41ce.webp?size=4096" githubUrl="https://github.com/ThatLukinhasGuy" />
        <TeamMember name="aunchers" role="CSO" url="https://cdn.discordapp.com/avatars/800718471935557663/757dd08a5230de37efa9dac13665cd2a.webp?size=4096" githubUrl='https://github.com/Aunchers'/>
        <TeamMember name="thorn_ike" role="Chief RP Officer" url="https://cdn.discordapp.com/avatars/345275472764076032/a_bf1f4d4e0e7b999c2196fc2ca75c155d.gif?size=4096" githubUrl='https://github.com/thorn_ike'/>
        <TeamMember name="prostoleander" role="Executive" url="https://cdn.discordapp.com/avatars/829858497746305024/316127131824b4400e9f333232ba4440.webp?size=4096" githubUrl="https://github.com/henceiusegentoo"></TeamMember>
        <TeamMember name="sabsterrexx" role="Executive" url="https://cdn.discordapp.com/avatars/864267600070836284/05a70ff902393fe693fd1a56a2257835.webp?size=4096" githubUrl='https://github.com/sabsterrexx'/>
        <TeamMember name="voidiiii" role="Executive" url="https://cdn.discordapp.com/avatars/821328725643100172/5acd5ef1d04c44ff2ed3777abc80597a.webp?size=4096" githubUrl='https://github.com/void6670'/>
        <TeamMember name="lunaiiii" role="Executive" url="https://cdn.discordapp.com/avatars/868795530493431868/1a9992096ad3b8a53d787b1ee5985af5.webp?size=4096" githubUrl='https://github.com/zukixa'/>
      </motion.div>
    </section>
  )
}

interface TeamMemberProps {
  name: string;
  role: string;
  url?: string;
  githubUrl?: string;
}

function TeamMember({ name, role, url, githubUrl }: TeamMemberProps): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-4 bg-gradient-to-r from-primary to-accent">
          <Avatar className="w-24 h-24 mx-auto border-4 border-background">
            <AvatarImage src={url} alt={name} />
            <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="text-center p-4">
          <h3 className="font-bold text-lg">@{name}</h3>
          <p className="text-muted-foreground">{role}</p>
          {githubUrl && (
            <Button asChild variant="outline" className="mt-2">
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CTASection(): JSX.Element {
  return (
    <motion.section 
      className="text-center space-y-8 mt-24"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Experience the AI Revolution
      </h2>
      <p className="text-xl max-w-2xl mx-auto">
        Join our Discord server and immerse yourself in a unique environment where
        AI users seamlessly integrate with real users, creating an unparalleled
        experience in the world of Discord communities.
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button asChild className="text-lg px-8 py-6">
          <Link href="https://discord.gg/zukijourney">
            Enter the AI Realm <ChevronDown className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}

function Footer(): JSX.Element {
  return (
    <footer className="bg-card text-card-foreground mt-24 py-12">
      <div className="container mx-auto px-4 text-center">
        <p>© 2024 zukijourney. All rights reserved.</p>
        <p className="mt-2">
          Contact us on <Link href="https://discord.gg/zukijourney" className="text-primary hover:underline">Discord</Link>
        </p>
      </div>
    </footer>
  )
}