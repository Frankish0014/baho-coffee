"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Users, Heart, Leaf, Award, Target, Eye, Sparkles, 
  MapPin, Mountain, Coffee, Briefcase, CheckCircle2,
  Building2, Globe, TrendingUp, Handshake
} from "lucide-react";

export default function AboutContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const coreValues = [
    {
      letter: "B",
      title: "Beauty of Nature",
      description: "We celebrate and preserve the natural beauty of Rwanda's coffee-growing regions.",
    },
    {
      letter: "A",
      title: "Agility, Ambition, and Achievement",
      description: "We move quickly, dream big, and deliver results that make a difference.",
    },
    {
      letter: "H",
      title: "Honesty",
      description: "Transparency and integrity guide every decision we make.",
    },
    {
      letter: "O",
      title: "Openness",
      description: "We welcome collaboration, new ideas, and diverse perspectives.",
    },
  ];

  const whyChooseUs = [
    {
      icon: Heart,
      title: "We Believe in People",
      description: "Our farmers are the heart of our business, and we understand that investing in them is key to ensuring a sustainable future for the entire coffee industry.",
    },
    {
      icon: Handshake,
      title: "We Value Collaboration",
      description: "Our customers play a vital role in realizing our mission to improve lives—not just within our company, but in the communities we serve.",
    },
    {
      icon: TrendingUp,
      title: "We Value Hard Work",
      description: "Excellence is never an accident—it is the result of dedication, effort, and perseverance. Our management team and employees are expected to give their best every day.",
    },
    {
      icon: CheckCircle2,
      title: "We Value Consistency",
      description: "We believe that hard work produces results only when it is sustained. This is why we put a strong emphasis on maintaining consistent quality, from the farm to the cup.",
    },
    {
      icon: Award,
      title: "We Value Excellence",
      description: "At BAHO Coffee, we are committed to providing the best coffee, the most convenient service, and the highest level of customer satisfaction.",
    },
  ];

  const productionAreas = [
    {
      region: "West",
      icon: Mountain,
      description: "Known for its high altitudes and volcanic soil, this region produces coffee with bright acidity and complex fruity flavors.",
      color: "from-blue-500 to-blue-700",
    },
    {
      region: "South",
      icon: Coffee,
      description: "The Southern region is home to fertile lands where coffee takes on a sweet, balanced flavor with hints of chocolate and nuts.",
      color: "from-green-500 to-green-700",
    },
    {
      region: "East",
      icon: Leaf,
      description: "Coffee from the Eastern region is more delicate, with floral notes and lighter body, thanks to the region's lower elevation.",
      color: "from-yellow-500 to-yellow-700",
    },
    {
      region: "North",
      icon: Mountain,
      description: "This area, near the foothills of the Virunga Mountains, produces coffee with bold flavors and rich aromas, characterized by its full body and balanced acidity.",
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 pt-8"
      >
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4">
          About Baho Coffee
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Connecting Rwanda&apos;s finest specialty coffee with the world, empowering communities, and celebrating the beauty of life.
        </p>
      </motion.div>

      {/* Vision & Mission */}
      <section ref={ref} className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Vision</h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Built strong relationships between multi to national corporations in coffee industry, begins with connections between our partners. Make a strong team member; support our farmer&apos;s communities by offering them a good price for their harvest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-coffee-50 to-coffee-100 dark:from-coffee-900/20 dark:to-coffee-800/20 rounded-2xl p-8 border border-coffee-200 dark:border-coffee-800"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-coffee-600 dark:text-coffee-400" />
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Mission</h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Over more than 8 years, BAHO built trust based on relationships with customers worldwide. We adapt our delivery to the way your coffee, whether natural or roasted, provide coffee experiments for preparing of all sorts of great coffee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values - BAHO */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">Core Values</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The essence of BAHO—Beauty, Agility, Honesty, and Openness
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.letter}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-3">
                {value.letter}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">Why Choose Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            At BAHO Coffee, we believe in the power of &quot;BAHO,&quot; which means &quot;live, stay alive, don&apos;t give up, enjoy life.&quot; This philosophy is a reflection of our journey and commitment to resilience, growth, and enjoying every step of the process.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                  <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* About the Company */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900 dark:text-white">
              About the Company
            </h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                BAHO coffee Founded in 2015 but formally launched in 2017, is a major specialty coffee export firm headquartered in Rwanda. We employ about 2,000–2,500 casual workers every day throughout the year, have over 80 permanent staff members spread across our coffee washing stations across the nation, and collaborate with over 16,000 smallholder coffee farmers.
              </p>
              <p>
                BAHO coffee company empower farmers and enrich our community which reflected in the quality and amazing taste of our coffee.
              </p>
              <p>
                We process fully washed, Arabica coffee, honey coffee, natural coffee, and anaerobic coffee. We are committed to improving efficiencies in the supply chain with affordable price to thousands of small coffee farmers throughout Rwanda.
              </p>
              <p className="font-semibold text-primary-600 dark:text-primary-400">
                We are running more than 15 coffee washing stations located in all potential areas of the country.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-96 relative rounded-lg overflow-hidden shadow-xl"
          >
            <Image
              src="/hero/baho_team.jpg"
              alt="Baho Coffee team at the washing station"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 1000vw, 500px vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Our Beliefs, Commitment, and Policy */}
      <section className="mb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-serif font-bold mb-6 text-gray-900 dark:text-white text-center">
            Our Beliefs, Commitment, and Policy
          </h2>
          <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            <p>
              We believe in <strong className="text-primary-600 dark:text-primary-400">BAHO</strong>, which means &quot;live, stay alive, don&apos;t give up, enjoy life&quot; because which is the reverse of our history. We believe in people: Farmers are the main source of output, and we must invest in people if we want the business to be sustainable.
            </p>
            <p>
              We value collaboration, and our coffee customers play a crucial role in realizing our mission to improve both our own and others&apos; lives. We value hard work, and both our management and employees are expected to put up their best effort in order to provide the best possible results.
            </p>
            <p>
              We value consistency because I think hard work only yields results when it is sustained. We value excellence: We think that our people should have access to the greatest coffee, convenience, and service available.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Production Areas */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
            Characteristics of Our Production Areas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Rwanda&apos;s diverse geography gives each region a unique coffee profile
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productionAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.region}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${area.color} text-white rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">{area.region}</h3>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {area.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* About the CEO */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
                  About Our CEO
                </h2>
              </div>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-primary-600 dark:text-primary-400">Emmanuel Rusatira</strong>, Founder and CEO of Baho Coffee, works as a consultant for the UN, providing training on best practices to increase the profitability and quality of coffee washing stations in East Africa.
                </p>
                <p>
                  In addition, a qualified Master Trainer of the certification schemes used in coffee processing (RFA, CAFÉ PRACTICES, ORGANIC, FAIR TRADE, 4C) of Coffee Processing and, I do consultancy for the UN to train on best practices to improve both quality and profitability of coffee washing stations in East Africa.
                </p>
                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border-l-4 border-primary-600">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Experience in the Coffee Business</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    I have been deeply involved in the coffee business for over <strong>19 years</strong>. My journey began as a coffee washing station manager, where I gained hands-on experience in the day-to-day operations of processing coffee.
                  </p>
                </div>
                <p>
                  Upon completion of my First Degree in 2005, I returned to my roots and began working as a wet mill manager, and later promoted as a Zone Supervision Manager in the biggest multinational export company working in Rwanda, where I was at last given the position of Head of Specialty, Sustainability & Certification department.
                </p>
                <p>
                  12 years since I joined the industry, I started my own business with one wet mill acquired through a Bank loan, and today my Company owns <strong>14 Coffee washing stations</strong> and runs <strong>six more from partners</strong>.
                </p>
                <p>
                  Over time, I developed a strong passion for improving the livelihoods of farmers in my country, Rwanda. This led me to found Baho Coffee, where I now serve as CEO, working to promote quality and sustainability while empowering coffee-growing communities, improving coffee processing approaches and influencing positive changes to build new reputation of Rwandan coffee on international market level.
                </p>
              </div>
            </div>
            <div className="relative w-full h-64 sm:h-80 md:h-[500px] lg:h-full lg:min-h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/hero/MD.jpg"
                alt="Emmanuel Rusatira, CEO of Baho Coffee"
                fill
                className="object-cover md:object-contain lg:object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-serif font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">16,000+</div>
              <div className="text-primary-100">Smallholder Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">16+</div>
              <div className="text-primary-100">Washing Stations</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,000-2,500</div>
              <div className="text-primary-100">Daily Workers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">80+</div>
              <div className="text-primary-100">Permanent Staff</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
