import { Link } from "react-router-dom";
import Logo from "./logo";
import { Menu as HamburgerMenu, X as Close, Bell } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Navigation } from "./navigationTypes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navigation: Navigation[] = [
  {
    name: "Home",
    to: "/home",
    current: true,
    description: "Start here for the latest updates and features.",
    mobileLabel: "Home", // Mobile version retains simplicity
  },
  {
    name: "Journal",
    to: "/journal",
    current: false,
    description: "Capture, reflect, and manage your journal entries.",
    mobileLabel: "Journal",
    subNavigation: [
      {
        name: "Create Entry",
        to: "/journal/create",
        description: "Add a new journal entry to reflect your thoughts.",
      },
      {
        name: "View Past Entries",
        to: "/journal/view",
        description: "Browse through your past journal entries.",
      },
    ],
  },
  {
    name: "Stories",
    to: "/personal-stories",
    current: false,
    description: "Discover, share, and explore community stories.",
    mobileLabel: "Stories", // Combines multiple story-related items
    subNavigation: [
      {
        name: "Story Wall",
        to: "/personal-stories/wall",
        description: "Explore stories shared by the community.",
      },
      {
        name: "Submit Your Story",
        to: "/personal-stories/submit",
        description: "Share your own story with the community.",
      },
      {
        name: "Story Highlights",
        to: "/personal-stories/highlights",
        description: "Curated highlights from the community's stories.",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    current: false,
    description: "Engage in discussions and join support groups.",
    mobileLabel: "Community",
    subNavigation: [
      {
        name: "Discussions",
        to: "/community/discussions",
        description: "Join or start discussions on various topics.",
      },
      {
        name: "Support Groups",
        to: "/community/support",
        description: "Connect with groups focused on specific needs.",
      },
      {
        name: "Live Chat",
        to: "/community/chat",
        description: "Engage in real-time conversations.",
      },
    ],
  },
  {
    name: "Milestones",
    to: "/milestones",
    current: false,
    description: "Track your progress and celebrate achievements.",
    mobileLabel: "Milestones",
    subNavigation: [
      {
        name: "Track Progress",
        to: "/milestones/progress",
        description: "Monitor your journey and growth over time.",
      },
      {
        name: "Personal Achievements",
        to: "/milestones/achievements",
        description: "View your major achievements and goals.",
      },
    ],
  },
];

export default function Header() {
  return (
    <Sheet>
      <header>
        <nav className="bg-background fixed inset-x-0 top-0  z-[9999]">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-background">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/*Mobile menu button*/}
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="group relative inline-flex items-center justify-center rounded-full text-foreground  hover:text-primary-foreground  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary p-1"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="absolute -inset-0.5"></span>
                    <span className="sr-only">Open main menu</span>
                    <HamburgerMenu className="block size-6 group-data-[state=open]:hidden" />
                    <Close className="hidden size-6 group-data-[state=open]:block" />
                  </button>
                </SheetTrigger>
              </div>

              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-between">
                <div className="flex shrink-0 items-center">
                  <Logo />
                </div>

                <div className="hidden md:flex justify-center items-center  flex-1">
                  {/* <div className="flex justify-center items-center space-x-2 md:space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={cn(
                          item.current
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted hover:text-primary-foreground",
                          "rounded-md px-1 md:px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div> */}
                  <NavigationMenu>
                    <NavigationMenuList>
                      {navigation.map((item) => (
                        <React.Fragment key={item.name}>
                          {item.subNavigation ? (
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                {item.name}
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                  {item.subNavigation.map((subItem) => (
                                    <ListItem
                                      key={subItem.name}
                                      title={subItem.name}
                                      to={subItem.to}
                                    >
                                      {subItem.description}
                                    </ListItem>
                                  ))}
                                </ul>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          ) : (
                            <NavigationMenuItem>
                              <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                asChild
                              >
                                <Link to={item.to}>{item.name}</Link>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          )}
                        </React.Fragment>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-popover p-1 text-muted-foreground hover:text-primary-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View Notifications</span>
                  <Bell />
                </button>

                <DropdownMenu>
                  <div className="relative ml-3">
                    <div>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="relative flex rounded-full bg-background text-sm focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">Open user menu</span>

                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                            <AvatarFallback>JK</AvatarFallback>
                          </Avatar>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <div
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-card py-1 ring-1 shadow-lg ring-border focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                          tabIndex={-1}
                        >
                          <DropdownMenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-1 text-sm text-foreground hover:text-primary-foreground"
                              role="menu-item"
                              tabIndex={-1}
                              id="user-menu-item-0"
                            >
                              Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-1 text-sm text-foregroun hover:text-primary-foreground"
                              role="menu-item"
                              tabIndex={-1}
                              id="user-menu-item-1"
                            >
                              Settings
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link
                              to="#"
                              className="block px-4 py-1 text-sm text-foregroun hover:text-primary-foreground"
                              role="menu-item"
                              tabIndex={-1}
                              id="user-menu-item-3"
                            >
                              Sign Out
                            </Link>
                          </DropdownMenuItem>
                        </div>
                      </DropdownMenuContent>
                    </div>
                  </div>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <SheetContent side="top" className="bg-background top-16">
            <VisuallyHidden asChild>
              <SheetTitle>Open Navigation Menu</SheetTitle>
            </VisuallyHidden>
            <VisuallyHidden>
              <SheetDescription>
                Navigate through the app to explore key pages like Home,
                Journal, Stories, and more.
              </SheetDescription>
            </VisuallyHidden>

            <div className="md:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? "page" : undefined}
                    className={cn(
                      item.current
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted hover:text-primary-foreground",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.mobileLabel}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </nav>
      </header>
    </Sheet>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
