'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

type Photo = {
  id: string
  image_url: string
  album_id: string
  albums?: { title: string } | null
}

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="break-inside-avoid mb-6 relative group overflow-hidden bg-card rounded-md border border-border/30 hover-glow shadow-md cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            {index === 0 && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm">
                <span className="font-sans text-xs text-primary uppercase font-bold tracking-widest">Destaque</span>
              </div>
            )}
            <img 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
              src={photo.image_url} 
              alt={photo.albums?.title || "Foto da Galeria"} 
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="font-sans text-xs uppercase text-primary mb-1">Cultura Noturna</span>
              <h3 className="font-heading text-2xl text-white font-bold">{photo.albums?.title || "Captura"}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-gray-300 text-sm">photo_camera</span>
                <span className="font-sans text-xs text-gray-300 uppercase">Ver Ampliada</span>
              </div>
            </div>
          </div>
        ))}

        {photos.length === 0 && (
          <div className="col-span-full py-12">
            <p className="text-muted-foreground">Nenhuma foto encontrada.</p>
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <div className="flex justify-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-sm uppercase px-8 py-6 flex items-center gap-2 rounded-none clip-corner">
            Carregar Mais
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </Button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={() => setSelectedPhoto(null)}
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedPhoto.image_url}
              alt="Ampliada"
              className="max-w-full max-h-full object-contain shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
