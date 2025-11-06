'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), {
    stiffness: 150,
    damping: 15
  })
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), {
    stiffness: 150,
    damping: 15
  })
  const rotateZ = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), {
    stiffness: 150,
    damping: 15
  })

  // Transformações para o pattern - movimento leve em x e y
  const patternX = useSpring(useTransform(mouseX, [0, 1], [-30, 30]), {
    stiffness: 100,
    damping: 20
  })
  const patternY = useSpring(useTransform(mouseY, [0, 1], [-30, 30]), {
    stiffness: 100,
    damping: 20
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const x = e.clientX / windowWidth
      const y = e.clientY / windowHeight
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* Fundo laranja - abaixo de tudo */}
      <div 
        className="absolute inset-0 z-0"
        style={{ backgroundColor: '#f56428' }}
      />

      {/* Pattern Roxo - acima do laranja, abaixo do retângulo escuro, expandido além da tela para não cortar ao mover */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/patternroxo.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '3000px 3000px',
          backgroundPosition: 'center center',
          width: 'calc(100% + 200px)',
          height: 'calc(100% + 200px)',
          top: '-100px',
          left: '-100px',
          overflow: 'visible',
          zIndex: 15,
          x: patternX,
          y: patternY,
        }}
      />

      {/* Imagem Hero - colada no último pixel da direita, canto direito inferior, z-index mais alto */}
      <div className="absolute right-0 bottom-0 z-40 hidden md:block" style={{ margin: 0, padding: 0, left: 'auto' }}>
        <Image
          src="/heroinit.webp"
          alt="Hero"
          width={1920}
          height={1080}
          className="h-auto"
          style={{ 
            maxHeight: '95vh',
            maxWidth: '60vw',
            display: 'block',
            marginRight: 0,
            marginBottom: 0,
            paddingRight: 0,
            paddingBottom: 0,
            marginLeft: 'auto',
            objectFit: 'contain',
            objectPosition: 'right bottom'
          }}
          priority
        />
      </div>

      {/* Container principal com dois painéis */}
      <div className="absolute inset-0 flex flex-col md:flex-row z-20">
        {/* Painel esquerdo escuro */}
        <div className="bg-[#161616] flex flex-col items-center justify-center relative w-full md:w-[40%] min-h-[50vh] md:min-h-0">
          {/* Logo Clara grande no centro - fica no lugar inicial */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 201 }}>
            <Image
              src="/logoclara.svg"
              alt="Logo Clara"
              width={500}
              height={500}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain opacity-80"
            />
          </div>

          {/* Textos no topo */}
          <div className="absolute top-4 left-4 right-4 md:top-8 md:left-8 md:right-8 flex items-center justify-between z-30 gap-2 md:gap-4">
            <div className="flex flex-col font-nord font-light text-white text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
              <span>PSIQUIATRIA</span>
              <span>CONTEMPORÂNEA PARA</span>
            </div>
            
            {/* Circle Orange */}
            <div className="mx-2 md:mx-4 flex-shrink-0">
              <Image
                src="/circleorange.svg"
                alt="Circle Orange"
                width={32}
                height={32}
                className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8"
              />
            </div>

            <div className="flex flex-col font-nord font-light text-white text-xs sm:text-sm md:text-base lg:text-lg leading-tight text-right">
              <span>MENTES QUE NÃO</span>
              <span>CABEM EM RÓTULOS</span>
            </div>
          </div>
        </div>

        {/* Painel direito - transparente para mostrar pattern e imagem */}
        <div className="relative flex-1 w-full md:w-auto" />
      </div>

      {/* Retângulo laranja que cresce organicamente no hover - atrás do botão */}
      <motion.div
        className="fixed pointer-events-none"
        style={{ 
          left: '50%',
          bottom: '4rem',
          zIndex: 199,
          transformOrigin: 'center center',
        }}
        initial={{ scale: 0, opacity: 0, x: '-50%' }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: '-50%',
        }}
        transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
      >
        <motion.div
          className="w-[250px] h-[60px] sm:w-[280px] sm:h-[70px] md:w-[300px] md:h-[84px]"
          style={{
            backgroundColor: '#f56428',
            borderRadius: '12px',
            transformOrigin: 'center center',
          }}
          animate={{
            scale: isHovered ? 200 : 1,
            borderRadius: isHovered ? '0px' : '12px',
            x: isHovered ? 'calc(-50vw + 50%)' : 0,
            y: isHovered ? 'calc(-50vh + 50%)' : 0,
          }}
          transition={{
            duration: isHovered ? 2.4 : 0.4,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Botão "Entrar no site" - área de hover fixa, texto e glow mantêm tamanho, centro horizontal */}
      <motion.div
        className="fixed"
        style={{ 
          left: '50%',
          bottom: '4rem',
          zIndex: 200,
        }}
        initial={{ scale: 0, opacity: 0, x: '-50%' }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: '-50%',
        }}
        transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
      >
        <motion.button
          className="relative rounded-lg text-white font-chreed overflow-visible w-[250px] h-[60px] sm:w-[280px] sm:h-[70px] md:w-[300px] md:h-[84px]"
          style={{
            backgroundColor: '#70309e',
            borderRadius: '12px',
            padding: 0,
            boxShadow: `0 0 60px rgba(245, 100, 40, 0.6), 0 0 120px rgba(245, 100, 40, 0.4), 0 0 180px rgba(245, 100, 40, 0.2)`,
            pointerEvents: 'auto',
            fontWeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => router.push('/inicio')}
          whileHover={{ scale: 1.02 }}
          transition={{
            duration: 0.2,
            ease: 'easeInOut',
          }}
        >
          {/* Texto "Entrar no site" - mantém tamanho original */}
          <span className="relative z-10 whitespace-nowrap inline-block text-xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ fontWeight: 400 }}>
            Entrar no site
          </span>
        </motion.button>
      </motion.div>

      {/* Texto "Venha me Conhecer!" que aparece no hover à direita da tela */}
      <motion.div
        className="fixed inset-0 pointer-events-none flex items-center justify-end pr-4 sm:pr-8 md:pr-20"
        style={{ zIndex: 201 }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          delay: isHovered ? 0.3 : 0,
        }}
      >
        <span className="font-jh-caudemars text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap">
          Venha me Conhecer!
        </span>
      </motion.div>

      {/* Texto deslizante infinito - "sem rótulos, " repetido */}
      <div className="absolute bottom-0 left-0 w-full bg-[#161616] py-2 sm:py-3 md:py-4 z-30 overflow-hidden">
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
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`text-1-${i}`} className="mr-2 sm:mr-3 md:mr-4">sem rótulos,</span>
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
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={`text-2-${i}`} className="mr-2 sm:mr-3 md:mr-4">sem rótulos,</span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
