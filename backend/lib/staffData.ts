export interface StaffMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
  /** CSS object-position for portrait framing (e.g. "center top") */
  photoPosition?: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Emmanuel Rusatira",
    role: "Founder & CEO",
    photo: "/hero/BAHO_31 (1).jpg",
    bio: "Over 19 years in the coffee industry. Former wet mill manager, Zone Supervision Manager, and Head of Specialty, Sustainability & Certification. UN consultant training on best practices for coffee washing stations in East Africa.",
  },
  {
    id: "2",
    name: "Christine Vuguziga",
    role: "Director of Finance",
    photo: "/hero/Christine.jpg",
    bio: "Christine leads financial management at Baho Coffee, including budgeting, forecasting, and reporting. She also oversees the company's financial policies and procedures.",
  },
  {
    id: "3",
    name: "Nabaasa Andrew",
    role: "Operations Manager",
    photo: "/hero/Andrew.jpg",
    bio: "Andrew oversees day-to-day operations across Baho Coffee, coordinating staff, washing stations, and production to keep quality and delivery on track.",
  },
  // {
  //   id: "4",
  //   name: "Ishimwe Gentile",
  //   role: "Quality Assurance Officer",
  //   photo: "/hero/Gentile.jpg",
  // },
  {
    id: "5",
    name: "Esther Umuhoza",
    role: "Chief of Finance",
    photo: "/hero/Esther.jpg",
    bio: "Esther supports the company's financial operations, helping manage accounts, reporting, and day-to-day finance processes.",
  },
  {
    id: "6",
    name: "Beata Uwingabire",
    role: "Accountant",
    photo: "/hero/Beatha Uwingabire Accountant.jpg",
  },
  {
    id: "7",
    name: "Alex Niyonkuru",
    role: "Accountant",
    photo: "/hero/Alex Accountant.jpg",
  },
  {
    id: "8",
    name: "Nzaramba Straton",
    role: "Humure Station Manager",
    photo: "/hero/Straton Humure manager.jpg",
  },
  // {
  //   id: "9",
  //   name: "Inkoramutima Bertrand",
  //   role: "Logistics Manager",
  //   photo: "/hero/Bertrand.jpg",
  // },
  {
    id: "10",
    name: "Frank Ishimwe",
    role: "Marketing and IT",
    photo: "/hero/Frank Marketing.jpg",
  },
  {
    id: "11",
    name: "Joy Grace Barikunde",
    role: "Communication Officer & Professional Photographer at Baho",
    photo: "/hero/joy.jpeg",
    photoPosition: "center top",
  },
];

export function getAllStaff(): StaffMember[] {
  return staffMembers;
}
