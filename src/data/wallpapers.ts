export interface Wallpaper {
  id: string;
  name: string;
  cssBackground: string;
}

export const WALOW_WALLPAPERS: Wallpaper[] = [
  { id: 'night', name: 'ليل والو', cssBackground: 'radial-gradient(circle at 20% 10%, #312e81 0%, #0b0f1d 55%)' },
  { id: 'aurora', name: 'الشفق', cssBackground: 'linear-gradient(160deg, #064e3b 0%, #0f172a 50%, #4c1d95 100%)' },
  { id: 'sunset', name: 'الغروب', cssBackground: 'linear-gradient(180deg, #7c2d12 0%, #9d174d 45%, #1e1b4b 100%)' },
  { id: 'ocean', name: 'المحيط', cssBackground: 'linear-gradient(200deg, #0c4a6e 0%, #082f49 50%, #020617 100%)' },
  { id: 'desert', name: 'الصحراء', cssBackground: 'linear-gradient(170deg, #a16207 0%, #78350f 50%, #1c1917 100%)' },
  { id: 'nebula', name: 'السديم', cssBackground: 'radial-gradient(circle at 80% 20%, #a21caf 0%, transparent 40%), radial-gradient(circle at 10% 80%, #2563eb 0%, transparent 45%), #0b0f1d' },
  { id: 'graphite', name: 'الجرافيت', cssBackground: 'linear-gradient(180deg, #1f2937 0%, #111827 100%)' },
];
