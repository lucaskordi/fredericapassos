'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function InicioPage() {
  const [isAgendeHovered, setIsAgendeHovered] = useState(false)
  const [isContrateHovered, setIsContrateHovered] = useState(false)
  const [activeSection, setActiveSection] = useState('Início')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentFormacao, setCurrentFormacao] = useState(0)
  const [hoveredContrateFormacao, setHoveredContrateFormacao] = useState<number | null>(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

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

  const menuItems = [
    'Início',
    'Sobre',
    'Áreas de Atuação',
    'Serviços',
    'Blog',
    'Contato'
  ]

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

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      {/* Header */}
      <motion.header
        className="bg-white w-full shadow-sm fixed top-0 left-0 right-0 z-50"
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
                    onClick={() => setActiveSection(item)}
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

            {/* Menu Mobile - pode adicionar depois */}
            <button className="md:hidden text-gray-700 z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Carrossel */}
      <main className="w-full relative">
        <div ref={heroRef} className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
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
                {/* Background SVG no slide laranja com parallax */}
                {slide.color === '#f56428' && (
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'url(/srosa.svg)',
                      backgroundSize: 'clamp(35%, 50vw, 60%)',
                      backgroundPosition: '5% center',
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

                    {/* Foto - Alinhada na base */}
                    <div className="absolute left-0 bottom-0 w-full z-10 hidden sm:block">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-4 sm:pl-8 md:pl-16 lg:pl-24">
                        <Image
                          src="/fotofredericarec.png"
                          alt="Dra. Frederica Passos"
                          width={900}
                          height={900}
                          className="w-auto object-contain"
                          style={{ height: '100%', display: 'block', maxWidth: '700px' }}
                          priority={index === currentSlide}
                        />
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
      <section className="w-full bg-white py-12 sm:py-16 md:py-24 min-h-[300px] sm:min-h-[400px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-8 sm:mb-12 md:mb-16 text-center">
            Sobre
          </h2>
          <div className="text-gray-600">
            {/* Placeholder - conteúdo será adicionado depois */}
            <p>Conteúdo da seção Sobre será adicionado aqui.</p>
          </div>
        </div>
      </section>

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
      <section className="w-full bg-pink-200 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center" style={{ color: '#70309e' }}>
            Áreas de Especialização
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card Mulher */}
            <motion.div
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => setHoveredCard('mulher')}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05 }}
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
                    opacity: hoveredCard === 'mulher' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Glow laranja embaixo no hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard === 'mulher' ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard === 'mulher' ? 1 : 0,
                    height: hoveredCard === 'mulher' ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Conteúdo */}
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard === 'mulher' ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Psiquiatria da Mulher
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard === 'mulher' ? 1 : 0,
                      y: hoveredCard === 'mulher' ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard === 'mulher' ? 'block' : 'none' }}
                  >
                    <p>Depressão perinatal, ansiedade gestacional, POC perinatal, psicose pós-parto</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card Parental */}
            <motion.div
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => setHoveredCard('parental')}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05 }}
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
                    opacity: hoveredCard === 'parental' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard === 'parental' ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard === 'parental' ? 1 : 0,
                    height: hoveredCard === 'parental' ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard === 'parental' ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Orientação Parental
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard === 'parental' ? 1 : 0,
                      y: hoveredCard === 'parental' ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard === 'parental' ? 'block' : 'none' }}
                  >
                    <p>Competências parentais, gestão de comportamentos, comunicação familiar</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card Perinatal */}
            <motion.div
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => setHoveredCard('perinatal')}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05 }}
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
                    opacity: hoveredCard === 'perinatal' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard === 'perinatal' ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard === 'perinatal' ? 1 : 0,
                    height: hoveredCard === 'perinatal' ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard === 'perinatal' ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Psiquiatria Perinatal
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard === 'perinatal' ? 1 : 0,
                      y: hoveredCard === 'perinatal' ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard === 'perinatal' ? 'block' : 'none' }}
                  >
                    <p>Disfunções sexuais, identidade de género, orientação sexual, disforia de género</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Card Sexhuman */}
            <motion.div
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onHoverStart={() => setHoveredCard('sexhuman')}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ scale: 1.05 }}
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
                    opacity: hoveredCard === 'sexhuman' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 z-30"
                  style={{
                    background: '#f56428',
                    boxShadow: hoveredCard === 'sexhuman' ? '0 -10px 30px rgba(245, 100, 40, 0.8)' : 'none',
                  }}
                  animate={{
                    opacity: hoveredCard === 'sexhuman' ? 1 : 0,
                    height: hoveredCard === 'sexhuman' ? '8px' : '0px',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="absolute inset-0 z-30 flex flex-col justify-end items-center p-6 text-white text-center">
                  <motion.h3
                    className="font-jh-caudemars text-2xl md:text-3xl mb-4 text-center w-full"
                    animate={{
                      y: hoveredCard === 'sexhuman' ? -20 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Sexualidade Humana
                  </motion.h3>
                  
                  <motion.div
                    className="font-neue-montreal text-sm md:text-base"
                    animate={{
                      opacity: hoveredCard === 'sexhuman' ? 1 : 0,
                      y: hoveredCard === 'sexhuman' ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ display: hoveredCard === 'sexhuman' ? 'block' : 'none' }}
                  >
                    <p>Disfunções sexuais, identidade de género, orientação sexual, disforia de género</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção Formações e Cursos Profissionais */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
            Formações e Cursos Profissionais
          </h2>
          
          {/* Carrossel 3D */}
          <div 
            className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
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
                  // Card à esquerda: rotacionado, ligeiramente menor, semi-transparente, em arco
                  rotateY = 35
                  scale = 0.85
                  opacity = 0.7
                  zIndex = 2
                  x = -180
                  y = 20
                  blur = 2
                } else if (isRight) {
                  // Card à direita: rotacionado, ligeiramente menor, semi-transparente, em arco
                  rotateY = -35
                  scale = 0.85
                  opacity = 0.7
                  zIndex = 2
                  x = 180
                  y = 20
                  blur = 2
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
                      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-6 md:p-8 lg:p-12 text-white">
                        <h3 className="font-jh-caudemars text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 text-center md:text-left">
                          {formacao.title}
                        </h3>
                        <p className="font-neue-montreal text-sm md:text-base lg:text-lg whitespace-pre-line text-center md:text-left mb-6">
                          {formacao.text}
                        </p>
                        
                        {/* Botão Contrate */}
                        <motion.button
                          className="font-neue-montreal text-white px-6 py-3 md:px-8 md:py-4 rounded-lg text-sm md:text-base lg:text-lg font-medium relative overflow-hidden w-fit self-center md:self-start"
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
      </section>

      {/* Seção Estatísticas da Prática Clínica */}
      <section className="w-full bg-[#70309e] py-12 sm:py-16 md:py-24 min-h-[300px] sm:min-h-[400px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="font-jh-caudemars text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-8 sm:mb-12 md:mb-16 text-center">
            Estatísticas da Prática Clínica
          </h2>
          <div className="text-white/90">
            {/* Placeholder - conteúdo será adicionado depois */}
            <p>Conteúdo das estatísticas será adicionado aqui.</p>
          </div>
        </div>
      </section>

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

