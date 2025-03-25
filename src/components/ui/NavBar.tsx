"use client";
import React from 'react';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuLink } from './navigation-menu';
import { NavigationMenuContent, NavigationMenuItem } from '@radix-ui/react-navigation-menu';


export function Navbar() {
  return (
    <nav className="bg-secondary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/"> 
          <h1 className="font-bold text-primary">Home</h1>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-secondary text-white">Fall 2024</NavigationMenuTrigger>
              <NavigationMenuContent
              className="absolute shadow-lg rounded-md"
              style={{
                animation: "none", // Disable default animations
              }}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/class/4641_Fall_2024">CS 4641</Link>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/class/7641_Fall_2024">CS 7641</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}