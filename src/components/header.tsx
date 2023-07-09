import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Bug, Github, LogOut } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import BackToTopButton from "./back-to-top";

export default function Header() {
  const { isSignedIn, user } = useUser();
  return (
    <>
      <NavigationMenu className="mt-5 px-2 justify-between ">
        {/*Main nav*/}
        <NavigationMenuList>
          <NavigationMenuItem className="flex gap-2">
            <Bug size={24} /> git-track
          </NavigationMenuItem>
        </NavigationMenuList>

        {/*User nav*/}
        <NavigationMenuList className="sm:gap-x-2">
          <NavigationMenuItem>
            <Link
              to="https://github.com/leovoon/gi-track"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                role="link"
                variant={"ghost"}
                size={"sm"}
                className={"w-9 px-0"}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="flex gap-2">
            <ModeToggle />
          </NavigationMenuItem>

          {isSignedIn && (
            <NavigationMenuItem className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                    data-testid="profile-button"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.profileImageUrl}
                        alt={user.username ?? "avatar image"}
                      />
                      <AvatarFallback>
                        {user.firstName && user.firstName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.fullName ?? user.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {"@" + user.username}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <SignOutButton>
                      <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </SignOutButton>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
      <BackToTopButton />
    </>
  );
}
