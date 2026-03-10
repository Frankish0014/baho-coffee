export interface StaffMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio?: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: "1",
    name: "Emmanuel Rusatira",
    role: "Founder & CEO",
    photo: "/hero/Emmanuel.jpg",
    bio: "Over 19 years in the coffee industry. Former wet mill manager, Zone Supervision Manager, and Head of Specialty, Sustainability & Certification. UN consultant training on best practices for coffee washing stations in East Africa.",
  },
  {
    id: "2",
    name: "Christine Vuguziga",
    role: "Director of Finance",
    photo: "/hero/Christine.jpg",
    bio: "Christine is responsible for the financial management of the company, including budgeting, forecasting, and reporting. She also oversees the company's financial policies and procedures.",
  },
  {
    id: "3",
    name: "Nabaasa Andrew",
    role: "Operations Manager",
    photo: "/hero/Andrew.jpg",
    bio: "Andrew is responsible for the operations of the company, including the management of the company's staff and the company's operations. He also oversees the company's operations and the company's operations.",
  },
  {
    id: "4",
    name: "Ishimwe Gentile",
    role: "Quality Assurance Officer",
    photo: "/hero/Gentile.jpg",
    // bio: "Our leadership team oversees 80+ permanent staff and 16+ washing stations across Rwanda, working with over 16,000 smallholder farmers.",
  },
  {
    id: "5",
    name: "Esther Umuhoza",
    role: "Cheif of Finance",
    photo: "/hero/Esther.jpg",
    bio: "Esther is responsible for the finance of the company, including the management of the company's finances.",
  },

  {
    id: "6",
    name: "Beata Uwingabire",
    role: "Accountant",
    photo: "/hero/Beatha Uwingabire Accountant.jpg",
    // bio: "Our leadership team oversees 80+ permanent staff and 16+ washing stations across Rwanda, working with over 16,000 smallholder farmers.",
  },
  {
    id: "7",
    name: "Alex Niyonkuru",
    role: "Accountant",
    photo: "/hero/Alex Accountant.jpg",
    // bio: "Our leadership team oversees 80+ permanent staff and 16+ washing stations across Rwanda, working with over 16,000 smallholder farmers.",
  },
  {
    id: "8",
    name: "Nzaramba Straton",
    role: "Humure Station Manager",
    photo: "/hero/Straton Humure manager.jpg",
    // bio: "Our leadership team oversees 80+ permanent staff and 16+ washing stations across Rwanda, working with over 16,000 smallholder farmers.",
  },
  {
    id: "9",
    name: "Inkoramutima Bertrand",
    role: "Logistics Manager",
    photo: "/hero/Bertrand.jpg",
    // bio: "Our leadership team oversees 80+ permanent staff and 16+ washing stations across Rwanda, working with over 16,000 smallholder farmers.",
  },
  {
    id: "10",
    name: "Frank Ishimwe",
    role: "Marketing Manager",
    photo: "/hero/Frank Marketing.jpg",
    // bio: "Our leadership team oversees 80+ permanent staff and 16+ washing stations across Rwanda, working with over 16,000 smallholder farmers.",
  },
  {
    id: "11",
    name: "Joy Grace Barikunde",
    role: "Communication Officer",
    photo: "/hero/Joy.jpg",
    // bio: "Our leadership team oversees 80+ permanent staff and 16+ washing stations across Rwanda, working with over 16,000 smallholder farmers.",
  },

];

export function getAllStaff(): StaffMember[] {
  return staffMembers;
}
