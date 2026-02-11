// ===== UI State Types for Telegram Web Clone =====
// This file contains UI-related type definitions

/** Toast notification types */
export type ToastType = 'info' | 'success' | 'error' | 'warning'

/** Toast notification data */
export interface Toast {
  id: number
  title: string
  message: string
  type: ToastType
}

/** Available modal names */
export type ModalName =
  | 'settings'
  | 'profile'
  | 'newGroup'
  | 'contacts'
  | 'callHistory'
  | 'callScreen'
  | 'forward'
  | 'hamburger'
  | 'chatActions'
  | 'privacy'
  | 'chatSettings'
  | 'myAccount'
  | 'folders'
  | 'mediaPhotos'
  | 'mediaFiles'
  | 'mediaLinks'
  | 'mediaGroups'

/** Modal state object */
export interface ModalsState {
  [key: string]: boolean
}
