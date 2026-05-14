import { tagColorMap } from './TrendInsightUtils'

export function Tag({ color, children }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${tagColorMap[color]}`}>
      {children}
    </span>
  )
}
