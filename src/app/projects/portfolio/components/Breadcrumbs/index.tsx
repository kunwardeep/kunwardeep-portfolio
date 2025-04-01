import Link from "next/link";
import { usePathname } from "next/navigation";

const PATHS = new Map<string, string>([
  ["projects", "Projects"],
  ["snakeGame", "Snake Game"],
  ["userSearch", "User Search"],
  ["digitalClock", "Digital Clock"],
]);

const getProjectPath = (pathname: string) => {
  const pathArray = pathname.split("/");
  const projectName = pathArray[2];
  return PATHS.get(projectName) ?? projectName;
};

type BreadcrumbLink = { href: string; name: string };

const UrlList = ({ links }: { links: Array<BreadcrumbLink> }) => {
  return (
    <ul>
      {links.map((l) => {
        return (
          <li key={l.name}>
            {l.href ? (
              <Link className="whitespace-nowrap" href={l.href}>
                {l.name}
              </Link>
            ) : (
              l.name
            )}
          </li>
        );
      })}
    </ul>
  );
};

const Breadcrumbs = () => {
  const pathname = usePathname();

  const links: Array<BreadcrumbLink> = [{ href: "/", name: "Home" }];

  if (pathname.includes("projects")) {
    const projectName = getProjectPath(pathname);
    links.push({ href: "", name: PATHS.get("projects") ?? "projects" });
    links.push({ href: "", name: projectName });
  }

  return (
    <div className="breadcrumbs text-sm ">
      <UrlList links={links} />
    </div>
  );
};

export default Breadcrumbs;
