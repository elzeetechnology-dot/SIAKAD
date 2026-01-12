import type { UserRole } from '../stores/auth'

export interface SidebarItem {
  label: string
  to: string
  roles: UserRole[]
}

export const sidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard Admin',
    to: '/admin',
    roles: ['admin']
  },
  {
    label: 'Manajemen Guru',
    to: '/admin/guru',
    roles: ['admin']
  },
  {
    label: 'Dashboard Guru',
    to: '/guru',
    roles: ['guru']
  },
  {
    label: 'Dashboard Siswa',
    to: '/siswa',
    roles: ['siswa']
  }
]
