import React from "react";
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  target?: string;
  children: string;
}

const Link = ({ href, children, target }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink target={target}>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
