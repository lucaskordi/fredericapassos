'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Lottie from 'lottie-react'
import bookAnimation from '../../public/bookat2.json'
import documentAnimation from '../../public/Document.json'
import videoAnimation from '../../public/video.json'

export default function InicioPage() {
  const [isAgendeHovered, setIsAgendeHovered] = useState(false)
  const [isContrateHovered, setIsContrateHovered] = useState(false)
  const [activeSection, setActiveSection] = useState('Início')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<Set<string>>(new Set())
  const [currentFormacao, setCurrentFormacao] = useState(0)
  const [hoveredContrateFormacao, setHoveredContrateFormacao] = useState<number | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [hoveredFooterItem, setHoveredFooterItem] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 50, y: 50 })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [typewriterText, setTypewriterText] = useState('')
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [hoveredRecurso, setHoveredRecurso] = useState<string | null>(null)
  const [openRecurso, setOpenRecurso] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoConsulta: '',
    mensagem: ''
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEnviarHovered, setIsEnviarHovered] = useState(false)
  const [statsCounters, setStatsCounters] = useState({
    mulheres: 0,
    melhoria: 0,
    profissionais: 0,
    satisfacao: 0
  })
  const [statsVisible, setStatsVisible] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const statsRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const typewriterRef = useRef<HTMLDivElement>(null)
  const sobreRef = useRef<HTMLElement>(null)
  const areasRef = useRef<HTMLElement>(null)
  const formacoesRef = useRef<HTMLElement>(null)
  const recursosRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const contatoRef = useRef<HTMLElement>(null)
  const ebookButtonRef = useRef<HTMLDivElement>(null)
  const artigosButtonRef = useRef<HTMLDivElement>(null)
  const videosButtonRef = useRef<HTMLDivElement>(null)
  const mulherCardRef = useRef<HTMLDivElement>(null)
  const parentalCardRef = useRef<HTMLDivElement>(null)
  const perinatalCardRef = useRef<HTMLDivElement>(null)
  const sexhumanCardRef = useRef<HTMLDivElement>(null)

  const formatarTelefonePortugal = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length === 0) return ''
    if (numbers.startsWith('351')) {
      const withoutCountry = numbers.slice(3)
      if (withoutCountry.length <= 3) return `+351 ${withoutCountry}`
      if (withoutCountry.length <= 6) return `+351 ${withoutCountry.slice(0, 3)} ${withoutCountry.slice(3)}`
      return `+351 ${withoutCountry.slice(0, 3)} ${withoutCountry.slice(3, 6)} ${withoutCountry.slice(6, 9)}`
    }
    if (numbers.length <= 3) return `+351 ${numbers}`
    if (numbers.length <= 6) return `+351 ${numbers.slice(0, 3)} ${numbers.slice(3)}`
    return `+351 ${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`
  }

  const slides = [
    { id: 0, color: '#70309e', label: 'Roxo' },
    { id: 1, color: '#f56428', label: 'Laranja' },
    { id: 2, color: '#6b7280', label: 'Cinza' },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Ref e scroll para efeito parallax
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const parallaxX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  // Ref e scroll para efeito parallax da faixa
  const faixaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: faixaScrollYProgress } = useScroll({
    target: faixaRef,
    offset: ['start end', 'end start']
  })
  const faixaParallaxY = useTransform(faixaScrollYProgress, [0, 1], ['-30%', '30%'])

  // Ref e scroll para efeito parallax da barra roxa
  const typewriterBarRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: typewriterScrollYProgress } = useScroll({
    target: typewriterBarRef,
    offset: ['start end', 'end start']
  })
  const typewriterParallaxY = useTransform(typewriterScrollYProgress, [0, 1], ['-30%', '30%'])

  const menuItems = [
    'Início',
    'Sobre',
    'Áreas de Atuação',
    'Serviços',
    'Contato'
  ]

  const scrollToSection = (sectionName: string) => {
    const sectionMap: Record<string, string> = {
      'Início': '',
      'Sobre': 'Sobre',
      'Áreas de Atuação': 'Áreas de Especialização',
      'Serviços': 'Formações e Cursos Profissionais',
      'Contato': 'Contato'
    }

    const sectionId = sectionMap[sectionName]
    
    if (sectionId === '') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    
    setActiveSection(sectionName)
  }

  // Função para scroll suave ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Effect para controlar visibilidade do header e botão scroll to top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Controlar botão scroll to top
      setShowScrollTop(currentScrollY > 300)
      
      // Controlar header
      if (currentScrollY < 100) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    let rafId: number | null = null
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        if (footerRef.current) {
          const rect = footerRef.current.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width) * 100
          const y = ((e.clientY - rect.top) / rect.height) * 100
          setMousePosition({ x, y })
        }
        rafId = null
      })
    }

    const footer = footerRef.current
    if (footer) {
      footer.addEventListener('mousemove', handleMouseMove, { passive: true })
      return () => {
        footer.removeEventListener('mousemove', handleMouseMove)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }
  }, [])

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor
    let animationId: number | null = null
    
    const animate = () => {
      setSmoothPosition(prev => {
        const diffX = Math.abs(prev.x - mousePosition.x)
        const diffY = Math.abs(prev.y - mousePosition.y)
        
        if (diffX < 0.01 && diffY < 0.01) {
          if (animationId) {
            cancelAnimationFrame(animationId)
            animationId = null
          }
          return prev
        }
        
        return {
          x: lerp(prev.x, mousePosition.x, 0.08),
          y: lerp(prev.y, mousePosition.y, 0.08),
        }
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [mousePosition])

  // Frases para o typewriter
  const phrases = [
    'Diagnóstico: Ser Humano.',
    'Tá Tudo Bem não Estar Bem.',
    'Cuidar da Mente é Revolucionário.'
  ]

  // Efeito typewriter
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    
    if (isTyping) {
      // Escrevendo
      if (typewriterText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setTypewriterText(currentPhrase.slice(0, typewriterText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        // Pausa antes de apagar (após terminar de escrever)
        const pauseTimeout = setTimeout(() => {
          setIsTyping(false)
        }, 3000)
        return () => clearTimeout(pauseTimeout)
      }
    } else {
      // Apagando
      if (typewriterText.length > 0) {
        const timeout = setTimeout(() => {
          setTypewriterText(typewriterText.slice(0, -1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        // Pausa antes de passar para próxima frase
        const pauseTimeout = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          setIsTyping(true)
        }, 500)
        return () => clearTimeout(pauseTimeout)
      }
    }
  }, [typewriterText, isTyping, currentPhraseIndex, phrases])

  // Iniciar typewriter ao montar
  useEffect(() => {
    if (typewriterText === '' && isTyping && phrases.length > 0) {
      setTypewriterText(phrases[0][0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 640)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [statsVisible])

  useEffect(() => {
    if (!statsVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const targets = {
      mulheres: 500,
      melhoria: 85,
      profissionais: 50,
      satisfacao: 90
    }

    const timers: NodeJS.Timeout[] = []
    let currentStep = 0

    const animate = () => {
      if (currentStep >= steps) return

      const progress = currentStep / steps
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)

      setStatsCounters({
        mulheres: Math.floor(targets.mulheres * easeOutCubic),
        melhoria: Math.floor(targets.melhoria * easeOutCubic),
        profissionais: Math.floor(targets.profissionais * easeOutCubic),
        satisfacao: Math.floor(targets.satisfacao * easeOutCubic)
      })

      currentStep++
      const timer = setTimeout(animate, interval)
      timers.push(timer)
    }

    animate()

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [statsVisible])

  useEffect(() => {
    const sections = [
      { ref: sobreRef, id: 'Sobre' },
      { ref: areasRef, id: 'Áreas de Especialização' },
      { ref: formacoesRef, id: 'Formações e Cursos Profissionais' },
      { ref: recursosRef, id: 'Recursos Educativos' },
      { ref: faqRef, id: 'FAQ' },
      { ref: contatoRef, id: 'Contato' }
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section-id')
            if (sectionId) {
              setVisibleSections((prev) => new Set([...Array.from(prev), sectionId]))
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    sections.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-section-id', id)
        observer.observe(ref.current)
      }
    })

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openRecurso) {
        const target = event.target as Node
        const isOutsideEbook = ebookButtonRef.current && !ebookButtonRef.current.contains(target)
        const isOutsideArtigos = artigosButtonRef.current && !artigosButtonRef.current.contains(target)
        const isOutsideVideos = videosButtonRef.current && !videosButtonRef.current.contains(target)

        if (isOutsideEbook && isOutsideArtigos && isOutsideVideos) {
          setOpenRecurso(null)
          setHoveredRecurso(null)
        }
      }
    }

    if (openRecurso) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openRecurso])

  useEffect(() => {
    if (!isMobile) return

    const cards = [
      { ref: mulherCardRef, id: 'mulher' },
      { ref: parentalCardRef, id: 'parental' },
      { ref: perinatalCardRef, id: 'perinatal' },
      { ref: sexhumanCardRef, id: 'sexhuman' }
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute('data-card-id')
          if (cardId) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setHoveredCard((prev) => new Set([...Array.from(prev), cardId]))
            } else {
              setHoveredCard((prev) => {
                const newSet = new Set(prev)
                newSet.delete(cardId)
                return newSet
              })
            }
          }
        })
      },
      { threshold: [0, 0.5, 1] }
    )

    cards.forEach(({ ref, id }) => {
      if (ref.current) {
        ref.current.setAttribute('data-card-id', id)
        observer.observe(ref.current)
      }
    })

    return () => {
      cards.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [isMobile])

  return (
    <div className="min-h-screen bg-[#f2ede7] pt-16 md:pt-20">
      {/* Header */}
      <motion.header
        className="bg-[#f2ede7] w-full shadow-sm fixed top-0 left-0 right-0 z-50"
        initial={{ y: 0 }}
        animate={{
          y: isHeaderVisible ? 0 : -100,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 relative">
            {/* Logo */}
            <div className="flex-shrink-0 z-10">
              <Image
                src="/logohoriz.svg"
                alt="Logo Dra. Frederica Passos"
                width={200}
                height={60}
                className="h-10 md:h-12 w-auto object-contain"
                priority
              />
            </div>

            {/* Menu Items - Desktop - Centralizado na página */}
            <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-6 lg:space-x-8">
              {menuItems.map((item) => {
                const isActive = activeSection === item
                const isHovered = hoveredItem === item
                const showLine = isActive || isHovered
                
                return (
                  <button
                    key={item}
                    className="font-neue-montreal text-sm lg:text-base relative px-2 py-1 transition-all duration-200 text-center"
                    style={{
                      color: isActive || isHovered ? '#70309e' : '#6b7280',
                      fontWeight: isActive ? 600 : 400,
                    }}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => scrollToSection(item)}
                  >
                    {item}
                    
                    {/* Linha laranja animada */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-0.5"
                      style={{
                        backgroundColor: '#f56428',
                        transformOrigin: 'center',
                      }}
                      initial={{ width: 0, x: '-50%' }}
                      animate={{
                        width: showLine ? '100%' : 0,
                        x: '-50%',
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  </button>
                )
              })}
            </nav>

            {/* Botão Agende Agora */}
            <div className="flex-shrink-0 z-10 hidden sm:block">
              <motion.button
                className="font-neue-montreal text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-xs sm:text-sm md:text-base font-medium relative overflow-hidden"
                style={{
                  backgroundColor: '#f56428',
                  borderRadius: '8px',
                }}
                onHoverStart={() => setIsAgendeHovered(true)}
                onHoverEnd={() => setIsAgendeHovered(false)}
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                {/* Gradiente animado no hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, #f56428 0%, #70309e 100%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isAgendeHovered ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                />
                <span className="relative z-10">Agende Agora</span>
              </motion.button>
            </div>

            {/* Menu Mobile - Hamburger Animado */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden z-50 relative w-8 h-8 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <motion.div
                className="absolute w-6 h-6 flex flex-col justify-center items-center"
                animate={isMobileMenuOpen ? 'open' : 'closed'}
              >
                <motion.span
                  className="block w-6 h-0.5 bg-[#70309e] rounded-full mb-1.5"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-[#70309e] rounded-full mb-1.5"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-0.5 bg-[#70309e] rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </button>

            {/* Menu Fullscreen Mobile */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  className="fixed inset-0 bg-white z-40 md:hidden flex"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
                {/* Menu Items e Logo agrupados */}
                <div className="flex flex-col items-center">
                  {/* Menu Items */}
                  <nav className="flex flex-col items-center gap-8 mb-12">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item}
                        onClick={() => {
                          scrollToSection(item)
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-2xl font-neue-montreal"
                        style={{ color: '#f56428' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: isMobileMenuOpen ? 1 : 0,
                          y: isMobileMenuOpen ? 0 : 20
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                          ease: 'easeOut'
                        }}
                      >
                        {item}
                      </motion.button>
                    ))}
                  </nav>

                  {/* Logo */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isMobileMenuOpen ? 1 : 0,
                      y: isMobileMenuOpen ? 0 : 20
                    }}
                    transition={{
                      duration: 0.4,
                      delay: menuItems.length * 0.1,
                      ease: 'easeOut'
                    }}
                  >
                    <Image
                      src="/logohoriz.svg"
                      alt="Logo"
                      width={150}
                      height={50}
                      className="h-8 w-auto"
                    />
                  </motion.div>
                </div>
              </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Carrossel */}
      <main className="w-full relative">
        <div ref={heroRef} className="relative w-full h-[450px] sm:h-[550px] md:h-[700px] overflow-hidden">
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => {
              const isActive = index === currentSlide
              const isNext = index > currentSlide
              const isPrev = index < currentSlide
              
              return (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                animate={{
                  x: isActive ? '0%' : isNext ? '100%' : '-100%',
                  zIndex: isActive ? 1 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
                style={{
                  backgroundColor: slide.color,
                }}
              >
                {/* Banner roxo */}
                {slide.color === '#70309e' && (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {/* Desktop */}
                    <Image
                      src="/banner01.jpg"
                      alt=""
                      fill
                      className="object-cover hidden sm:block"
                      style={{ transform: 'scale(1.1)' }}
                      quality={100}
                      unoptimized
                      priority={index === currentSlide}
                    />
                    {/* Mobile */}
                    <Image
                      src="/banner01mob.jpg"
                      alt=""
                      fill
                      className="block sm:hidden w-full"
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        width: '100%',
                        minWidth: '100%'
                      }}
                      quality={100}
                      unoptimized
                      priority={index === currentSlide}
                    />
                  </div>
                )}

                {/* Banner cinza */}
                {slide.color === '#6b7280' && (
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {/* Desktop */}
                    <Image
                      src="/banner02.jpg"
                      alt=""
                      fill
                      className="object-cover hidden sm:block"
                      quality={100}
                      unoptimized
                      priority={index === currentSlide}
                    />
                    {/* Mobile */}
                    <Image
                      src="/banner02mob.jpg"
                      alt=""
                      fill
                      className="block sm:hidden w-full"
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        width: '100%',
                        minWidth: '100%'
                      }}
                      quality={100}
                      unoptimized
                      priority={index === currentSlide}
                    />
                  </div>
                )}

                {/* Background SVG no slide laranja com parallax */}
                {slide.color === '#f56428' && (
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'url(/srosa.svg)',
                      backgroundSize: isMobile ? '200%' : 'clamp(35%, 50vw, 60%)',
                      backgroundPosition: isMobile ? 'center center' : '5% center',
                      backgroundRepeat: 'no-repeat',
                      opacity: 1,
                      x: parallaxX,
                      y: parallaxY,
                    }}
                  />
                )}
                
                {/* Conteúdo no slide laranja */}
                {slide.color === '#f56428' && (
                  <>
                    {/* Textos e botão - Centralizados */}
                    <div className="absolute left-0 top-0 bottom-0 w-full flex items-center z-10">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center sm:justify-end pr-4 sm:pr-8 md:pr-16 lg:pr-24">
                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 text-white text-center sm:text-left">
                          <h1 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight">
                            Prazer,<br />
                            Frederica Passos
                          </h1>
                          
                          <p className="font-neue-montreal text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-lg">
                            Psiquiatria Perinatal e Sexualidade Humana.<br />
                            Consultas presenciais e online.
                          </p>
                          
                          <motion.button
                            className="font-neue-montreal text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base md:text-lg font-medium relative overflow-hidden w-fit self-center sm:self-start"
                            style={{
                              backgroundColor: '#70309e',
                              borderRadius: '8px',
                            }}
                            onHoverStart={() => setIsContrateHovered(true)}
                            onHoverEnd={() => setIsContrateHovered(false)}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                              duration: 0.3,
                              ease: 'easeInOut',
                            }}
                          >
                            {/* Gradiente animado no hover */}
                            <motion.div
                              className="absolute inset-0 rounded-lg"
                              style={{
                                background: `linear-gradient(135deg, #70309e 0%, #f56428 100%)`,
                              }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isContrateHovered ? 1 : 0 }}
                              transition={{
                                duration: 0.4,
                                ease: 'easeInOut',
                              }}
                            />
                            <span className="relative z-10">Contrate</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
              )
            })}
          </div>

          {/* Setas de navegação */}
          {/* Seta esquerda */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-200"
            aria-label="Slide anterior"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Seta direita */}
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-200"
            aria-label="Próximo slide"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Contadores clicáveis (dots) */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className="relative"
                aria-label={`Ir para slide ${index + 1}`}
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-white/50 cursor-pointer"
                  animate={{
                    backgroundColor: index === currentSlide ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)',
                    scale: index === currentSlide ? 1.2 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Faixa cinza escuro com texto rolando */}
      <div className="w-full bg-[#161616] py-2 sm:py-3 md:py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex font-jh-caudemars text-white text-sm sm:text-base md:text-xl lg:text-2xl"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 120,
                ease: 'linear',
              },
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`text-1-${i}`} className="mr-2 sm:mr-3 md:mr-4">
                Psiquiatria Contemporânea para Mentes que não cabem em Rótulos.
              </span>
            ))}
          </motion.div>
          <motion.div
            className="flex font-jh-caudemars text-white text-sm sm:text-base md:text-xl lg:text-2xl"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 120,
                ease: 'linear',
              },
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`text-2-${i}`} className="mr-2 sm:mr-3 md:mr-4">
                Psiquiatria Contemporânea para Mentes que não cabem em Rótulos.
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Seção Sobre */}
      <motion.section
        ref={sobreRef}
        id="Sobre"
        className="w-full bg-[#f2ede7] py-12 sm:py-16 md:py-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: visibleSections.has('Sobre') ? 1 : 0,
          y: visibleSections.has('Sobre') ? 0 : 50
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
            {/* Texto - Lado Esquerdo */}
            <div className="flex-1 lg:flex-[1.5]">
              <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 sm:mb-8" style={{ color: '#70309e' }}>
                Uma Carreira Dedicada à Saúde Mental da Mulher
              </h2>
              
              <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base md:text-lg">
                <p className="font-neue-montreal leading-relaxed">
                  <strong>Dra. Frederica Passos Barbizani</strong> é psiquiatra especializada em Saúde Mental da Mulher. Com foco no universo feminino, acredita que toda mulher merece cuidados de saúde mental que respeitem suas particularidades biológicas, psicológicas e sociais.
                </p>
                
                <p className="font-neue-montreal leading-relaxed">
                  Especializou-se em Psiquiatria no Hospital Beatriz Ângelo, com foco em Psiquiatria da Mulher e Psiquiatria Perinatal. Sua prática clínica baseia-se em pilares fundamentais: cuidado humanizado, evidência científica, abordagem integral e empoderamento da paciente. Dedica-se também à investigação científica, com interesse particular em perturbações do humor no período perinatal, impacto hormonal na saúde mental, sexualidade, identidade de género, competências parentais e dinâmicas familiares.
                </p>
              </div>
            </div>

            {/* Imagem - Lado Direito */}
            <div className="flex-1 lg:flex-[1.5] w-full lg:w-auto">
              <div className="relative w-full aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/fotofrederica.webp"
                  alt="Dra. Frederica Passos Barbizani"
                  fill
                  className="object-cover rounded-lg"
                  quality={100}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Faixa laranja com pattern e parallax */}
      <div ref={faixaRef} className="relative w-full bg-[#f56428] py-4 md:py-6 overflow-hidden">
        <motion.div
          className="absolute"
          style={{
            backgroundImage: 'url(/patternroxo.svg)',
            backgroundSize: '3000px 3000px',
            backgroundPosition: 'center center',
            backgroundRepeat: 'repeat',
            opacity: 1,
            width: 'calc(100% + 1000px)',
            height: 'calc(100% + 2000px)',
            top: '-1000px',
            left: '-500px',
            y: faixaParallaxY,
          }}
        />
      </div>

      {/* Seção Áreas de Especialização */}
      <motion.section
        ref={areasRef}
        id="Áreas de Especialização"
        className="w-full bg-pink-200 py-12 sm:py-16 md:py-24"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: visibleSections.has('Áreas de Especialização') ? 1 : 0,
          y: visibleSections.has('Áreas de Especialização') ? 0 : 50
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center" style={{ color: '#70309e' }}>
            Áreas de Especialização
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card Mulher */}
            <motion.div
              ref={mulherCardRef}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => new Set([...Array.from(prev), 'mulher']))
                }
              }}
              onHoverEnd={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => {
                    const newSet = new Set(prev)
                    newSet.delete('mulher')
                    return newSet
                  })
                }
              }}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                <Image
                  src="/vertical/mulher.webp"
                  alt="Psiquiatria da Mulher"
                  fill
                  className="object-cover"
                />
                
                {/* Gradiente pequeno do preto para transparente */}
                <div 
                  className="absolute inset-0 z-10"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 30%, transparent 100%)',
                  }}
                />
                
                {/* Gradiente no hover */}
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                  animate={{
                    opacity: hoveredCard.has('mulher') ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glow laranja embaixo no hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard.has('mulher') ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard.has('mulher') ? 1 : 0,
                    height: hoveredCard.has('mulher') ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Conteúdo */}
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard.has('mulher') ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Psiquiatria da Mulher
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard.has('mulher') ? 1 : 0,
                      y: hoveredCard.has('mulher') ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard.has('mulher') ? 'block' : 'none' }}
                  >
                    <p>Depressão perinatal, ansiedade gestacional, POC perinatal, psicose pós-parto</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card Parental */}
            <motion.div
              ref={parentalCardRef}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => new Set([...Array.from(prev), 'parental']))
                }
              }}
              onHoverEnd={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => {
                    const newSet = new Set(prev)
                    newSet.delete('parental')
                    return newSet
                  })
                }
              }}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                <Image
                  src="/vertical/parental.webp"
                  alt="Orientação Parental"
                  fill
                  className="object-cover"
                />
                
                <div 
                  className="absolute inset-0 z-10"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 30%, transparent 100%)',
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                  animate={{
                    opacity: hoveredCard.has('parental') ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard.has('parental') ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard.has('parental') ? 1 : 0,
                    height: hoveredCard.has('parental') ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard.has('parental') ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Orientação Parental
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard.has('parental') ? 1 : 0,
                      y: hoveredCard.has('parental') ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard.has('parental') ? 'block' : 'none' }}
                  >
                    <p>Competências parentais, gestão de comportamentos, comunicação familiar</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card Perinatal */}
            <motion.div
              ref={perinatalCardRef}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => new Set([...Array.from(prev), 'perinatal']))
                }
              }}
              onHoverEnd={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => {
                    const newSet = new Set(prev)
                    newSet.delete('perinatal')
                    return newSet
                  })
                }
              }}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                <Image
                  src="/vertical/perinatal.webp"
                  alt="Psiquiatria Perinatal"
                  fill
                  className="object-cover"
                />
                
                <div 
                  className="absolute inset-0 z-10"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 30%, transparent 100%)',
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                  animate={{
                    opacity: hoveredCard.has('perinatal') ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard.has('perinatal') ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard.has('perinatal') ? 1 : 0,
                    height: hoveredCard.has('perinatal') ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard.has('perinatal') ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Psiquiatria Perinatal
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard.has('perinatal') ? 1 : 0,
                      y: hoveredCard.has('perinatal') ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard.has('perinatal') ? 'block' : 'none' }}
                  >
                    <p>Disfunções sexuais, identidade de género, orientação sexual, disforia de género</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card Sexhuman */}
            <motion.div
              ref={sexhumanCardRef}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => new Set([...Array.from(prev), 'sexhuman']))
                }
              }}
              onHoverEnd={() => {
                if (!isMobile) {
                  setHoveredCard((prev) => {
                    const newSet = new Set(prev)
                    newSet.delete('sexhuman')
                    return newSet
                  })
                }
              }}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                <Image
                  src="/vertical/sexhuman.webp"
                  alt="Sexualidade Humana"
                  fill
                  className="object-cover"
                />
                
                <div 
                  className="absolute inset-0 z-10"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 30%, transparent 100%)',
                  }}
                />
                
                <motion.div
                  className="absolute inset-0 z-20"
                  style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.3) 100%)',
                  }}
                  animate={{
                    opacity: hoveredCard.has('sexhuman') ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard.has('sexhuman') ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard.has('sexhuman') ? 1 : 0,
                    height: hoveredCard.has('sexhuman') ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard.has('sexhuman') ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Sexualidade Humana
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard.has('sexhuman') ? 1 : 0,
                      y: hoveredCard.has('sexhuman') ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard.has('sexhuman') ? 'block' : 'none' }}
                  >
                    <p>Disfunções sexuais, identidade de género, orientação sexual, disforia de género</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Seção Formações e Cursos Profissionais */}
      <motion.section
        ref={formacoesRef}
        id="Formações e Cursos Profissionais"
        className="relative w-full bg-[#f2ede7] pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-20 md:pb-28 overflow-x-hidden overflow-y-visible"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: visibleSections.has('Formações e Cursos Profissionais') ? 1 : 0,
          y: visibleSections.has('Formações e Cursos Profissionais') ? 0 : 50
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat sm:bg-[length:170%]"
          style={{
            backgroundImage: 'url(/fundo2.svg)',
            backgroundSize: '250%',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
            Formações e Cursos Profissionais
          </h2>
          
          {/* Carrossel 3D */}
          <div 
            className="relative w-full"
            style={{ perspective: '1000px', minHeight: '400px', paddingBottom: '4rem' }}
          >
            <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px] flex items-center justify-center z-10 overflow-visible">
              {[
                {
                  id: 0,
                  image: '/formacoes/emp.webp',
                  title: 'Empresas',
                  text: 'Duração: 04 - 24h\nModalidade: Presencial na Empresa'
                },
                {
                  id: 1,
                  image: '/formacoes/pal.webp',
                  title: 'Palestras',
                  text: 'Palestras Públicas (90 minutos)\nWorkshops Práticos Exclusivos (3 horas)'
                },
                {
                  id: 2,
                  image: '/formacoes/profperi.webp',
                  title: 'Profissionais da Área Perinatal',
                  text: 'Duração: 12 horas (1,5 dias)\nModalidade: Presencial'
                },
                {
                  id: 3,
                  image: '/formacoes/medenf.webp',
                  title: 'Para Médicos e Enfermeiros',
                  text: 'Duração: 16h (02 Dias)\nModalidade: Presencial ou Online'
                }
              ].map((formacao, index) => {
                const total = 4
                const position = (index - currentFormacao + total) % total
                const isActive = position === 0
                const isLeft = position === total - 1
                const isRight = position === 1
                
                // Calcular transformações baseadas na posição - Efeito Jukebox
                let rotateY = 0
                let scale = 1
                let opacity = 1
                let zIndex = 1
                let x = 0
                let y = 0
                let blur = 0
                
                if (isActive) {
                  // Card ativo: centralizado, tamanho normal, totalmente opaco, na frente
                  rotateY = 0
                  scale = 1
                  opacity = 1
                  zIndex = 10
                  x = 0
                  y = 0
                  blur = 0
                } else if (isLeft) {
                  rotateY = 35
                  scale = 0.9
                  opacity = 1
                  zIndex = 2
                  x = -320
                  y = 20
                  blur = 5
                } else if (isRight) {
                  rotateY = -35
                  scale = 0.9
                  opacity = 1
                  zIndex = 2
                  x = 320
                  y = 20
                  blur = 5
                } else {
                  // Cards ocultos
                  opacity = 0
                  scale = 0.3
                  zIndex = 0
                  x = 0
                  y = 0
                  blur = 0
                }
                
                return (
                  <motion.div
                    key={formacao.id}
                    className="absolute w-full max-w-[280px] sm:max-w-sm md:max-w-xl h-full"
                    style={{
                      zIndex,
                      transformStyle: 'preserve-3d',
                    }}
                    initial={false}
                    animate={{
                      opacity,
                      scale,
                      x,
                      y,
                      rotateY,
                    }}
                    transition={{
                      opacity: {
                        duration: 0.4,
                        ease: 'easeInOut',
                      },
                      scale: {
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                      x: {
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                      y: {
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                      rotateY: {
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                  >
                    <div 
                      className="w-full h-full bg-[#f56428] rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row"
                      style={{
                        filter: `blur(${blur}px)`,
                      }}
                    >
                      {/* Imagem à esquerda */}
                      <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex-shrink-0">
                        <Image
                          src={formacao.image}
                          alt={formacao.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      
                      {/* Conteúdo à direita */}
                      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-6 md:p-8 lg:p-12 text-white pb-10 md:pb-8 items-center md:items-start">
                        <h3 className="font-jh-caudemars text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 text-center md:text-left">
                          {formacao.title}
                        </h3>
                        <p className="font-neue-montreal text-sm md:text-base lg:text-lg whitespace-pre-line text-center md:text-left mb-6">
                          {formacao.text}
                        </p>
                        
                        {/* Botão Contrate */}
                        <motion.button
                          className="font-neue-montreal text-white px-6 py-3.5 md:px-8 md:py-4 rounded-lg text-sm md:text-base lg:text-lg font-medium relative overflow-hidden w-full md:w-fit md:self-start text-center min-h-[48px] md:min-h-0"
                          style={{
                            backgroundColor: '#70309e',
                            borderRadius: '8px',
                          }}
                          onHoverStart={() => setHoveredContrateFormacao(formacao.id)}
                          onHoverEnd={() => setHoveredContrateFormacao(null)}
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeInOut',
                          }}
                        >
                          {/* Gradiente animado no hover */}
                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            style={{
                              background: `linear-gradient(135deg, #70309e 0%, #f56428 100%)`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: hoveredContrateFormacao === formacao.id ? 1 : 0 }}
                            transition={{
                              duration: 0.4,
                              ease: 'easeInOut',
                            }}
                          />
                          <span className="relative z-10">Contrate</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Setas de navegação */}
            <button
              onClick={() => setCurrentFormacao((prev) => (prev - 1 + 4) % 4)}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-3 md:p-4 transition-all duration-200 shadow-lg hover:scale-110"
              aria-label="Formação anterior"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#f56428]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentFormacao((prev) => (prev + 1) % 4)}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-3 md:p-4 transition-all duration-200 shadow-lg hover:scale-110"
              aria-label="Próxima formação"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#f56428]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Bolinhas de navegação */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentFormacao(index)}
                className="relative"
                aria-label={`Ir para formação ${index + 1}`}
              >
                <motion.div
                  className="w-3 h-3 rounded-full cursor-pointer"
                  animate={{
                    backgroundColor: index === currentFormacao ? '#f56428' : 'rgba(0, 0, 0, 0.2)',
                    scale: index === currentFormacao ? 1.2 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Seção Estatísticas da Prática Clínica */}
      <section 
        ref={statsRef}
        className="w-full bg-[#70309e] py-12 sm:py-16 md:py-24 min-h-[300px] sm:min-h-[400px] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-8 sm:mb-12 md:mb-16 text-center">
            Estatísticas da Prática Clínica
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Mulheres Tratadas */}
            <div className="flex flex-col items-center text-center w-full max-w-full px-4 py-6 rounded-lg">
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/iconmulher.png"
                  alt="Mulheres"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
                />
              </div>
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-jh-caudemars font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: statsVisible ? 1 : 0, y: statsVisible ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                +{statsCounters.mulheres}
              </motion.div>
              <p className="text-white/90 font-neue-montreal text-sm sm:text-base md:text-lg break-words hyphens-auto">
                Mulheres Tratadas em Psiquiatria Perinatal
              </p>
            </div>

            {/* Melhoria Depressão */}
            <div className="flex flex-col items-center text-center w-full max-w-full px-4 py-6 rounded-lg">
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/iconup.png"
                  alt="Melhoria"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
                />
              </div>
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-jh-caudemars font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: statsVisible ? 1 : 0, y: statsVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {statsCounters.melhoria}%
              </motion.div>
              <p className="text-white/90 font-neue-montreal text-sm sm:text-base md:text-lg break-words hyphens-auto">
                Melhoria Significativa nos<br />
                Sintomas de Depressão Pós Parto
              </p>
            </div>

            {/* Profissionais Formados */}
            <div className="flex flex-col items-center text-center w-full max-w-full px-4 py-6 rounded-lg">
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/icongrad.png"
                  alt="Profissionais"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
                />
              </div>
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-jh-caudemars font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: statsVisible ? 1 : 0, y: statsVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                +{statsCounters.profissionais}
              </motion.div>
              <p className="text-white/90 font-neue-montreal text-sm sm:text-base md:text-lg break-words hyphens-auto">
                Profissionais de Saúde Formados
              </p>
            </div>

            {/* Satisfação */}
            <div className="flex flex-col items-center text-center w-full max-w-full px-4 py-6 rounded-lg">
              <div className="mb-6 sm:mb-8">
                <Image
                  src="/iconstars.png"
                  alt="Satisfação"
                  width={120}
                  height={120}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
                />
              </div>
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl font-jh-caudemars font-bold text-white mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: statsVisible ? 1 : 0, y: statsVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {statsCounters.satisfacao}%
              </motion.div>
              <p className="text-white/90 font-neue-montreal text-sm sm:text-base md:text-lg break-words hyphens-auto">
                Satisfação com o Tratamento
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Recursos Educativos */}
      <motion.section
        ref={recursosRef}
        id="Recursos Educativos"
        className="relative w-full bg-[#f2ede7] py-12 sm:py-16 md:py-24 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: visibleSections.has('Recursos Educativos') ? 1 : 0,
          y: visibleSections.has('Recursos Educativos') ? 0 : 50
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Animações de Background */}
        {/* Livro abrindo (E-books) */}
        <AnimatePresence>
          {hoveredRecurso === 'ebook' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3.8, opacity: 0.6, y: -30 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.8
              }}
              style={{ filter: 'blur(2px)' }}
            >
              <div 
                style={{
                  filter: 'brightness(0) saturate(100%) invert(64%) sepia(93%) saturate(2800%) hue-rotate(349deg) brightness(96%) contrast(96%)',
                  mixBlendMode: 'multiply'
                }}
                className="w-full h-full"
              >
                <Lottie 
                  animationData={bookAnimation} 
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Documento com linhas (Artigos) */}
        <AnimatePresence>
          {hoveredRecurso === 'artigos' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: 0.6 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.8
              }}
              style={{ filter: 'blur(2px)' }}
            >
              <div 
                style={{
                  filter: 'brightness(0) saturate(100%) invert(64%) sepia(93%) saturate(2800%) hue-rotate(349deg) brightness(96%) contrast(96%)'
                }}
              >
                <Lottie 
                  animationData={documentAnimation} 
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Player de vídeo (Vídeos) */}
        <AnimatePresence>
          {hoveredRecurso === 'videos' && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isMobile ? 1.5 : 0.8, opacity: 0.6 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 150,
                damping: 20,
                mass: 0.8
              }}
              style={{ filter: 'blur(4px)' }}
            >
              <div 
                style={{
                  filter: 'brightness(0) saturate(100%) invert(64%) sepia(93%) saturate(2800%) hue-rotate(349deg) brightness(96%) contrast(96%)'
                }}
              >
                <Lottie 
                  animationData={videoAnimation} 
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
            {/* Título - Lado Esquerdo */}
            <div className="flex-1 flex items-center justify-center lg:justify-start">
              <h2 className="font-jh-caudemars text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gray-900 leading-tight break-words text-center lg:text-left">
                Recursos<br />
                Educativos
              </h2>
            </div>

            {/* Botões - Lado Direito */}
            <div className="flex-1 flex flex-col gap-4 sm:gap-6 w-full lg:w-auto justify-center">
              {/* E-books */}
              <div 
                ref={ebookButtonRef}
                className="relative w-full lg:w-64"
                style={{ perspective: '1000px', zIndex: 10 }}
              >
                <div
                  className="absolute inset-0 z-20 cursor-pointer sm:cursor-pointer"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setHoveredRecurso('ebook')
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredRecurso(null)
                    }
                  }}
                  onClick={() => {
                    if (isMobile) {
                      if (openRecurso === 'ebook') {
                        setOpenRecurso(null)
                        setHoveredRecurso(null)
                      } else {
                        setOpenRecurso('ebook')
                        setHoveredRecurso('ebook')
                      }
                    }
                  }}
                />
                <motion.button
                  className="relative w-full px-6 py-4 pr-12 sm:pr-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  style={{
                    backgroundColor: '#f56428',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    pointerEvents: 'none'
                  }}
                  animate={{ rotateX: (hoveredRecurso === 'ebook' || openRecurso === 'ebook') ? 360 : 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1
                  }}
                >
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, #70309e 0%, #f56428 100%)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: (hoveredRecurso === 'ebook' || openRecurso === 'ebook') ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </div>
                <motion.span 
                  className="relative z-10 font-neue-montreal text-white text-lg font-medium block w-full text-left"
                  animate={{ 
                    opacity: (hoveredRecurso === 'ebook' || openRecurso === 'ebook') ? 0 : 1 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  E-books
                </motion.span>
                <motion.span 
                  className="absolute inset-0 flex items-center px-6 font-neue-montreal text-white text-lg font-medium z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: (hoveredRecurso === 'ebook' || openRecurso === 'ebook') ? 1 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Descarregar
                </motion.span>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white z-10 sm:hidden"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Artigos e Guias */}
              <div 
                ref={artigosButtonRef}
                className="relative w-full lg:w-64"
                style={{ perspective: '1000px', zIndex: 10 }}
              >
                <div
                  className="absolute inset-0 z-20 cursor-pointer sm:cursor-pointer"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setHoveredRecurso('artigos')
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredRecurso(null)
                    }
                  }}
                  onClick={() => {
                    if (isMobile) {
                      if (openRecurso === 'artigos') {
                        setOpenRecurso(null)
                        setHoveredRecurso(null)
                      } else {
                        setOpenRecurso('artigos')
                        setHoveredRecurso('artigos')
                      }
                    }
                  }}
                />
                <motion.button
                  className="relative w-full px-6 py-4 pr-12 sm:pr-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  style={{
                    backgroundColor: '#f56428',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    pointerEvents: 'none'
                  }}
                  animate={{ rotateX: (hoveredRecurso === 'artigos' || openRecurso === 'artigos') ? 360 : 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1
                  }}
                >
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, #70309e 0%, #f56428 100%)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: (hoveredRecurso === 'artigos' || openRecurso === 'artigos') ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </div>
                <motion.span 
                  className="relative z-10 font-neue-montreal text-white text-lg font-medium block w-full text-left"
                  animate={{ 
                    opacity: (hoveredRecurso === 'artigos' || openRecurso === 'artigos') ? 0 : 1 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Artigos e Guias
                </motion.span>
                <motion.span 
                  className="absolute inset-0 flex items-center px-6 font-neue-montreal text-white text-lg font-medium z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: (hoveredRecurso === 'artigos' || openRecurso === 'artigos') ? 1 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Descarregar
                </motion.span>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white z-10 sm:hidden"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Vídeos Educativos */}
              <div 
                ref={videosButtonRef}
                className="relative w-full lg:w-64"
                style={{ perspective: '1000px', zIndex: 10 }}
              >
                <div
                  className="absolute inset-0 z-20 cursor-pointer sm:cursor-pointer"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setHoveredRecurso('videos')
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredRecurso(null)
                    }
                  }}
                  onClick={() => {
                    if (isMobile) {
                      if (openRecurso === 'videos') {
                        setOpenRecurso(null)
                        setHoveredRecurso(null)
                      } else {
                        setOpenRecurso('videos')
                        setHoveredRecurso('videos')
                      }
                    }
                  }}
                />
                <motion.button
                  className="relative w-full px-6 py-4 pr-12 sm:pr-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  style={{
                    backgroundColor: '#f56428',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    pointerEvents: 'none'
                  }}
                  animate={{ rotateX: (hoveredRecurso === 'videos' || openRecurso === 'videos') ? 360 : 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    mass: 1
                  }}
                >
                  <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, #70309e 0%, #f56428 100%)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: (hoveredRecurso === 'videos' || openRecurso === 'videos') ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    />
                  </div>
                <motion.span 
                  className="relative z-10 font-neue-montreal text-white text-lg font-medium block w-full text-left"
                  animate={{ 
                    opacity: (hoveredRecurso === 'videos' || openRecurso === 'videos') ? 0 : 1 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Vídeos Educativos
                </motion.span>
                <motion.span 
                  className="absolute inset-0 flex items-center px-6 font-neue-montreal text-white text-lg font-medium z-10"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: (hoveredRecurso === 'videos' || openRecurso === 'videos') ? 1 : 0 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Descarregar
                </motion.span>
                  <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white z-10 sm:hidden"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Barra Roxa com Typewriter */}
      <div ref={typewriterBarRef} className="relative w-full bg-[#70309e] py-6 sm:py-12 md:py-20 lg:py-24 overflow-hidden">
        {/* Background Image com Parallax */}
        <motion.div
          className="absolute bg-cover"
          style={{
            top: '-30%',
            left: 0,
            right: 0,
            bottom: '-30%',
            backgroundImage: 'url(/meninas.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            y: typewriterParallaxY,
          }}
        />
        
        {/* Overlay roxo escuro */}
        <div className="absolute inset-0 bg-[#70309e]/70" />
        
        {/* Conteúdo */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[100px] sm:min-h-[150px] md:min-h-[250px] lg:min-h-[300px]">
            <h2 className="font-jh-caudemars font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
              {typewriterText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block ml-2"
              >
                |
              </motion.span>
            </h2>
          </div>
        </div>
      </div>

      {/* Seção FAQ */}
      <motion.section
        ref={faqRef}
        className="w-full bg-[#f2ede7] py-12 sm:py-16 md:py-24"
        style={{
          backgroundImage: 'url(/srosa.svg)',
          backgroundSize: isMobile ? '250%' : '70%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: visibleSections.has('FAQ') ? 1 : 0,
          y: visibleSections.has('FAQ') ? 0 : 50
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-8 sm:mb-12 md:mb-16 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {[
              {
                id: 0,
                question: 'Dá formações ou palestras sobre saúde mental?',
                answer: 'Sim. Participo regularmente em ações de formação, palestras e eventos sobre saúde mental, com foco especial na saúde da mulher, saúde perinatal e diversidade de género.',
                icon: '/icons/PALESTRAS.svg'
              },
              {
                id: 1,
                question: 'Tem algum programa de apoio específico para pais de pessoas transexuais?',
                answer: 'Sim. Disponibilizo acompanhamento individual para pais(ou pessoa de referência) de pessoas transexuais, ajudando a lidar com o processo de aceitação e adaptação com empatia e informação especializada.',
                icon: '/icons/PAIS_TRANS.svg'
              },
              {
                id: 2,
                question: 'Pode falar com outros profissionais de saúde, como o meu médico de família?',
                answer: 'Sim, mas sempre com o seu consentimento. Tenho uma abordagem muito multidisciplinar e de trabalho em equipa, a articulação com outros profissionais é fundamental para garantir um cuidado integrado e eficaz.',
                icon: '/icons/FALARPROF.svg'
              },
              {
                id: 3,
                question: 'Quais são as suas áreas de especialidade como psiquiatra?',
                answer: 'Sou especializada em saúde mental da mulher, saúde perinatal (grávidas e pós-parto), identidade de género e sexualidade. Também trabalho com perturbação de hiperatividade e défice de atenção (PHDA) no adulto e Psiquiatria no geral.',
                icon: '/icons/ESPECIALIDADES.svg'
              },
              {
                id: 4,
                question: 'Trabalha com acompanhamento psiquiátrico durante a gravidez e pós-parto?',
                answer: 'Sim. Faço acompanhamento antes, durante e após a gravidez, com foco na saúde emocional da mulher, do casal e na adaptação à parentalidade.',
                icon: '/icons/GRAVIDEZ.svg'
              },
              {
                id: 5,
                question: 'Faz seguimento de pessoas transexuais em processo de transição?',
                answer: 'Sim. Acompanho pessoas em todas as fases da transição de género, oferecendo apoio emocional e, quando necessário, orientação para as outras especialidades médicas para realizarem terapia hormonal ou as intervenções cirúrgicas pertinentes.',
                icon: '/icons/TRANS.svg'
              },
              {
                id: 6,
                question: 'Trabalha com adolescentes ou apenas adultos?',
                answer: 'Atendo apenas adultos, portanto individuos a partir dos 18 anos',
                icon: '/icons/ADOLESCENTES.svg'
              },
              {
                id: 7,
                question: 'Faz teleconsultas?',
                answer: 'Sim. Acredito na acessibilidade aos serviços de saúde mental, e por vezes as teleconsultas são uma solução interessante para conseguir conjugar o tratamento com a vida pessoal e profissional.',
                icon: '/icons/TELECONSULTAS.svg'
              },
              {
                id: 8,
                question: 'Qual a duração das consultas?',
                answer: 'Cada consulta dura em média 45-60minutos.',
                icon: '/icons/DURACAO.svg'
              }
            ].map((faq) => {
              const isOpen = openFaq === faq.id
              
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center"
                      animate={{
                        backgroundColor: isOpen ? '#f56428' : '#70309e',
                        scale: isOpen ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <motion.div
                        animate={{
                          scale: isOpen ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Image
                          src={faq.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="w-6 h-6 sm:w-7 sm:h-7"
                        />
                      </motion.div>
                    </motion.div>
                    <span className="font-neue-montreal font-medium text-sm sm:text-base md:text-lg text-gray-900 flex-1 pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="flex-shrink-0"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-[#f56428]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? 'auto' : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ 
                      height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                      opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 sm:px-8 sm:py-5 border-t border-gray-100">
                      <p className="font-neue-montreal text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Seção Contato */}
      <motion.section
        ref={contatoRef}
        id="Contato"
        className="relative w-full bg-[#f56428] py-12 sm:py-16 md:py-24 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: visibleSections.has('Contato') ? 1 : 0,
          y: visibleSections.has('Contato') ? 0 : 50
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: 'url(/fundo2.svg)',
            backgroundSize: isMobile ? '400%' : '200%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-8 sm:mb-12 md:mb-16 text-center">
            Contato
          </h2>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              const errors: Record<string, string> = {}
              
              if (!formData.nome.trim()) errors.nome = 'Nome é obrigatório'
              if (!formData.email.trim()) errors.email = 'E-mail é obrigatório'
              else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                errors.email = 'E-mail inválido'
              }
              if (!formData.telefone.trim()) errors.telefone = 'Telefone é obrigatório'
              if (!formData.tipoConsulta) errors.tipoConsulta = 'Tipo de consulta é obrigatório'
              if (!formData.mensagem.trim()) errors.mensagem = 'Mensagem é obrigatória'
              
              setFormErrors(errors)
              
              if (Object.keys(errors).length === 0) {
                setIsSubmitting(true)
                setTimeout(() => {
                  setIsSubmitting(false)
                  alert('Formulário enviado com sucesso!')
                  setFormData({
                    nome: '',
                    email: '',
                    telefone: '',
                    tipoConsulta: '',
                    mensagem: ''
                  })
                }, 1000)
              }
            }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="nome" className="block text-white font-neue-montreal text-sm font-medium mb-2">
                Nome *
              </label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 ${
                  formErrors.nome ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-white/60 font-neue-montreal focus:outline-none focus:border-white/40 transition-colors`}
                placeholder="Seu nome completo"
              />
              {formErrors.nome && (
                <p className="text-red-200 text-sm mt-1 font-neue-montreal">{formErrors.nome}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-white font-neue-montreal text-sm font-medium mb-2">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 ${
                  formErrors.email ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-white/60 font-neue-montreal focus:outline-none focus:border-white/40 transition-colors`}
                placeholder="seu@email.com"
              />
              {formErrors.email && (
                <p className="text-red-200 text-sm mt-1 font-neue-montreal">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="telefone" className="block text-white font-neue-montreal text-sm font-medium mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                id="telefone"
                value={formData.telefone}
                onChange={(e) => {
                  const formatted = formatarTelefonePortugal(e.target.value)
                  setFormData({ ...formData, telefone: formatted })
                }}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 ${
                  formErrors.telefone ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-white/60 font-neue-montreal focus:outline-none focus:border-white/40 transition-colors`}
                placeholder="+351 912 345 678"
              />
              {formErrors.telefone && (
                <p className="text-red-200 text-sm mt-1 font-neue-montreal">{formErrors.telefone}</p>
              )}
            </div>

            <div>
              <label className="block text-white font-neue-montreal text-sm font-medium mb-3">
                Tipo de Consulta *
              </label>
              <div className="space-y-3">
                {['Primeira Consulta', 'Consulta de Seguimento', 'Teleatendimento'].map((tipo) => (
                  <label
                    key={tipo}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="tipoConsulta"
                      value={tipo}
                      checked={formData.tipoConsulta === tipo}
                      onChange={(e) => setFormData({ ...formData, tipoConsulta: e.target.value })}
                      className="sr-only"
                    />
                    <div className={`relative w-6 h-6 rounded border-2 ${
                      formData.tipoConsulta === tipo 
                        ? 'border-[#70309e] bg-[#70309e]' 
                        : 'border-white/40 bg-white/10'
                    } transition-all duration-200 flex items-center justify-center mr-3 group-hover:border-white/60`}>
                      {formData.tipoConsulta === tipo && (
                        <svg 
                          className="w-4 h-4 text-white" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="3" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="text-white font-neue-montreal">{tipo}</span>
                  </label>
                ))}
              </div>
              {formErrors.tipoConsulta && (
                <p className="text-red-200 text-sm mt-1 font-neue-montreal">{formErrors.tipoConsulta}</p>
              )}
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-white font-neue-montreal text-sm font-medium mb-2">
                Mensagem *
              </label>
              <textarea
                id="mensagem"
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border-2 ${
                  formErrors.mensagem ? 'border-red-500' : 'border-white/20'
                } text-white placeholder-white/60 font-neue-montreal focus:outline-none focus:border-white/40 transition-colors resize-none`}
                placeholder="Escreva sua mensagem..."
              />
              {formErrors.mensagem && (
                <p className="text-red-200 text-sm mt-1 font-neue-montreal">{formErrors.mensagem}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => setIsEnviarHovered(true)}
              onMouseLeave={() => setIsEnviarHovered(false)}
              className="relative w-full py-4 px-6 rounded-lg text-white font-neue-montreal font-medium text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: isEnviarHovered 
                    ? `linear-gradient(135deg, #70309e 0%, #f56428 100%)`
                    : '#70309e'
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
              <span className="relative z-10">
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </span>
            </motion.button>
          </form>
        </div>
      </motion.section>

      {/* Faixa preta com texto rolando */}
      <div className="w-full bg-[#161616] py-2 sm:py-3 md:py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex font-jh-caudemars text-white text-sm sm:text-base md:text-xl lg:text-2xl"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 120,
                ease: 'linear',
              },
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`footer-text-1-${i}`} className="mr-2 sm:mr-3 md:mr-4">
                Psiquiatria Contemporânea para Mentes que não cabem em Rótulos.
              </span>
            ))}
          </motion.div>
          <motion.div
            className="flex font-jh-caudemars text-white text-sm sm:text-base md:text-xl lg:text-2xl"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 120,
                ease: 'linear',
              },
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`footer-text-2-${i}`} className="mr-2 sm:mr-3 md:mr-4">
                Psiquiatria Contemporânea para Mentes que não cabem em Rótulos.
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer 
        ref={footerRef}
        className="relative w-full bg-[#70309e] py-12 sm:py-16 md:py-20 overflow-hidden"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/patternrosa.svg)',
            backgroundSize: '800%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${50 + (smoothPosition.x - 50) * 0.1}% ${50 + (smoothPosition.y - 50) * 0.1}%`,
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(112, 48, 158, 0) 0%, rgba(112, 48, 158, 0.9) 30%, rgba(112, 48, 158, 0.9) 70%, rgba(112, 48, 158, 0) 100%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex flex-col items-center space-y-8 sm:space-y-10">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/logoclara.svg"
                alt="Logo Dra. Frederica Passos"
                width={300}
                height={90}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>

            {/* Menu Items */}
            <nav className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 lg:gap-8">
              {menuItems.map((item) => {
                const isHovered = hoveredFooterItem === item
                
                return (
                  <button
                    key={item}
                    className="font-neue-montreal text-sm lg:text-base relative px-2 py-1 transition-all duration-200 text-center"
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontWeight: 400,
                    }}
                    onMouseEnter={() => setHoveredFooterItem(item)}
                    onMouseLeave={() => setHoveredFooterItem(null)}
                    onClick={() => scrollToSection(item)}
                  >
                    {item}
                    
                    {/* Linha laranja animada */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-0.5"
                      style={{
                        backgroundColor: '#f56428',
                        transformOrigin: 'center',
                      }}
                      initial={{ width: 0, x: '-50%' }}
                      animate={{
                        width: isHovered ? '100%' : 0,
                        x: '-50%',
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                      }}
                    />
                  </button>
                )
              })}
            </nav>

            {/* Botão Agende Agora */}
            <div className="flex-shrink-0">
              <motion.button
                className="font-neue-montreal text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base font-medium relative overflow-hidden"
                style={{
                  backgroundColor: '#f56428',
                  borderRadius: '8px',
                }}
                onHoverStart={() => setIsAgendeHovered(true)}
                onHoverEnd={() => setIsAgendeHovered(false)}
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                {/* Gradiente animado no hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, #f56428 0%, #70309e 100%)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isAgendeHovered ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                  }}
                />
                <span className="relative z-10">Agende Agora</span>
              </motion.button>
            </div>

            {/* Botões Sociais */}
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.button
                className="relative p-2"
                onMouseEnter={() => setHoveredSocial('linkedin')}
                onMouseLeave={() => setHoveredSocial(null)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                aria-label="LinkedIn"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-[#f56428]"
                  animate={{
                    scale: hoveredSocial === 'linkedin' ? 1 : 0,
                    opacity: hoveredSocial === 'linkedin' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <div className="relative z-10">
                  <Image
                    src="/LINKEDIN.svg"
                    alt="LinkedIn"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
              </motion.button>

              <motion.button
                className="relative p-2"
                onMouseEnter={() => setHoveredSocial('instagram')}
                onMouseLeave={() => setHoveredSocial(null)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                aria-label="Instagram"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-[#f56428]"
                  animate={{
                    scale: hoveredSocial === 'instagram' ? 1 : 0,
                    opacity: hoveredSocial === 'instagram' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <div className="relative z-10">
                  <Image
                    src="/INSTAGRAM.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#f56428] text-white rounded-full p-3 sm:p-4 shadow-lg z-50 hover:bg-[#70309e] transition-colors duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Voltar ao topo"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  )
}

