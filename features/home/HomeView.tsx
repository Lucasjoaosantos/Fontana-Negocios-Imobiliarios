import { Hero } from "./components/Hero";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { LaunchProperties } from "./components/LaunchProperties";
import { AboutTeaser } from "./components/AboutTeaser";

export function HomeView() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <LaunchProperties />
      <AboutTeaser />
    </>
  );
}
