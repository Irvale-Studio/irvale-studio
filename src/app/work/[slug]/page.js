import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projects } from '@/lib/data/projects';
import CaseStudyContent from '@/components/work/CaseStudyContent';
import { CreativeWorkSchema } from '@/components/SchemaMarkup';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Irvale Studio`,
    description: project.headline,
  };
}

export default function CaseStudyPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <CreativeWorkSchema
        name={project.name}
        description={project.description}
        image={`https://irvale.studio${project.image}`}
        datePublished={project.year}
      />
      <CaseStudyContent project={project} nextProject={nextProject} />
    </>
  );
}
