'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  Zap,
  Shield,
  Users,
  BarChart3,
  Code,
  Database,
  Globe,
  Smartphone,
  Palette,
  Lightbulb,
  Rocket,
  CheckCircle,
  Star,
  Clock,
  TrendingUp,
  Award,
  Phone,
  Mail,
  ChevronRight,
  Calendar,
  UserCheck,
  Target,
  Layers,
  Settings,
  Headphones,
  RefreshCw
} from 'lucide-react'

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('popular')
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const categories = [
    { id: 'popular', name: 'Populare', icon: '🔥', description: 'Cele mai căutate servicii' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛒', description: 'Magazine online complete' },
    { id: 'education', name: 'Educație', icon: '🎓', description: 'Platforme de cursuri și training' },
    { id: 'mobile', name: 'Mobile', icon: '📱', description: 'Aplicații iOS și Android' },
    { id: 'business', name: 'Business', icon: '💼', description: 'Soluții pentru companii' },
    { id: 'healthcare', name: 'Sănătate', icon: '🏥', description: 'Platforme medicale și clinici' },
    { id: 'banking', name: 'Bancar', icon: '🏦', description: 'Sisteme bancare și fintech' },
    { id: 'manufacturing', name: 'Producție', icon: '⚙️', description: 'Sisteme de producție și fabrici' },
    { id: 'retail', name: 'Retail', icon: '🛍️', description: 'Sisteme POS și management magazine' },
    { id: 'legal', name: 'Legal', icon: '⚖️', description: 'Management cazuri legale și documente' },
    { id: 'insurance', name: 'Asigurări', icon: '🛡️', description: 'Platforme de asigurări și management polițe' }
  ]

  const processSteps = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Consultanță Inițială",
      description: "Analizăm nevoile tale și definim obiectivele proiectului",
      duration: "1-2 zile"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Design & Prototipare",
      description: "Creăm design-ul UX/UI și prototipuri interactive",
      duration: "3-7 zile"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Dezvoltare",
      description: "Implementăm funcționalitățile folosind tehnologii moderne",
      duration: "1-4 săptămâni"
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Lansare & Suport",
      description: "Lansăm proiectul și oferim suport tehnic continuu",
      duration: "Continuu"
    }
  ]

  const testimonials = [
    {
      name: "Alexandra P.",
      company: "Boutique Fashion",
      role: "CEO",
      content: "Am colaborat la magazinele noastre online și rezultatele au fost excepționale. Vânzările au crescut cu 300% în primele 6 luni.",
      rating: 5,
      project: "Magazin Online Premium",
      image: "👩‍💼"
    },
    {
      name: "Mihai R.",
      company: "Tech Academy",
      role: "Fondator",
      content: "Platforma de cursuri dezvoltată a transformat complet modul în care livrăm educație. Interfață intuitivă și funcționalități avansate.",
      rating: 5,
      project: "Platformă E-Learning",
      image: "👨‍🏫"
    },
    {
      name: "Elena D.",
      company: "Clinica Medicală",
      role: "Manager",
      content: "Sistemul de programări online a redus cu 80% timpul petrecut pe telefon și a crescut satisfacția pacienților.",
      rating: 5,
      project: "Sistem Programări Online",
      image: "👩‍⚕️"
    }
  ]

  const services = [
    // E-COMMERCE CATEGORY
    {
      id: 'ecommerce-full',
      category: 'ecommerce',
      title: 'Magazin Online Complet',
      description: 'Platformă e-commerce full-stack cu toate funcționalitățile necesare pentru a vinde online eficient',
      price: '1.500 - 3.500',
      duration: '2-3 săptămâni',
      popular: true,
      badge: '#1 CEL MAI VÂNDUT',
      icon: '🛒',
      color: 'orange',
      features: ['Design responsive și modern', 'Management produse și categorii', 'Integrare plăți (Stripe, Pos România)', 'Management stocuri în timp real', 'Sistem discount-uri și promoții', 'Integrare curieri (Fan Courier, DPD)', 'Dashboard analytics și rapoarte', 'SEO optimizare', 'Blog integrat', 'Sistem review-uri produse', 'Multi-language support', 'Ghid utilizare și training'],
      technologies: ['React + Node.js + PostgreSQL', 'Vue.js + PHP + MySQL', 'Next.js + Python + Django + MongoDB'],
      perfectFor: 'Afaceri mici, antreprenori, produse fizice/digitale',
      support: '6 luni suport tehnic inclus',
      includes: ['Hosting 1 an', 'Domeniu .ro 1 an', 'SSL certificate', 'Email business']
    },
    {
      id: 'marketplace-platform',
      category: 'ecommerce',
      title: 'Platformă Marketplace Multi-vendor',
      description: 'Marketplace complet cu sistem multi-vendor, comisioane automate și management vânzători',
      price: '4.000 - 8.000',
      duration: '4-6 săptămâni',
      popular: false,
      badge: 'SCALABLE',
      icon: '🏪',
      color: 'orange',
      features: ['Multi-vendor management', 'Sistem comisioane automatizat', 'Dashboard vânzători', 'Rating și review sistem', 'Dispute resolution', 'Payout automation', 'Vendor analytics', 'Inventory management', 'Shipping calculation', 'Tax management', 'Vendor verification', 'Mobile app for vendors'],
      technologies: ['React + Node.js + PostgreSQL', 'Next.js + Python + Django', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Platforme marketplace, agregatori produse, afaceri B2B',
      support: '12 luni suport tehnic inclus',
      includes: ['Multi-vendor dashboard', 'Automated payment system', 'Vendor analytics']
    },
    {
      id: 'subscription-box',
      category: 'ecommerce',
      title: 'Platformă Abonamente Box',
      description: 'Sistem complet pentru servicii de abonamente recurente cu personalizare și management automatizat',
      price: '2.500 - 5.000',
      duration: '3-4 săptămâni',
      popular: false,
      badge: 'RECURRING',
      icon: '📦',
      color: 'orange',
      features: ['Subscription management', 'Customizable box builder', 'Recurring payments', 'Customer preferences', 'Inventory tracking', 'Shipping automation', 'Pause/cancel options', 'Analytics dashboard', 'Email notifications', 'Gift subscriptions', 'Mobile app', 'Loyalty program'],
      technologies: ['React + Node.js + MongoDB', 'Vue.js + Python + FastAPI', 'Next.js + PostgreSQL'],
      perfectFor: 'Servicii de abonamente, gift boxes, produse recurente',
      support: '9 luni suport tehnic inclus',
      includes: ['Recurring payment setup', 'Inventory management system', 'Customer analytics']
    },
    {
      id: 'dropshipping-automation',
      category: 'ecommerce',
      title: 'Automatizare Dropshipping',
      description: 'Platformă dropshipping completă cu integrare automatizată supplieri și management comenzi',
      price: '2.000 - 4.000',
      duration: '2-4 săptămâni',
      popular: false,
      badge: 'AUTOMATED',
      icon: '🚚',
      color: 'orange',
      features: ['Supplier integration API', 'Automated product sync', 'Price and stock updates', 'Order routing', 'Multi-supplier support', 'Profit calculator', 'Dashboard analytics', 'Auto-order placement', 'Tracking automation', 'Inventory monitoring', 'Customer notifications', 'Mobile app'],
      technologies: ['React + Python + Django', 'Vue.js + Node.js + Express', 'Next.js + PHP + Symfony'],
      perfectFor: 'Afaceri dropshipping, marketplace automation, e-commerce scalabil',
      support: '6 luni suport tehnic inclus',
      includes: ['Supplier API integration', 'Automated order system', 'Inventory sync']
    },
    {
      id: 'b2b-ecommerce',
      category: 'ecommerce',
      title: 'Platformă B2B E-Commerce',
      description: 'Soluție e-commerce dedicată afacerilor B2B cu gestionare conturi corporate și prețuri personalizate',
      price: '3.500 - 7.000',
      duration: '4-5 săptămâni',
      popular: false,
      badge: 'BUSINESS',
      icon: '🏭',
      color: 'orange',
      features: ['Corporate account management', 'Tiered pricing system', 'Bulk ordering', 'Purchase order management', 'Credit system', 'Account-specific catalogs', 'Approval workflows', 'Volume discounts', 'Tax exemption handling', 'Account manager dashboard', 'Invoice management', 'Integration with ERP'],
      technologies: ['Angular + Node.js + PostgreSQL', 'React + Python + Django', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Afaceri B2B, distribuitori, producători, wholesale',
      support: '12 luni suport tehnic inclus',
      includes: ['Corporate account setup', 'Custom pricing engine', 'ERP integration']
    },
    {
      id: 'digital-products',
      category: 'ecommerce',
      title: 'Platformă Produse Digitale',
      description: 'Marketplace pentru produse digitale cu licențe automatizate și delivery instant',
      price: '1.800 - 3.500',
      duration: '2-3 săptămâni',
      popular: false,
      badge: 'DIGITAL',
      icon: '💾',
      color: 'orange',
      features: ['Digital product delivery', 'License key generation', 'Download management', 'Customer accounts', 'Version control', 'Update notifications', 'Multi-format support', 'Secure delivery', 'License tracking', 'Customer dashboard', 'Analytics dashboard', 'API integration'],
      technologies: ['React + Node.js + MongoDB', 'Next.js + Python + FastAPI', 'Vue.js + PHP + Symfony'],
      perfectFor: 'Software, templates, digital assets, online courses',
      support: '6 luni suport tehnic inclus',
      includes: ['Digital delivery system', 'License management', 'Update infrastructure']
    },

    // EDUCATION CATEGORY
    {
      id: 'online-courses',
      category: 'education',
      title: 'Platformă Cursuri Online',
      description: 'Sistem complet pentru livrarea de conținut educațional online cu certificări și management studenți',
      price: '2.000 - 4.000',
      duration: '3-4 săptămâni',
      popular: true,
      badge: '#2 POPULAR',
      icon: '🎓',
      color: 'blue',
      features: ['Management cursuri și module', 'Video hosting și streaming', 'Sistem quiz-uri și evaluări', 'Generare certificate automate', 'Dashboard instructor', 'Management studenți', 'Integrare plăți recurente', 'Community și forum', 'Progress tracking', 'Mobile responsive', 'Live streaming support', 'Analytics și rapoarte detaliate'],
      technologies: ['React + Node.js + Express', 'Vue.js + PHP + Laravel', 'Next.js + Python + Django + FastAPI'],
      perfectFor: 'Instructori, academii, formatori, experți',
      support: '12 luni suport tehnic inclus',
      includes: ['Video hosting 100GB', 'Email marketing', 'Webinar integration']
    },
    {
      id: 'virtual-classroom',
      category: 'education',
      title: 'Sală de Clasă Virtuală',
      description: 'Platformă interactivă pentru clase online cu video conferințe, whiteboard și colaborare real-time',
      price: '3.000 - 6.000',
      duration: '4-6 săptămâni',
      popular: false,
      badge: 'INTERACTIVE',
      icon: '📺',
      color: 'blue',
      features: ['Video conferencing HD', 'Interactive whiteboard', 'Screen sharing', 'Breakout rooms', 'Chat și messaging', 'File sharing', 'Recording capabilities', 'Polls și quizzes', 'Attendance tracking', 'Hand raising system', 'Multi-language support', 'Mobile app'],
      technologies: ['WebRTC + Node.js + React', 'Next.js + Python + Django', 'Vue.js + PHP + Symfony'],
      perfectFor: 'Școli, universități, training corporate, tutoring',
      support: '12 luni suport tehnic inclus',
      includes: ['Video streaming infrastructure', 'Recording storage', 'Real-time collaboration tools']
    },
    {
      id: 'lms-corporate',
      category: 'education',
      title: 'LMS Corporate Training',
      description: 'Platformă de training corporate cu management angajați, certificări și rapoarte de performanță',
      price: '4.000 - 8.000',
      duration: '5-7 săptămâni',
      popular: false,
      badge: 'CORPORATE',
      icon: '👔',
      color: 'blue',
      features: ['Employee management', 'Training pathways', 'Compliance tracking', 'Certificate management', 'Performance analytics', 'Manager dashboards', 'Automated enrollments', 'Mobile learning', 'Gamification elements', 'Integration with HR systems', 'Custom reporting', 'Multi-tenant support'],
      technologies: ['Angular + Node.js + PostgreSQL', 'React + Python + Django', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Corporate training, HR departments, compliance training',
      support: '18 luni suport tehnic inclus',
      includes: ['HR system integration', 'Compliance tracking', 'Corporate branding']
    },
    {
      id: 'language-learning',
      category: 'education',
      title: 'Platformă Limbi Străine',
      description: 'Sistem interactiv de învățare a limbilor străine cu exerciții audio, video și gamification',
      price: '3.500 - 6.500',
      duration: '4-6 săptămâni',
      popular: false,
      badge: 'LANGUAGE',
      icon: '🗣️',
      color: 'blue',
      features: ['Interactive lessons', 'Speech recognition', 'Grammar exercises', 'Vocabulary builder', 'Progress tracking', 'Native speaker recordings', 'Cultural content', 'Gamification system', 'Social learning', 'AI-powered corrections', 'Offline mode', 'Mobile app'],
      technologies: ['React + Python + TensorFlow', 'Next.js + Node.js + MongoDB', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Școli de limbi, aplicații mobile, educație online',
      support: '12 luni suport tehnic inclus',
      includes: ['AI speech recognition', 'Content management system', 'Mobile apps']
    },
    {
      id: 'assessment-platform',
      category: 'education',
      title: 'Platformă Evaluări și Teste',
      description: 'Sistem avansat pentru crearea și administrarea de teste online cu anti-cheating și analytics',
      price: '2.500 - 5.000',
      duration: '3-5 săptămâni',
      popular: false,
      badge: 'ASSESSMENT',
      icon: '📝',
      color: 'blue',
      features: ['Advanced test builder', 'Multiple question types', 'Time-limited tests', 'Anti-cheating measures', 'Automated grading', 'Detailed analytics', 'Randomized questions', 'Proctoring integration', 'Certificate generation', 'Bulk upload', 'Result statistics', 'Mobile support'],
      technologies: ['React + Node.js + PostgreSQL', 'Angular + Python + Django', 'Vue.js + PHP + Symfony'],
      perfectFor: 'Instituții educaționale, centre de evaluare, HR departments',
      support: '9 luni suport tehnic inclus',
      includes: ['Anti-cheating system', 'Advanced analytics', 'Proctoring integration']
    },
    {
      id: 'tutoring-platform',
      category: 'education',
      title: 'Platformă Meditații Online',
      description: 'Marketplace pentru meditații individuale cu scheduling, payments și video calling integrat',
      price: '3.000 - 5.500',
      duration: '4-5 săptămâni',
      popular: false,
      badge: 'TUTORING',
      icon: '👨‍🏫',
      color: 'blue',
      features: ['Tutor profiles', 'Advanced search filters', 'Booking system', 'Video calling integration', 'Payment processing', 'Calendar synchronization', 'Session recordings', 'Review și rating system', 'Parent accounts', 'Progress tracking', 'Mobile apps', 'Commission management'],
      technologies: ['React + Node.js + WebRTC', 'Next.js + Python + Django', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Centre de meditații, platforme educationale, tutori independenți',
      support: '12 luni suport tehnic inclus',
      includes: ['Video calling infrastructure', 'Payment gateway integration', 'Mobile applications']
    },

    // MOBILE CATEGORY
    {
      id: 'mobile-app',
      category: 'mobile',
      title: 'Aplicație Mobile Native',
      description: 'Aplicație iOS și Android nativă cu performanță maximă și UX excepțional',
      price: '3.000 - 8.000',
      duration: '4-8 săptămâni',
      popular: true,
      badge: 'PREMIUM',
      icon: '📱',
      color: 'purple',
      features: ['Dezvoltare nativă iOS (Swift)', 'Dezvoltare nativă Android (Kotlin)', 'Design UI/UX modern', 'Integrare API backend', 'Push notifications', 'Offline functionality', 'Real-time sync', 'Social media integration', 'Payment integration', 'Analytics tracking', 'App Store optimization', 'Beta testing'],
      technologies: ['Swift iOS + SwiftUI', 'Kotlin Android + Jetpack Compose', 'React Native + Expo'],
      perfectFor: 'Startup-uri, afaceri cu prezență mobile, servicii on-demand',
      support: '12 luni suport tehnic inclus',
      includes: ['App Store accounts setup', 'Beta testing platform', 'Crash analytics']
    },
    {
      id: 'food-delivery-app',
      category: 'mobile',
      title: 'Aplicație Food Delivery',
      description: 'Platformă completă pentru livrare mâncare cu apps pentru clienți, restaurant și curieri',
      price: '4.000 - 7.000',
      duration: '6-8 săptămâni',
      popular: false,
      badge: 'DELIVERY',
      icon: '🍕',
      color: 'purple',
      features: ['Customer app (iOS/Android)', 'Restaurant dashboard', 'Courier driver app', 'Real-time tracking', 'Order management', 'Payment integration', 'Rating system', 'Push notifications', 'Delivery scheduling', 'Menu management', 'Analytics dashboard', 'Multi-language support'],
      technologies: ['React Native + Node.js', 'Swift iOS + Kotlin Android', 'Next.js + Python + MongoDB'],
      perfectFor: 'Restaurante, servicii de livrare, platforme food delivery',
      support: '12 luni suport tehnic inclus',
      includes: ['3 native apps', 'Real-time tracking system', 'Admin dashboard']
    },
    {
      id: 'fitness-wellness',
      category: 'mobile',
      title: 'Aplicație Fitness & Wellness',
      description: 'Aplicație completă pentru fitness cu workout-uri, nutrition tracking și comunitate',
      price: '3.500 - 6.500',
      duration: '5-7 săptămâni',
      popular: false,
      badge: 'FITNESS',
      icon: '💪',
      color: 'purple',
      features: ['Workout library', 'Exercise videos', 'Nutrition tracking', 'Progress analytics', 'Social features', 'Personalized plans', 'Wearable integration', 'Offline workouts', 'Challenges și gamification', 'Trainer profiles', 'Community forums', 'Premium subscription'],
      technologies: ['React Native + Python + TensorFlow', 'Swift iOS + Kotlin Android', 'Node.js + MongoDB'],
      perfectFor: 'Gym-uri, traineri personali, aplicații wellness',
      support: '12 luni suport tehnic inclus',
      includes: ['Video content delivery', 'Wearable device integration', 'Personalized AI recommendations']
    },
    {
      id: 'banking-fintech',
      category: 'mobile',
      title: 'Aplicație Banking Fintech',
      description: 'Aplicație bancară mobilă securizată cu transferuri, plăți și management conturi',
      price: '8.000 - 15.000',
      duration: '8-12 săptămâni',
      popular: false,
      badge: 'FINTECH',
      icon: '🏦',
      color: 'purple',
      features: ['Secure authentication', 'Account management', 'Money transfers', 'Bill payments', 'Card management', 'Transaction history', 'Budget tracking', 'Investment portfolio', 'Mobile check deposit', 'Biometric security', 'Multi-currency support', 'AI-powered insights'],
      technologies: ['Swift iOS + Kotlin Android + Native Security', 'Node.js + PostgreSQL + Blockchain', 'Python + Machine Learning'],
      perfectFor: 'Bănci, fintech startups, servicii financiare',
      support: '24 luni suport tehnic inclus',
      includes: ['Security audit', 'Regulatory compliance', '24/7 monitoring']
    },
    {
      id: 'healthcare-app',
      category: 'mobile',
      title: 'Aplicație Medicală',
      description: 'Platformă medicală mobilă cu telemedicine, programări și management fișe pacienți',
      price: '5.000 - 10.000',
      duration: '6-10 săptămâni',
      popular: false,
      badge: 'HEALTHCARE',
      icon: '🏥',
      color: 'purple',
      features: ['Video consultations', 'Appointment scheduling', 'Electronic health records', 'Prescription management', 'Medication reminders', 'Health tracking', 'Emergency contacts', 'Doctor-patient messaging', 'Lab results integration', 'Secure data storage', 'HIPAA compliance', 'Wearable device sync'],
      technologies: ['React Native + WebRTC + HIPAA Security', 'Swift iOS + Kotlin Android', 'Python + Django + PostgreSQL'],
      perfectFor: 'Clinici medicale, spitale, telemedicine services',
      support: '18 luni suport tehnic inclus',
      includes: ['HIPAA compliance setup', 'Secure video infrastructure', 'Medical data encryption']
    },
    {
      id: 'real-estate-app',
      category: 'mobile',
      title: 'Aplicație Imobiliară',
      description: 'Platformă imobiliară mobilă cu vizualizări proprietăți, tururi virtuale și agent communication',
      price: '4.000 - 7.500',
      duration: '5-8 săptămâni',
      popular: false,
      badge: 'REAL ESTATE',
      icon: '🏠',
      color: 'purple',
      features: ['Property search with filters', 'Virtual tours 3D', 'Property management', 'Agent communication', 'Saved searches', 'Mortgage calculator', 'Neighborhood insights', 'Photo/video galleries', 'Map integration', 'Appointment scheduling', 'Price alerts', 'Social sharing'],
      technologies: ['React Native + AR/VR', 'Swift iOS + Kotlin Android', 'Node.js + MongoDB + Maps API'],
      perfectFor: 'Agenții imobiliare, platforme imobiliare, real estate tech',
      support: '12 luni suport tehnic inclus',
      includes: ['AR/VR tour system', 'Maps integration', 'Property management dashboard']
    },

    // BUSINESS CATEGORY
    {
      id: 'crm-custom',
      category: 'business',
      title: 'CRM Custom Business',
      description: 'Sistem de management al relațiilor cu clienții personalizat pentru nevoile afacerii tale',
      price: '5.000 - 15.000',
      duration: '6-12 săptămâni',
      popular: true,
      badge: 'ENTERPRISE',
      icon: '👥',
      color: 'red',
      features: ['Management contacte și lead-uri', 'Pipeline de vânzări personalizat', 'Automatizări marketing', 'Email tracking', 'Calendar și task management', 'Rapoarte customizabile', 'Dashboard analytics', 'Integrare API terțe', 'Mobile app', 'Role-based access', 'Data export/import', 'Multi-language support'],
      technologies: ['React + Node.js + Express', 'PHP + Laravel + PostgreSQL', 'Python + Django + FastAPI + VLLM'],
      perfectFor: 'Agenții imobiliare, servicii financiare, B2B sales',
      support: '24 luni suport tehnic inclus',
      includes: ['Custom training', 'Data migration', 'API documentation']
    },
    {
      id: 'erp-solution',
      category: 'business',
      title: 'ERP Custom Enterprise',
      description: 'Soluție ERP completă pentru management integrat al resurselor și proceselor companiei',
      price: '10.000 - 25.000',
      duration: '10-16 săptămâni',
      popular: false,
      badge: 'ENTERPRISE',
      icon: '🏭',
      color: 'red',
      features: ['Financial management', 'Supply chain management', 'Human resources', 'Inventory management', 'Project management', 'Business intelligence', 'Multi-company support', 'Custom reporting', 'Workflow automation', 'Mobile access', 'Integration APIs', 'Advanced security'],
      technologies: ['Angular + Python + Django + FastAPI', 'React + Node.js + PostgreSQL', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Corporații, manufacturing, distribuție, retail enterprise',
      support: '36 luni suport tehnic inclus',
      includes: ['Full system integration', 'Employee training', 'Custom reporting tools']
    },
    {
      id: 'hr-management',
      category: 'business',
      title: 'Platformă HR Management',
      description: 'Sistem complet pentru managementul resurselor umane cu recruitment, payroll și performance',
      price: '4.000 - 8.000',
      duration: '6-9 săptămâni',
      popular: false,
      badge: 'HR SOLUTION',
      icon: '👤',
      color: 'red',
      features: ['Recruitment management', 'Employee database', 'Payroll processing', 'Performance reviews', 'Time tracking', 'Leave management', 'Benefits administration', 'Training management', 'Analytics dashboard', 'Employee self-service', 'Document management', 'Compliance tracking'],
      technologies: ['React + Node.js + PostgreSQL', 'Angular + Python + Django', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Departamente HR, companii medii și mari, HR consultanți',
      support: '18 luni suport tehnic inclus',
      includes: ['Payroll integration', 'Compliance setup', 'Employee portal']
    },
    {
      id: 'booking-system',
      category: 'business',
      title: 'Sistem Rezervări Programări',
      description: 'Platformă completă pentru managementul rezervărilor și programărilor online',
      price: '1.800 - 3.500',
      duration: '2-4 săptămâni',
      popular: false,
      badge: 'TRENDING',
      icon: '📅',
      color: 'indigo',
      features: ['Calendar rezervări interactive', 'Management personal și servicii', 'Automatizări email/SMS', 'Payment integration', 'Reminder system', 'Customer profiles', 'Reviews și ratings', 'Multi-location support', 'Mobile responsive', 'Sync Google Calendar', 'Recurring appointments', 'Waitlist management'],
      technologies: ['Vue.js + Node.js + Express', 'React + Python + Django', 'Next.js + MongoDB + WebRTC'],
      perfectFor: 'Clinici medicale, saloane, consultanți, service auto',
      support: '6 luni suport tehnic inclus',
      includes: ['SMS gateway', 'Email templates', 'Video consultation integration']
    },
    {
      id: 'project-management',
      category: 'business',
      title: 'Platformă Project Management',
      description: 'Sistem avansat pentru managementul proiectelor cu colaborare echipă și tracking automatizat',
      price: '3.500 - 7.000',
      duration: '5-8 săptămâni',
      popular: false,
      badge: 'AGILE',
      icon: '📊',
      color: 'red',
      features: ['Task management', 'Team collaboration', 'Gantt charts', 'Time tracking', 'Resource allocation', 'Budget management', 'Reporting dashboard', 'Kanban boards', 'File sharing', 'Communication tools', 'Mobile app', 'Integration APIs'],
      technologies: ['React + Node.js + MongoDB', 'Angular + Python + Django', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Agenții, software teams, departamente de proiecte',
      support: '12 luni suport tehnic inclus',
      includes: ['Team training', 'Integration setup', 'Custom workflows']
    },
    {
      id: 'inventory-management',
      category: 'business',
      title: 'Sistem Management Stocuri',
      description: 'Platformă completă pentru managementul stocurilor cu tracking real-time și automatizări',
      price: '3.000 - 6.000',
      duration: '4-6 săptămâni',
      popular: false,
      badge: 'INVENTORY',
      icon: '📦',
      color: 'red',
      features: ['Real-time inventory tracking', 'Barcode/QR code scanning', 'Stock level alerts', 'Supplier management', 'Purchase orders', 'Warehouse management', 'Reporting și analytics', 'Multi-location support', 'Mobile app', 'Integration with accounting', 'Batch tracking', 'Automated reordering'],
      technologies: ['React + Node.js + PostgreSQL', 'Vue.js + Python + Django', 'Next.js + PHP + Symfony'],
      perfectFor: 'Retail, wholesale, manufacturing, distribuție',
      support: '12 luni suport tehnic inclus',
      includes: ['Barcode system setup', 'Mobile inventory app', 'Supplier portal']
    },

    // INDUSTRY SPECIFIC
    {
      id: 'healthcare-platform',
      category: 'healthcare',
      title: 'Platformă Medicală Completă',
      description: 'Sistem integrat pentru management clinică cu EHR, programări și telemedicine',
      price: '8.000 - 18.000',
      duration: '8-14 săptămâni',
      popular: false,
      badge: 'HEALTHCARE',
      icon: '🏥',
      color: 'green',
      features: ['Electronic Health Records (EHR)', 'Patient management', 'Appointment scheduling', 'Telemedicine platform', 'Billing și insurance', 'Lab results management', 'Prescription system', 'Doctor dashboard', 'Patient portal', 'HIPAA compliance', 'Reporting analytics', 'Mobile apps'],
      technologies: ['React + Node.js + PostgreSQL + HIPAA', 'Python + Django + TensorFlow', 'Angular + FastAPI + MongoDB'],
      perfectFor: 'Clinici medicale, spitale, telemedicine, healthcare startups',
      support: '24 luni suport tehnic inclus',
      includes: ['HIPAA compliance setup', 'Secure infrastructure', 'Medical staff training']
    },
    {
      id: 'banking-core',
      category: 'banking',
      title: 'Core Banking System',
      description: 'Sistem bancar central securizat cu conturi, tranzacții și conformitate regulamentară',
      price: '15.000 - 50.000',
      duration: '12-20 săptămâni',
      popular: false,
      badge: 'BANKING',
      icon: '🏦',
      color: 'blue',
      features: ['Account management', 'Transaction processing', 'Loan management', 'Credit scoring', 'Risk assessment', 'Regulatory reporting', 'Multi-currency support', 'Fraud detection', 'API gateway', 'Customer portal', 'Compliance automation', 'Audit trails'],
      technologies: ['Java Spring Boot + PostgreSQL', 'Python + ML + Blockchain', 'React + Node.js + Redis'],
      perfectFor: 'Bănci, fintech, neobanks, instituții financiare',
      support: '36 luni suport tehnic inclus',
      includes: ['Regulatory compliance', 'Security audit', 'High availability setup']
    },
    {
      id: 'manufacturing-mes',
      category: 'manufacturing',
      title: 'Manufacturing Execution System',
      description: 'Sistem de execuție producție cu tracking real-time și control calitate automatizat',
      price: '10.000 - 25.000',
      duration: '10-16 săptămâni',
      popular: false,
      badge: 'MANUFACTURING',
      icon: '⚙️',
      color: 'gray',
      features: ['Production scheduling', 'Quality control', 'Equipment monitoring', 'Workforce management', 'Inventory tracking', 'Maintenance scheduling', 'Real-time dashboards', 'Production analytics', 'Compliance tracking', 'IoT integration', 'Mobile access', 'Reporting tools'],
      technologies: ['Angular + Python + Django + IoT', 'React + Node.js + TimescaleDB', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Manufacturing, production facilities, industrial companies',
      support: '24 luni suport tehnic inclus',
      includes: ['IoT sensor integration', 'Production optimization', 'Staff training']
    },
    {
      id: 'retail-pos',
      category: 'retail',
      title: 'Retail POS System',
      description: 'Sistem POS complet pentru retail cu management inventar, loialitate și analytics avansate',
      price: '4.000 - 9.000',
      duration: '6-10 săptămâni',
      popular: false,
      badge: 'RETAIL',
      icon: '🛍️',
      color: 'purple',
      features: ['Point of Sale interface', 'Inventory management', 'Customer management', 'Loyalty programs', 'Payment processing', 'Sales reporting', 'Multi-store support', 'Employee management', 'Discount management', 'Receipt printing', 'Offline mode', 'Cloud sync'],
      technologies: ['Electron + React + Node.js', 'Python + Django + PostgreSQL', 'Native iOS/Android apps'],
      perfectFor: 'Retail stores, chain stores, shops, restaurants',
      support: '18 luni suport tehnic inclus',
      includes: ['Hardware integration', 'Training staff', 'Data migration']
    },
    {
      id: 'legal-case-management',
      category: 'legal',
      title: 'Legal Case Management',
      description: 'Platformă pentru managementul cazurilor legale cu documente, calendar și billing automatizat',
      price: '5.000 - 12.000',
      duration: '7-12 săptămâni',
      popular: false,
      badge: 'LEGAL',
      icon: '⚖️',
      color: 'darkblue',
      features: ['Case management', 'Document management', 'Calendar și deadlines', 'Time tracking', 'Billing și invoicing', 'Client portal', 'Legal research tools', 'Compliance tracking', 'Secure communication', 'Reporting analytics', 'Mobile access', 'Integration APIs'],
      technologies: ['React + Node.js + PostgreSQL', 'Angular + Python + Django', 'Vue.js + PHP + Symfony'],
      perfectFor: 'Law firms, legal departments, solo practitioners',
      support: '24 luni suport tehnic inclus',
      includes: ['Legal document templates', 'Compliance setup', 'Client portal setup']
    },
    {
      id: 'insurance-platform',
      category: 'insurance',
      title: 'Insurance Management Platform',
      description: 'Platformă completă pentru management polițe, procesare daune și clienți',
      price: '8.000 - 20.000',
      duration: '10-16 săptămâni',
      popular: false,
      badge: 'INSURANCE',
      icon: '🛡️',
      color: 'red',
      features: ['Policy management', 'Claims processing', 'Customer management', 'Risk assessment', 'Underwriting tools', 'Payment processing', 'Reporting analytics', 'Compliance tracking', 'Agent portal', 'Customer portal', 'Document management', 'Integration APIs'],
      technologies: ['Angular + Python + Django + ML', 'React + Node.js + PostgreSQL', 'Vue.js + PHP + Laravel'],
      perfectFor: 'Insurance companies, brokers, MGAs',
      support: '36 luni suport tehnic inclus',
      includes: ['Compliance setup', 'Risk models', 'Agent training']
    },

    // GENERAL/BUSINESS SERVICES
    {
      id: 'professional-site',
      category: 'all',
      title: 'Site Prezentare Profesional',
      description: 'Site corporate modern optimizat pentru conversii și branding profesional',
      price: '1.000 - 2.500',
      duration: '1-2 săptămâni',
      popular: true,
      badge: '#3 ACCESIBIL',
      icon: '🏢',
      color: 'emerald',
      features: ['Design modern și profesional', 'Optimizat pentru conversii', 'Formular contact avansat', 'Integrare social media', 'Blog cu CMS', 'Google Analytics', 'SEO on-page optimizare', 'Galerie foto/video', 'Testimoniale section', 'FAQ section', 'Chat integration', 'Performance optimizare'],
      technologies: ['React + Next.js + TypeScript', 'Vue.js + Nuxt.js + Python', 'Angular + Node.js + PostgreSQL'],
      perfectFor: 'Companii, freelanceri, consultanți, servicii profesionale',
      support: '3 luni suport tehnic inclus',
      includes: ['Performance monitoring', 'Security updates', 'Monthly backups']
    }
  ]

  const faqs = [
    {
      question: "Cât durează dezvoltarea unui proiect?",
      answer: "Depinde de complexitate. Un site de prezentare: 1-2 săptămâni. Magazin online: 2-3 săptămâni. Aplicație mobilă: 4-8 săptămâni. Oferim timeline detaliat în faza de ofertare."
    },
    {
      question: "Pot vedea progresul proiectului în timp real?",
      answer: "Absolut! Oferim acces la un dashboard client dedicat unde poți monitoriza: progresul general al proiectului (procentaj completat), task-urile active cu status-uri (To Do, In Progress, Review, Done), timeline-ul cu deadline-uri clare, poze/video-uri din etapa de dezvoltare, comunicare directă cu echipa și fișiere pentru feedback. Transparența totală este prioritatea noastră!"
    },
    {
      question: "Ce tehnologii folosiți?",
      answer: "Dezvoltăm exclusiv soluții custom, fără a ne baza pe platforme CMS pre-existente. Folosim tehnologii moderne și scalabile: Frontend (React, Next.js, Vue.js, Angular, TypeScript), Backend (Node.js, Express, PHP, Laravel, Symfony, Python/Django/FastAPI), Mobile (React Native, Flutter, Swift/Kotlin native), AI/ML (Python, TensorFlow, VLLM, LangChain), Baze de date (PostgreSQL, MySQL, MongoDB, Redis) și DevOps (Docker, Kubernetes Cluster, Servere Proprii, CI/CD pipelines, Nginx, Prometheus, Grafana). Totul este programat 100% custom pentru nevoile tale specifice."
    },
    {
      question: "Oferiți suport după livrare?",
      answer: "Da, toate proiectele includ suport tehnic. Durata variază între 3-24 luni în funcție de pachetul ales. Oferim și pachete de mentenanță extinsă."
    },
    {
      question: "Cum funcționează plata?",
      answer: "Plata se face în tranșe: 40% avans la semnare contract, 40% la livrare proiect, 20% la finalizare și lansare. Acceptăm transfer bancar și card."
    },
    {
      question: "Oferiți garanție?",
      answer: "Da, oferim garanție 12 luni pentru bug-uri și erori de funcționare. Mentenanța și actualizările sunt incluse în perioada de suport."
    },
    {
      question: "Puteți lucra cu afaceri internaționale?",
      answer: "Absolut! Avem clienți din toată Europa și SUA. Lucrăm în engleză, română și franceză. Oferim suport în fusuri orare diferite."
    }
  ]

  const filteredServices = selectedCategory === 'popular'
    ? services.filter(service => service.popular)
    : services.filter(service => service.category === selectedCategory).slice(0, 6)

  const getColorClasses = (color: string) => {
    const colors = {
      orange: {
        border: 'border-amber-500',
        iconBg: 'bg-amber-100 dark:bg-amber-900/30',
        iconText: 'text-amber-600 dark:text-amber-400',
        text: 'text-amber-600',
        badge: 'bg-amber-500 text-white'
      },
      blue: {
        border: 'border-sky-500',
        iconBg: 'bg-sky-100 dark:bg-sky-900/30',
        iconText: 'text-sky-600 dark:text-sky-400',
        text: 'text-sky-600',
        badge: 'bg-sky-500 text-white'
      },
      emerald: {
        border: 'border-teal-500',
        iconBg: 'bg-teal-100 dark:bg-teal-900/30',
        iconText: 'text-teal-600 dark:text-teal-400',
        text: 'text-teal-600',
        badge: 'bg-teal-500 text-white'
      },
      purple: {
        border: 'border-violet-500',
        iconBg: 'bg-violet-100 dark:bg-violet-900/30',
        iconText: 'text-violet-600 dark:text-violet-400',
        text: 'text-violet-600',
        badge: 'bg-violet-500 text-white'
      },
      red: {
        border: 'border-rose-500',
        iconBg: 'bg-rose-100 dark:bg-rose-900/30',
        iconText: 'text-rose-600 dark:text-rose-400',
        text: 'text-rose-600',
        badge: 'bg-rose-500 text-white'
      },
      indigo: {
        border: 'border-indigo-500',
        iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
        iconText: 'text-indigo-600 dark:text-indigo-400',
        text: 'text-indigo-600',
        badge: 'bg-indigo-500 text-white'
      },
      green: {
        border: 'border-emerald-500',
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
        iconText: 'text-emerald-600 dark:text-emerald-400',
        text: 'text-emerald-600',
        badge: 'bg-emerald-500 text-white'
      },
      gray: {
        border: 'border-slate-500',
        iconBg: 'bg-slate-100 dark:bg-slate-900/30',
        iconText: 'text-slate-600 dark:text-slate-400',
        text: 'text-slate-600',
        badge: 'bg-slate-500 text-white'
      },
      darkblue: {
        border: 'border-blue-700',
        iconBg: 'bg-blue-100 dark:bg-blue-900/30',
        iconText: 'text-blue-700 dark:text-blue-400',
        text: 'text-blue-700',
        badge: 'bg-blue-700 text-white'
      }
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-white dark:bg-slate-950 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900/30 dark:to-slate-950"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-slate-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-slate-900/20 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-200 dark:bg-slate-900/20 rounded-full blur-2xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-slate-900/50 border border-blue-200 dark:border-slate-700 rounded-full mb-6 animate-pulse">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Servicii Premium</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Soluții Digitale
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent block mt-2">
                pentru Afacerea Ta
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto text-pretty leading-relaxed mb-8">
              Transformăm ideile tale în produse digitale de succes cu peste 10 ani de experiență și 300+ proiecte livrate
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {[
                { value: '300+', label: 'Proiecte Livrate', icon: '🚀' },
                { value: '50+', label: 'Clienți Fericiți', icon: '😊' },
                { value: '10+', label: 'Ani Experiență', icon: '⭐' },
                { value: '98%', label: 'Satisfacție', icon: '💯' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <Phone className="h-5 w-5" />
                Cere Ofertă Rapidă
              </Link>
              <Link href="#process" className="inline-flex items-center gap-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                <Calendar className="h-5 w-5" />
                Procesul Nostru
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Alege Categoria Dorită</h2>
            <p className="text-gray-600 dark:text-gray-400">Selectează tipul de serviciu care te interesează</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 border-2 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-xs opacity-75">{category.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const colors = getColorClasses(service.color)
              return (
                <Card
                  key={service.id}
                  className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border-2 ${colors.border} p-6 hover:shadow-xl transition-all duration-300 group relative cursor-pointer hover:scale-105 hover:shadow-${colors.border.split('-')[1]}/20`}
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  {service.badge && (
                    <div className={`absolute top-3 right-3 ${colors.badge} px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg`}>
                      {service.badge}
                    </div>
                  )}

                  <div className="relative">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 ${colors.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <span className={`text-3xl ${colors.iconText}`}>{service.icon}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">{service.title}</h3>
                      <div className={`text-xl font-bold ${colors.text} mb-2`}>{service.price} €</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-center line-clamp-3">
                      {service.description}
                    </p>

                    {/* Expanded Details */}
                    {selectedService === service.id && (
                      <div className="space-y-4 animate-in slide-in-from-top duration-300">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Funcționalități
                          </h4>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {service.features.slice(0, 8).map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                            <Code className="h-5 w-5 text-blue-500" />
                            Tehnologii
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.slice(0, 4).map((tech, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                                {tech.split(' + ')[0]}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                            <Target className="h-5 w-5 text-orange-500" />
                            Perfect Pentru
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{service.perfectFor}</p>
                        </div>
                      </div>
                    )}

                    <div className="text-center mt-6">
                      <Link href="/contact" className={`inline-flex items-center gap-2 ${colors.badge} text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg`}>
                        {selectedService === service.id ? 'Cere Ofertă' : 'Detalii'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Procesul Nostru de Lucru
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Un proces transparent și eficient care transformă viziunea ta în realitate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative h-full">
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
                )}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{step.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ce Spun Clienții Noștri
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Peste 50+ clienți mulțumiți care au ales soluțiile noastre digitale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Proiect: {testimonial.project}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Întrebări Frecvente
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Răspunsuri la cele mai comune întrebări despre serviciile noastre
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <details className="group p-6 cursor-pointer">
                  <summary className="flex items-center justify-between font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {faq.question}
                    <ChevronRight className="h-5 w-5 group-open:rotate-90 transition-transform duration-300" />
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-[90vw] md:max-w-full mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Rocket className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium text-white">Start Proiect</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Gata să Transformăm Ideea Ta în Realitate?
              </h3>
              <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                Hai să discutăm despre proiectul tău și să îți oferim o soluție personalizată care să depășească așteptările.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Cere Ofertă Acum
                </Link>
                <Link href="mailto:contact@visualstudio.ro" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Consultanță
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-white/80 text-sm">
                  <strong>Răspuns în 24h</strong> • Consultanță Gratuită • Garanție 12 Luni
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}