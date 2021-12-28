export enum AlertMessages {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export interface AlertType {
  type: string
  message: string
}

export const data = [
  { id: 1, name: 'aabb' },
  { id: 2, name: 'aaccc' },
  { id: 3, name: 'aadd' },
  { id: 4, name: 'aadd' },
  { id: 5, name: 'aadd' },
]
