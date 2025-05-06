"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, Globe } from "lucide-react"

const languages = [
    { code: "en", name: "English" },
    { code: "am", name: "Amharic (አማርኛ)" },
    { code: "ti", name: "Tigrinya (ትግርኛ)" },
    { code: "om", name: "Oromo (Afaan Oromoo)" },
    { code: "so", name: "Somali (Soomaali)" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ar", name: "Arabic" },
]

// Simple dropdown component
function SimpleDropdown({ trigger, children }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 rounded-md bg-white text-gray-800 dark:bg-gray-900 dark:text-white px-2 py-1 text-xs font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
            >
                {trigger}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-40 rounded-md bg-white text-gray-800 dark:bg-gray-900 dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

export default function LanguageSelector() {
    const [mounted, setMounted] = useState(false)
    const [currentLanguage, setCurrentLanguage] = useState("en")
    const translateElementId = "google_translate_element"
    const scriptId = "google-translate-script"
    const styleId = "hide-google-translate-branding"

    // Add CSS to hide Google Translate elements
    const addHideTranslateCSS = () => {
        if (document.getElementById(styleId)) return

        const style = document.createElement("style")
        style.id = styleId
        style.innerHTML = `
            /* Hide Google Translate widget */
            .skiptranslate, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame, div#goog-gt- {
                display: none !important;
            }
            
            /* Remove the top margin added by Google Translate */
            body {
                top: 0 !important;
                position: initial !important;
            }
            
            /* Fix for translation dropdown */
            .goog-te-menu-value {
                display: none !important;
            }
            
            /* Hide Google Translate attribution */
            .goog-logo-link, .goog-te-gadget {
                display: none !important;
            }
            
            /* Hide Google Translate popup */
            .goog-te-menu-frame {
                box-shadow: none !important;
            }
        `
        document.head.appendChild(style)
    }

    // Create hidden div for Google Translate
    const createHiddenElement = () => {
        if (document.getElementById(translateElementId)) return

        const div = document.createElement("div")
        div.id = translateElementId
        div.style.display = "none"
        document.body.appendChild(div)
    }

    // Initialize Google Translate
    const initializeTranslate = () => {
        if (window.googleTranslateElementInit) return

        window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        autoDisplay: false,
                        includedLanguages: languages.map((lang) => lang.code).join(","),
                    },
                    translateElementId,
                )
            }
        }
    }

    // Add Google Translate script
    const addScript = () => {
        if (document.getElementById(scriptId)) return



        const script = document.createElement("script")
        script.id = scriptId
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        script.async = true
        document.body.appendChild(script)
    }

    // Setup Google Translate
    useEffect(() => {
        addHideTranslateCSS()
        createHiddenElement()
        initializeTranslate()
        addScript()

        // Load saved preference
        const savedLanguage = localStorage.getItem("preferredLanguage")
        if (savedLanguage) {
            setCurrentLanguage(savedLanguage)
        }

        setMounted(true)

        // Fix body position periodically
        const interval = setInterval(() => {
            if (document.body.style.top !== "0px" && document.body.style.top !== "") {
                document.body.style.top = "0px"
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    // Change language function with retry mechanism
    const changeLanguage = (languageCode) => {
        if (!mounted) return

        setCurrentLanguage(languageCode)
        localStorage.setItem("preferredLanguage", languageCode)

        const maxAttempts = 10
        let attempts = 0

        const tryChangeLanguage = () => {
            const selectElement = document.querySelector(".goog-te-combo")

            if (selectElement) {
                selectElement.value = languageCode
                selectElement.dispatchEvent(new Event("change"))
                return true
            }

            attempts++
            if (attempts < maxAttempts) {
                setTimeout(tryChangeLanguage, 300)
            } else {
                console.error("Failed to change language after multiple attempts")
                // Last resort: reload the Google Translate script
                const oldScript = document.getElementById(scriptId)
                if (oldScript) oldScript.remove()

                delete window.google.translate
                delete window.googleTranslateElementInit

                const div = document.getElementById(translateElementId)
                if (div) div.innerHTML = ""

                initializeTranslate()
                addScript()

                // Try one more time after script reload
                setTimeout(() => {
                    const selectElement = document.querySelector(".goog-te-combo")
                    if (selectElement) {
                        selectElement.value = languageCode
                        selectElement.dispatchEvent(new Event("change"))
                    }
                }, 1000)
            }
            return false
        }

        tryChangeLanguage()
    }

    // Apply saved language when component mounts and after route changes
    useEffect(() => {
        if (mounted) {
            const savedLanguage = localStorage.getItem("preferredLanguage")
            if (savedLanguage && savedLanguage !== "en") {
                setTimeout(() => {
                    changeLanguage(savedLanguage)
                }, 1000)
            }
        }
    }, [mounted, window.location.pathname])

    return (
        <div className="fixed top-14 right-2 z-50" style={{ transform: "rotate(0deg)" }}>
            <SimpleDropdown
                trigger={
                    <>
                        <Globe className="h-3 w-3" />
                        <span>{languages.find((lang) => lang.code === currentLanguage)?.name.split(" ")[0] || "Lang"}</span>
                        <ChevronDown className="h-3 w-3" />
                    </>
                }
            >
                {languages.map((language) => (
                    <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`block w-full text-left px-4 py-2 text-xs text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 ${
                            currentLanguage === language.code ? "font-bold bg-gray-50 dark:bg-gray-800" : ""
                        }`}
                    >
                        {language.name}
                    </button>
                ))}
            </SimpleDropdown>
        </div>
    )
}
