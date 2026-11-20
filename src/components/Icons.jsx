/**
 * ICONOGRAFÍA – Phosphor Icons (https://phosphoricons.com)
 * Un solo set, un solo peso de trazo ("regular"), tamaño base 24px (20px en botones/UI densa).
 * Se conservan los nombres de export originales (IconArrow, IconPin…) para no tocar las páginas.
 * Todos aceptan `width`/`height` (compatibilidad) o `size`, y son decorativos (aria-hidden).
 */
import {
  ArrowRight, ArrowUpRight, Backpack, BatteryCharging, Broom, CalendarBlank, CaretDown, CaretLeft, CaretRight,
  Check, Clock, CreditCard, Drop, EnvelopeSimple, FacebookLogo, GasPump, HardHat, InstagramLogo, List, Lock,
  MagnifyingGlass, MapPin, Moon, Motorcycle, Pause, Phone, Play, PlayCircle, Plus, ShieldCheck, Sun, Tire,
  TShirt, WarningCircle, WhatsappLogo, Wrench, X, YoutubeLogo, ArrowUp, Suitcase,
} from '@phosphor-icons/react'

const make = (Cmp, base = 24) =>
  function Icon({ width, height, size, weight = 'regular', ...rest }) {
    return <Cmp size={size ?? width ?? height ?? base} weight={weight} aria-hidden="true" {...rest} />
  }

export const IconWhatsApp = make(WhatsappLogo)
export const IconPhone = make(Phone)
export const IconPin = make(MapPin)
export const IconClock = make(Clock)
export const IconSearch = make(MagnifyingGlass)
export const IconMenu = make(List)
export const IconClose = make(X)
export const IconChevron = make(CaretDown)
export const IconCaretLeft = make(CaretLeft)
export const IconCaretRight = make(CaretRight)
export const IconArrow = make(ArrowRight)
export const IconArrowUp = make(ArrowUp)
export const IconCheck = make(Check)
export const IconCard = make(CreditCard)
export const IconShield = make(ShieldCheck)
export const IconWrench = make(Wrench)
export const IconBag = make(Suitcase)
export const IconCalendar = make(CalendarBlank)
export const IconPlay = make(PlayCircle)
export const IconPlaySolid = make(Play)
export const IconPause = make(Pause)
export const IconAlert = make(WarningCircle)
export const IconMail = make(EnvelopeSimple)
export const IconExternal = make(ArrowUpRight)
export const IconBike = make(Motorcycle)
export const IconPlus = make(Plus)
export const IconSun = make(Sun)
export const IconMoon = make(Moon)
export const IconFacebook = make(FacebookLogo)
export const IconInstagram = make(InstagramLogo)
export const IconYoutube = make(YoutubeLogo)

/* Iconos de categorías de repuestos / accesorios (nombres definidos en data/contenido.js) */
const CAT = {
  bateria: BatteryCharging,
  llanta: Tire,
  aceite: GasPump,
  llave: Wrench,
  casco: HardHat,
  escudo: ShieldCheck,
  maleta: Backpack,
  gota: Broom,
  camiseta: TShirt,
  candado: Lock,
}
export const IconCat = ({ name, size = 32, ...p }) => {
  const C = CAT[name] || Wrench
  return <C size={size} weight="regular" aria-hidden="true" {...p} />
}
export { Drop as _Drop }
