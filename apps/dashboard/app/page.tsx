import { Button } from "@galvatron/ui/components/button";

export default function Home() {
  return (
    <main>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
        CLICK ME!
      </Button>
    </main>
  );
}
