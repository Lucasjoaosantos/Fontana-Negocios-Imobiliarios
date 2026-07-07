import { Hero } from "./components/Hero";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { AboutTeaser } from "./components/AboutTeaser";

export function HomeView() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <AboutTeaser />
    </>
  );
}