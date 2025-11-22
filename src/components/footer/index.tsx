import { FooterPage } from "./footerTypes";

export const footerItems: FooterPage[] = [
  {
    name: "About",
    pages: ["Mission", "Team"],
  },
  {
    name: "Help & Support",
    pages: ["FAQs", "Contact Support"],
  },
  {
    name: "Privacy & Terms",
    pages: ["Privacy Policy", "Terms of Service"],
  },
];

export default function Footer() {
  return <div>Footer</div>;
}
