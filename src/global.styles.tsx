export const colors = {
  hover: '#dce9e0',
  active: '#e1f8e1',
  white: '#F7FFF7',
  grey: '#9fb1c5',
  green: '#119DA4',
  red: '#ff6b6b',
  blue: '#1565C0',
  black: '#222222',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const colorsMap: any = {
  blueHover: '#2872c6',
  blueDisabled: '#537fb1',
  blueActive: '#1258a8',
  redHover: '#fc7979',
  redDisabled: '#c17e7e',
  redActive: '#e35e5e',
  greenHover: '#24a8af',
  greenDisabled: '#80b1b4',
  greenActive: '#119198',
  blackHover: '#3b3b3b',
  blackDisabled: '#606060',
  blackActive: '#1e1b1b',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const colorsNames: any = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [value, key]),
)
