type NavigationLink = {
  name: string;
  url: string;
};

export const navigationLinks: NavigationLink[] = [
  { name: "Home", url: "/" },
  { name: "Inventory", url: "/inventory" },
  { name: "Add A User", url: "/adduser" },
];
