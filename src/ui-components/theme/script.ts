export const script = (
   attribute: string,
   storageKey: string,
   defaultTheme: any,
   forcedTheme: any,
   themes: any,
   value: any,
   enableSystem: any,
   enableColorScheme: any
) => {
   const el = document.body
   const systemThemes = ['light', 'dark']
   const isClass = attribute === 'class'
   const classes = isClass && value ? themes.map((t: any) => value[t] || t) : themes

   function updateDOM(theme: string) {
      if (isClass) {
         el.classList.remove(...classes)
         el.classList.add(theme)
      } else {
         el.setAttribute(attribute, theme)
      }

      setColorScheme(theme)
   }

   function setColorScheme(theme: string) {
      if (enableColorScheme && systemThemes.includes(theme)) {
         el.style.colorScheme = theme
      }
   }

   function getSystemTheme() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
   }

   if (forcedTheme) {
      updateDOM(forcedTheme)
   } else {
      try {
         const themeName = localStorage.getItem(storageKey) || defaultTheme
         const isSystem = enableSystem && themeName === 'system'
         const theme = isSystem ? getSystemTheme() : themeName
         updateDOM(theme)
      } catch (e) {
         //
      }
   }
}
