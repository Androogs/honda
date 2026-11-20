import { useId, useState } from 'react'
import { SITIO, waLink, siguienteWa } from '../data/sitio.js'
import { IconWhatsApp } from './Icons.jsx'
import { useSede } from './SedeProvider.jsx'

/**
 * Formulario que arma el mensaje y lo envía por WhatsApp a la sede seleccionada.
 * fields: [{ name, label, type?, required?, options?, rows? }]
 */
export default function LeadForm({ asunto, fields, boton = 'Enviar por WhatsApp', tipo = 'asesor', initial = {} }) {
  const { sede } = useSede()
  const [vals, setVals] = useState(initial)
  const [ok, setOk] = useState(false)
  const [errores, setErrores] = useState({})
  const [acepta, setAcepta] = useState(false)
  const uid = useId()

  const set = (k, v) => setVals((p) => ({ ...p, [k]: v }))

  const enviar = (e) => {
    e.preventDefault()
    const err = {}
    fields.forEach((f) => { if (f.required && !String(vals[f.name] || '').trim()) err[f.name] = 'Este campo es obligatorio' })
    if (!acepta) err.acepta = 'Debes autorizar el tratamiento de tus datos'
    setErrores(err)
    if (Object.keys(err).length) return
    const lineas = fields.filter((f) => vals[f.name]).map((f) => `• ${f.label}: ${vals[f.name]}`)
    const msg = `Hola, soy ${vals.nombre || 'un cliente'}. ${asunto} en ${sede.nombre}.\n${lineas.join('\n')}`
    window.open(waLink(msg, siguienteWa(tipo)), '_blank', 'noopener')
    setOk(true)
  }

  return (
    <form className="form" onSubmit={enviar} noValidate>
      <div className="form__grid">
        {/* Floating labels: el <span> va DESPUÉS del control y sube al enfocar o cuando hay valor (CSS :placeholder-shown) */}
        {fields.map((f) => {
          const id = `${uid}-${f.name}`
          const fija = f.options || f.type === 'date' // select y fecha siempre llevan la etiqueta arriba
          const props = { id, 'aria-invalid': Boolean(errores[f.name]), 'aria-describedby': errores[f.name] ? `${id}-e` : undefined, 'aria-required': f.required || undefined }
          return (
            <div key={f.name} className={`field field--float ${fija ? 'is-fixed' : ''} ${f.rows ? 'field--full' : ''} ${errores[f.name] ? 'has-error' : ''}`}>
              {f.options ? (
                <select {...props} value={vals[f.name] || ''} onChange={(e) => set(f.name, e.target.value)}>
                  <option value="">Selecciona…</option>
                  {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.rows ? (
                <textarea {...props} placeholder=" " rows={f.rows} value={vals[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />
              ) : (
                <input {...props} placeholder=" " type={f.type || 'text'} value={vals[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} />
              )}
              <label htmlFor={id}>{f.label}{f.required && ' *'}</label>
              {errores[f.name] && <em id={`${id}-e`} role="alert">{errores[f.name]}</em>}
            </div>
          )
        })}
      </div>
      <label className={`check ${errores.acepta ? 'has-error' : ''}`}>
        <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} />
        <span>
          Autorizo a SUMOTO S.A. el tratamiento de mis datos personales para contactarme, conforme a la{' '}
          <a href={SITIO.urls.privacidad} target="_blank" rel="noreferrer">política de tratamiento de datos</a>.
        </span>
      </label>
      {errores.acepta && <em className="form__err" role="alert">{errores.acepta}</em>}
      <button className="btn btn--red btn--lg" type="submit"><IconWhatsApp width={20} height={20} /> {boton}</button>
      {ok && <p className="form__ok" role="status">Abrimos WhatsApp con tu mensaje listo. Solo falta que lo envíes.</p>}
    </form>
  )
}
