// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import Image from "next/image";
// import { Partner } from "@/types";

// // Partners using real photos from the site to feel authentic
// const partners: Partner[] = [
//   {
//     id: "1",
//     name: "BOR 2025 Coffee Expo",
//     logo: "/hero/BOR2025.png",
//     country: "Global Event",
//     website: "https://bahocoffee.com",
//   },
//   {
//     id: "2",
//     name: "Baho Export Partners",
//     logo: "/hero/Export.png",
//     country: "Rwanda",
//     website: "https://bahocoffee.com/export",
//   },
//   {
//     id: "3",
//     name: "Baho Products Line",
//     logo: "/products/Bag.png",
//     country: "Rwanda",
//     website: "https://bahocoffee.com/products",
//   },
//   {
//     id: "4",
//     name: "Washing Stations Network",
//     logo: "/washing-stations/humure.jpg",
//     country: "Rwanda",
//     website: "https://bahocoffee.com/washing-stations",
//   },
// ];

// export default function Partners() {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   return (
//     <section ref={ref} className="py-20 bg-white dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
//             Global Partners
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Trusted by coffee importers and roasters worldwide
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           {partners.map((partner, index) => (
//             <motion.div
//               key={partner.id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               // className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
//               className="flex flex-col items-center justify-center p-6 bg-gray-50/80 dark:bg-gray-800/80 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100/60 dark:border-gray-700/60"
//             >
//               <div className="h-20 w-full mb-4 flex items-center justify-center">
//                 {partner.logo && partner.logo.startsWith("/") ? (
//                   <Image
//                     src={partner.logo}
//                     alt={partner.name}
//                     width={100}
//                     height={80}
//                     className="rounded-lg"
//                   />
//                 ) : (
//                   <div className="w-24 h-16 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-lg flex items-center justify-center border border-primary-200 dark:border-primary-700">
//                     <span className="text-primary-700 dark:text-primary-300 text-xs font-semibold text-center px-2">
//                       {partner.name.split(" ").map((word) => word[0]).join("").slice(0, 3)}
//                     </span>
//                   </div>
//                 )}
//               </div>
//               <h3 className="text-sm font-semibold text-gray-900 dark:text-white text-center mb-1">
//                 {partner.name}
//               </h3>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {partner.country}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }