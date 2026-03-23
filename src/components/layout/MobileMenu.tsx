"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone, AlertTriangle, X } from "lucide-react";
import { navigation } from "@/data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-80 bg-white z-50 lg:hidden overflow-y-auto"
          >
            {/* Close button inside the menu */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface transition-colors cursor-pointer"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6 text-dark" />
              </button>
            </div>
            <div className="p-6 pt-16">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.href}>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex-1 px-4 py-3 text-dark font-medium hover:bg-surface rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          onClick={() =>
                            setExpanded(expanded === item.label ? null : item.label)
                          }
                          className="p-3 hover:bg-surface rounded-lg cursor-pointer"
                          aria-label={`Expand ${item.label}`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              expanded === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.children && expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-4"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={onClose}
                              className="block px-4 py-2 text-sm text-muted hover:text-primary transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-surface space-y-4">
                <a
                  href="tel:0155071515"
                  className="flex items-center gap-2 text-dark font-medium"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  01.55.07.15.15
                </a>
                <a
                  href="tel:0476181307"
                  className="flex items-center gap-2 text-emergency font-medium"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Urgence : 04.76.18.13.07
                </a>
                <Link
                  href="/formations"
                  onClick={onClose}
                  className="block w-full text-center px-5 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
                >
                  Nos formations
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
