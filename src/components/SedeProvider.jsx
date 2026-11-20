import { createContext, useContext, useMemo, useState } from 'react'
import { SEDES, getSavedSedeId, saveSedeId } from '../data/sitio.js'

const Ctx = createContext(null)

export function SedeProvider({ children }) {
  const [id, setId] = useState(() => getSavedSedeId())
  const value = useMemo(() => ({
    sede: SEDES[id],
    sedes: Object.values(SEDES),
    setSede: (nuevo) => { saveSedeId(nuevo); setId(nuevo) },
  }), [id])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useSede = () => useContext(Ctx)
