export function stressColor(v) {
  if (v >= 3) return '#f87171'
  if (v >= 2) return '#fbbf24'
  return '#2dd4bf'
}

export function stressBarBg(v) {
  if (v >= 3) return 'bg-red-400/70'
  if (v >= 2) return 'bg-amber-400/70'
  return 'bg-teal-400/70'
}

export const tagColorMap = {
  teal:  'bg-teal-50 border-teal-200 text-teal-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
  red:   'bg-red-50 border-red-200 text-red-500',
  blue:  'bg-blue-50 border-blue-200 text-blue-500',
}
