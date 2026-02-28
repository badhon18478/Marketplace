import { motion } from 'framer-motion';
import { Users, Briefcase, Globe, Award, Target, Heart } from 'lucide-react';
import Navbar from '../components/Navber/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const team = [
    {
      name: 'Alex Morgan',
      role: 'Founder & CEO',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: '10+ years in tech and freelance industry.',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Former product lead at top SaaS companies.',
    },
    {
      name: 'Carlos Ruiz',
      role: 'CTO',
      img: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Full-stack architect with a passion for UX.',
    },
    {
      name: 'Aisha Bello',
      role: 'Head of Community',
      img: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Community builder and freelancer advocate.',
    },
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Mission-Driven',
      desc: 'Empowering every freelancer to build a sustainable career on their own terms.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Community First',
      desc: 'Every feature we build starts with listening to our freelancer and client communities.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global & Inclusive',
      desc: 'We believe talent is everywhere. Our platform is designed for everyone, everywhere.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Quality Obsessed',
      desc: 'From our UX to our support — we hold ourselves to the highest standards.',
      color: 'from-orange-500 to-amber-500',
    },
  ];

  return (
    <div>
      <Navbar />
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-blue-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            About FreelanceHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            We&apos;re on a mission to make freelancing accessible, fair, and
            rewarding for talented professionals worldwide.
          </motion.p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground text-center mb-8">
                Our Story
              </h2>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  FreelanceHub was founded in 2023 by a group of freelancers who
                  were frustrated with existing platforms — high fees, opaque
                  processes, and poor support. We set out to build something
                  different: a marketplace built with freelancers at the center.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, FreelanceHub connects over 5,000 talented professionals
                  with clients from 120+ countries. We&apos;re proud of the
                  community we&apos;ve built and the livelihoods we&apos;ve
                  helped create.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gradient-to-r from-primary to-blue-600">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Briefcase className="w-7 h-7" />,
                  value: '1,000+',
                  label: 'Active Jobs',
                },
                {
                  icon: <Users className="w-7 h-7" />,
                  value: '5,000+',
                  label: 'Freelancers',
                },
                {
                  icon: <Globe className="w-7 h-7" />,
                  value: '120+',
                  label: 'Countries',
                },
                {
                  icon: <Award className="w-7 h-7" />,
                  value: '98%',
                  label: 'Satisfaction',
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex justify-center mb-3 text-white">
                    {s.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {s.value}
                  </div>
                  <div className="text-white/80 text-sm">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground">
                The principles that guide everything we do
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <div
                    className={`inline-flex p-4 bg-gradient-to-r ${v.color} rounded-xl text-white mb-4 shadow-md`}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Meet the Team
              </h2>
              <p className="text-xl text-muted-foreground">
                The people building the future of freelancing
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 shadow-md"
                  />
                  <h3 className="font-bold text-foreground text-lg mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
